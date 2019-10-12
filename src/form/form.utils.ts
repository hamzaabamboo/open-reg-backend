import { Question, QuestionTypes } from './question.model';
export const prefillAnswer = (
    questions: Question[],
    answers: { [key: string]: any },
) =>
    questions.map(({ key, ...q }) => {
        const value = answers[key] || '';
        return {
            key,
            value,
            ...q,
        };
    });

export const hasChoices = (question: Question) =>
    [
        QuestionTypes.CHECKBOX,
        QuestionTypes.DROPDOWN,
        QuestionTypes.RADIO,
    ].includes(question.type);
