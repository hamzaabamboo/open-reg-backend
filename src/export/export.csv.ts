import json2csv, { Transform } from 'json2csv';
export const csvTransformStream = (
    fields: Array<string | json2csv.FieldInfo<any>>,
) => {
    const opts = { fields };
    const transformOpts = { objectMode: true };
    return new Transform(opts, transformOpts);
};
