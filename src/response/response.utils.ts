import { Question } from '../form/question.model';
export const validateResponse = (
    questions: Question[],
    answers: { [key: string]: string },
) =>
    questions.every(question => {
        return (
            !question.required ||
            (answers[question.key] !== undefined &&
                answers[question.key].length > 0)
        );
    });
