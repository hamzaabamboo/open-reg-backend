import { Injectable, Req, Res } from '@nestjs/common';
import * as multer from 'multer';
import * as AWS from 'aws-sdk';
import * as multerS3 from 'multer-s3';

const S3: AWS.S3 = new AWS.S3();

// Constants
const AWS_ACCESS_KEY_ID = '';
const AWS_SECRET_ACCESS_KEY = '';
const AWS_S3_BUCKET_NAME = '';

AWS.config.update({
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
});

// TO-DO: REFACTOR
@Injectable()
export class FileService {
    async fileupload(@Req() req, @Res() res) {
        try {
            this.upload(req, res, function(error) {
                if (error) {
                    // console.log(error);
                    return res
                        .status(404)
                        .json(`Failed to upload file: ${error}`);
                }
                return res.status(201).json(req.files[0].location);
            });
        } catch (error) {
            // console.log(error)
            return res.status(500).json(`Failed to upload file: ${error}`);
        }
    }

    upload = multer({
        storage: multerS3({
            s3: S3,
            bucket: AWS_S3_BUCKET_NAME,
            acl: 'public-read',
            key: function(request, file, cb) {
                const fileName = `${Date.now().toString()} - ${
                    file.originalName
                }`;
                cb(null, fileName);
            },
        }),
    }).array('upload', 1);
}
