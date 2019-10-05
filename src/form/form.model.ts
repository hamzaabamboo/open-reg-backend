import { Model, Document, Schema } from 'mongoose';
import { Question, QuestionSchema } from './question.model';
import { EVENT_MODEL } from '../event/event.model';
import { FormGroup, FormGroupSchema } from './form-group.model';
import { USER_MODEL } from '../user/user.model';

export interface Form {
    eventId: string;
    groups: FormGroup[];
    questions: Question[];
    title: string;
    description?: string;
    readPermissions?: string[];
}

export interface FormDocument extends Document, Form {}

export type FormModel = Model<FormDocument>;

export const FORM_MODEL = 'form';

export const FormSchema = new Schema({
    eventId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: EVENT_MODEL,
    },
    groups: {
        type: [FormGroupSchema],
        required: true,
    },
    questions: {
        type: [QuestionSchema],
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    readPermissions: {
        type: [String],
        required: true,
    },
});
