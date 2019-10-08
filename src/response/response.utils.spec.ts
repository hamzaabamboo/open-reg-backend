import { Question, QuestionTypes } from '../form/question.model';
import { validateResponse, parseResponse } from './response.utils';

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
        test('question with choices must answer with index', () => {
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
                    type: QuestionTypes.RADIO,
                    choices: ['a', 'b', 'c'],
                    required: true,
                },
            ];
            const response = {
                key1: 'asd',
                key2: 'a',
            };
            expect(validateResponse(questions, response)).toBe(false);
        });
        test('choice index must not be out of bound', () => {
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
                    type: QuestionTypes.RADIO,
                    choices: ['a', 'b', 'c'],
                    required: true,
                },
            ];
            const response = {
                key1: 'asd',
                key2: '3',
            };
            expect(validateResponse(questions, response)).toBe(false);
        });
    });
});

describe('parse response', () => {
    const questions: Question[] = [
        {
            label: '',
            key: 'q1',
            type: QuestionTypes.TEXT,
            order: 1,
            group: 1,
            required: false,
        },
        {
            label: '',
            key: 'q2',
            type: QuestionTypes.RADIO,
            choices: ['a', 'b'],
            order: 1,
            group: 1,
            required: true,
        },
    ];
    it('should parse correctly', () => {
        const answers = {
            q1: 'qwerty',
            q2: '0',
        };
        expect(parseResponse(questions, answers)).toEqual({
            q1: 'qwerty',
            q2: 'a',
        });
    });

    it('should skip missing answer', () => {
        const answers = {
            q2: '0',
        };
        expect(parseResponse(questions, answers)).toEqual({
            q2: 'a',
        });
    });
});
