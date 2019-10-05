import { Question } from './question.model';
export const prefillAnswer = (
    questions: Question[],
    answers: { [key: string]: string },
) =>
    questions.map(({ key, ...q }) => {
        const value = answers[key] || '';
        return {
            key,
            value,
            ...q,
        };
    });
