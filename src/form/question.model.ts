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
}

export interface Question {
    order: number;
    group: number;
    type: QuestionTypes;
    label: string;
    key: string;
    choices?: string[];
    required: boolean;
    description?: string;
}

export interface QuestionDocument extends Document, Question {}

export type QuestionModel = Model<QuestionDocument>;

export const QUESTION_MODEL = 'question';
export const QUESTION_TYPES = [
    'RADIO',
    'CHECKBOX',
    'TEXT',
    'EMAIL',
    'PHONE',
    'COLOR',
    'DATE',
    'TIME',
    'DROPDOWN',
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
        type: [String],
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
