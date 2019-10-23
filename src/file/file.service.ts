import { Injectable } from '@nestjs/common';
import {
    MulterOptionsFactory,
    MulterModuleOptions,
} from '@nestjs/platform-express';
import { ConfigService } from '../config/config.service';
import * as AWS from 'aws-sdk';
import * as multerS3 from 'multer-s3';
import * as path from 'path';
import { createHash } from 'crypto';

@Injectable()
export class FileService implements MulterOptionsFactory {
    S3: AWS.S3 = new AWS.S3();

    constructor(private readonly configService: ConfigService) {
        AWS.config.update({
            accessKeyId: configService.awsAccessKeyId,
            secretAccessKey: configService.awsSecretAccessKey,
        });

        this.debug();
    }

    createMulterOptions(): MulterModuleOptions {
        return {
            limits: {
                fileSize: 1e6, // 5 MB
            },
            fileFilter: (req, file, next) => {
                const ext = path.extname(file.originalname).toLowerCase();
                const allowed = ['.png', '.jpg', '.gif', '.jpeg'];
                if (!allowed.includes(ext)) {
                    next(new Error('Only images are allowed!'), false);
                } else {
                    next(null, true);
                }
            },
            storage: multerS3({
                s3: this.S3,
                bucket: this.configService.awsS3BucketName,
                acl: 'public-read',
                key: (request, file, next) => {
                    const override = request.body.override || 'open-reg';
                    const orig = createHash('md5')
                        .update(file.originalname)
                        .digest('hex');
                    const now = Date.now().toString();

                    const fileName = [override, orig, now].join('-');

                    next(null, fileName);
                },
            }),
        };
    }

    debug() {
        const bucketParams = { Bucket: this.configService.awsS3BucketName };

        this.S3.getBucketAcl(bucketParams, function(err, data) {
            if (err) {
                console.error('[S3]', err);
            } else if (data) {
                console.info('[S3]', data.Grants);
            }
        });
    }
}
