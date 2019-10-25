import json2csv, { Transform } from 'json2csv';
import { Question } from '../form/question.model';
export const csvTransformStream = (
    fields: Array<string | json2csv.FieldInfo<any>>,
) => {
    const opts = { fields, withBOM: true };
    const transformOpts = {
        objectMode: true,
        encoding: 'utf-8',
        defaultEncoding: 'utf-8',
    };
    const transform = new Transform(opts, transformOpts);
    return transform;
};

export const getResponseFields = (questions: Question[]) =>
    questions.map(({ key }) => ({
        label: key,
        value: `answers.${key}`,
        default: '-',
    }));
