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
            accessKeyId: configService.awsAccessKeyId,
            secretAccessKey: configService.awsSecretAccessKey,
        });

        var bucketParams = { Bucket: configService.awsS3BucketName };
        this.S3.getBucketAcl(bucketParams, function(err, data) {
            if (err) {
                console.log('S3:getBucketAcl', err);
            } else if (data) {
                console.log('S3:getBucketAcl', data.Grants);
            }
        });
    }

    async fileUpload(@Req() req, @Res() res) {
        this.upload(req, res, locations => res.status(201).json(locations));
    }

    upload(req, res, callback = null) {
        try {
            this._upload(req, res, function(error) {
                if (error) {
                    console.log(error);
                }
                console.log('req.files', req.files);
                return callback
                    ? callback(req.files.location)
                    : req.files.location;
            });
        } catch (error) {
            console.log(error);
            // return res.status(500).json(`Failed to upload file: ${error}`);
        }
    }

    _upload = multer({
        storage: multerS3({
            s3: this.S3,
            bucket: this.configService.awsS3BucketName,
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
                console.log('request', request);
                console.log('file', file);
                // TO-DO: Attach `overrideFileName` to `request` parameter
                const fileName = `${Date.now().toString()} - ${
                    file.originalname
                }`;
                cb(null, fileName);
            },
        }),
    }).array('upload');
}
