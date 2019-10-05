import { Model, Document, Schema } from 'mongoose';
import { FORM_MODEL } from '../form/form.model';
import { USER_MODEL } from '../user/user.model';

export interface Response extends Document {
    form: string;
    user: string;
    answers: Map<string,string>;
}

export type ResponseModel = Model<Response>;

export const RESPONSE_MODEL = 'response';

export const ResponseSchema = new Schema({
    form: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: FORM_MODEL,
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: USER_MODEL,
    },
    answers: {
        type: Map,
        of: String,
        required: true,
    },
});
