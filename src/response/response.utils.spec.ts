import { Question, QuestionTypes } from '../form/question.model';
import { validateResponse } from './response.utils';

describe('validate response', () => {
    describe('should be valid', () => {
        test('all required', () => {
            const questions: Question[] = [
                {
                    order: 1,
                    group: 1,
                    label: 'label2',
                    key: 'key1',
                    type: QuestionTypes.TEXT,
                    required: true,
                },
                {
                    order: 2,
                    group: 1,
                    label: 'label2',
                    key: 'key2',
                    type: QuestionTypes.TEXT,
                    required: true,
                },
            ];
            const response = {
                key1: 'asd',
                key2: 'asd',
            };
            expect(validateResponse(questions, response)).toBe(true);
        });
        test('missing required false', () => {
            const questions: Question[] = [
                {
                    order: 1,
                    group: 1,
                    label: 'label2',
                    key: 'key1',
                    type: QuestionTypes.TEXT,
                    required: true,
                },
                {
                    order: 2,
                    group: 1,
                    label: 'label2',
                    key: 'key2',
                    type: QuestionTypes.TEXT,
                    required: false,
                },
            ];
            const response = {
                key1: 'asd',
            };
            expect(validateResponse(questions, response)).toBe(true);
        });
        test('empty required false', () => {
            const questions: Question[] = [
                {
                    order: 1,
                    group: 1,
                    label: 'label2',
                    key: 'key1',
                    type: QuestionTypes.TEXT,
                    required: true,
                },
                {
                    order: 2,
                    group: 1,
                    label: 'label2',
                    key: 'key2',
                    type: QuestionTypes.TEXT,
                    required: false,
                },
            ];
            const response = {
                key1: 'asd',
                key2: '',
            };
            expect(validateResponse(questions, response)).toBe(true);
        });
    });
    describe('should be invalid', () => {
        test('missing key', () => {
            const questions: Question[] = [
                {
                    order: 1,
                    group: 1,
                    label: 'label2',
                    key: 'key1',
                    type: QuestionTypes.TEXT,
                    required: true,
                },
                {
                    order: 2,
                    group: 1,
                    label: 'label2',
                    key: 'key2',
                    type: QuestionTypes.TEXT,
                    required: true,
                },
            ];
            const response = {
                key1: 'asd',
            };
            expect(validateResponse(questions, response)).toBe(false);
        });
        test('empty string', () => {
            const questions: Question[] = [
                {
                    order: 1,
                    group: 1,
                    label: 'label2',
                    key: 'key1',
                    type: QuestionTypes.TEXT,
                    required: true,
                },
                {
                    order: 2,
                    group: 1,
                    label: 'label2',
                    key: 'key2',
                    type: QuestionTypes.TEXT,
                    required: true,
                },
            ];
            const response = {
                key1: 'asd',
                key2: '',
            };
            expect(validateResponse(questions, response)).toBe(false);
        });
    });
});
