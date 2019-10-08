import { Question, QuestionTypes } from './question.model';
import { prefillAnswer, hasChoices } from './form.utils';

describe(' prefill answer', () => {
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
    it('should prefill with answer', () => {
        const data = {
            key1: '55555',
            key2: '22222',
        };
        const result = [
            {
                order: 1,
                group: 1,
                label: 'label2',
                key: 'key1',
                type: QuestionTypes.TEXT,
                required: true,
                value: '55555',
            },
            {
                order: 2,
                group: 1,
                label: 'label2',
                key: 'key2',
                type: QuestionTypes.TEXT,
                required: true,
                value: '22222',
            },
        ];
        expect(prefillAnswer(questions, data)).toEqual(result);
    });
    it('should prefill with empty string', () => {
        const data = {};
        const result = [
            {
                order: 1,
                group: 1,
                label: 'label2',
                key: 'key1',
                type: QuestionTypes.TEXT,
                required: true,
                value: '',
            },
            {
                order: 2,
                group: 1,
                label: 'label2',
                key: 'key2',
                type: QuestionTypes.TEXT,
                required: true,
                value: '',
            },
        ];
        expect(prefillAnswer(questions, data)).toEqual(result);
    });
});

describe('hasChoices', () => {
    const fake = (type: QuestionTypes): Question => ({ type } as any);
    it('should be true', () => {
        expect(hasChoices(fake(QuestionTypes.CHECKBOX))).toBe(true);
        expect(hasChoices(fake(QuestionTypes.DROPDOWN))).toBe(true);
        expect(hasChoices(fake(QuestionTypes.RADIO))).toBe(true);
    });
    it('should be false', () => {
        expect(hasChoices(fake(QuestionTypes.TEXT))).toBe(false);
        expect(hasChoices(fake(QuestionTypes.EMAIL))).toBe(false);
        expect(hasChoices(fake(QuestionTypes.PHONE))).toBe(false);
    });
});
