import { Injectable, Req, Res } from '@nestjs/common';
import * as multer from 'multer';
import * as AWS from 'aws-sdk';
import * as multerS3 from 'multer-s3';
import * as path from 'path';
import { ConfigService } from '../config/config.service';

// TO-DO: REFACTOR
@Injectable()
export class FileService {
    S3: AWS.S3 = new AWS.S3();

    constructor(private readonly configService: ConfigService) {
        console.log('[FileService]', 'constructor');
        AWS.config.update({
            accessKeyId: configService.aws.AWS_ACCESS_KEY_ID,
            secretAccessKey: configService.aws.AWS_SECRET_ACCESS_KEY,
        });
    }

    async fileUpload(@Req() req, @Res() res) {
        try {
            this.upload(req, res, function(error) {
                if (error) {
                    // console.log(error);
                    return res
                        .status(404)
                        .json(`Failed to upload file: ${error}`);
                }
                return res.status(201).json(req.files.location);
            });
        } catch (error) {
            // console.log(error)
            return res.status(500).json(`Failed to upload file: ${error}`);
        }
    }

    upload = multer({
        storage: multerS3({
            s3: this.S3,
            bucket: this.configService.aws.AWS_S3_BUCKET_NAME,
            acl: 'public-read',
            fileFilter: function(req, file, callback) {
                const ext = path.extname(file.originalname).toLowerCase();
                const allowed = ['.png', '.jpg', '.gif', '.jpeg'];
                if (!allowed.includes(ext)) {
                    return callback(new Error('Only images are allowed!'));
                }
                callback(null, true);
            },
            key: function(request, file, cb) {
                // TO-DO: Attach `overrideFileName` to `request` parameter
                const fileName = `${Date.now().toString()} - ${
                    file.originalname
                }`;
                cb(null, fileName);
            },
        }),
    }).array('upload');
}
