import { Model, Document, Schema } from 'mongoose';

export enum QuestionTypes {
    RADIO = 'RADIO',
    CHECKBOX = 'CHECKBOX',
    TEXT = 'TEXT',
    EMAIL = 'EMAIL',
    PHONE = 'PHONE',
    COLOR = 'COLOR',
    DATE = 'DATE',
    TIME = 'TIME',
    DROPDOWN = 'DROPDOWN',
    SUBCHOICES = 'SUBCHOICES',
    FILE = 'FILE',
}

export interface Choice {
    label: string;
    value: string;
}

export interface Question {
    order: number;
    group: number;
    type: QuestionTypes;
    dependsOn?: number;
    label: string;
    key: string;
    choices?: Choice[];
    subChoices?: {
        [key: string]: Choice[];
    };
    required: boolean;
    description?: string;
}

export interface QuestionDocument extends Document, Question {}

export type QuestionModel = Model<QuestionDocument>;

export const QUESTION_MODEL = 'question';
export const QUESTION_TYPES = [
    QuestionTypes.RADIO,
    QuestionTypes.CHECKBOX,
    QuestionTypes.TEXT,
    QuestionTypes.EMAIL,
    QuestionTypes.PHONE,
    QuestionTypes.COLOR,
    QuestionTypes.DATE,
    QuestionTypes.TIME,
    QuestionTypes.DROPDOWN,
    QuestionTypes.SUBCHOICES,
    QuestionTypes.FILE,
];

export const QuestionSchema = new Schema({
    order: {
        type: Number,
        required: true,
    },
    group: {
        type: Number,
        required: false,
        default: 1,
    },
    dependsOn: {
        type: Number,
        required: false,
    },
    type: {
        type: String,
        enum: QUESTION_TYPES,
        required: true,
    },
    label: {
        type: String,
        required: true,
    },
    key: {
        type: String,
        required: true,
    },
    choices: {
        type: [
            {
                label: {
                    type: String,
                    required: true,
                },
                value: {
                    type: String,
                    required: true,
                },
            },
        ],
        required: false,
    },
    subChoices: {
        type: Map,
        of: String,
        required: false,
    },
    required: {
        type: Boolean,
        default: false,
        required: false,
    },
    description: {
        type: String,
        required: false,
    },
});
