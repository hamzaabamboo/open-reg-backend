import { Question } from '../form/question.model';
import { hasChoices } from '../form/form.utils';
import { Transform } from 'stream';
import { Response } from './response.model';
import { User } from '../user/user.model';
import { parseUserInfo } from '../user/user.util';

function isNumeric(value: string) {
    return /^\d+$/.test(value);
}

export const validateResponse = (
    questions: Question[],
    answers: { [key: string]: string },
) =>
    questions.every(question => {
        const answer = answers[question.key];
        if (question.required) {
            if (answer === undefined) return false;
            if (answer === '') return false;
        }
        if (hasChoices(question)) {
            if (!isNumeric(answer)) return false;
            if (+answer >= question.choices.length) return false;
        }
        return true;
    });

export const parseResponse = (
    questions: Question[],
    answers: { [key: string]: string },
): { [key: string]: string } => {
    const parsed = questions
        .map(question => {
            const answer = answers[question.key];
            if (answer === '' || answer === undefined || answer === null)
                return null;
            const value = hasChoices(question)
                ? question.choices[+answer]
                : answer;
            return [question.key, value];
        })
        .filter(i => i !== null);
    return Object.fromEntries(parsed);
};

export const responseTransformStream = (questions: Question[]) => {
    return new Transform({
        objectMode: true,
        transform: (data: Response, _, done) => {
            const res = data.toObject() as Response;
            const oldAnswers = Object.fromEntries(res.answers);
            const userInfo = parseUserInfo(((res.user as any) as User).info);
            const answers = parseResponse(questions, oldAnswers);
            const result = { ...res, user: { info: userInfo }, answers };
            done(null, result);
        },
    });
};
