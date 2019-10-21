import {
    Injectable,
    Req,
    Res,
    BadRequestException,
    HttpStatus,
} from '@nestjs/common';
import * as multer from 'multer';
import * as AWS from 'aws-sdk';
import * as multerS3 from 'multer-s3';
import * as path from 'path';
import { ConfigService } from '../config/config.service';

@Injectable()
export class FileService {
    S3: AWS.S3 = new AWS.S3();

    constructor(private readonly configService: ConfigService) {
        AWS.config.update({
            accessKeyId: configService.awsAccessKeyId,
            secretAccessKey: configService.awsSecretAccessKey,
        });

        // const bucketParams = { Bucket: configService.awsS3BucketName };

        // this.S3.getBucketAcl(bucketParams, function(err, data) {
        //     if (err) {
        //         console.error('[S3:getBucketAcl]', err);
        //     } else if (data) {
        //         console.info('[S3:getBucketAcl]', data.Grants);
        //     }
        // });
    }

    async fileUpload(@Req() req, @Res() res) {
        this.go(req, res, function(error) {
            // NestJS's "Exception Filter" doesn't work here!
            if (error instanceof BadRequestException) {
                return res
                    .status(HttpStatus.BAD_REQUEST)
                    .send(error.message)
                    .end();
            } else if (error) {
                return res
                    .status(HttpStatus.BAD_REQUEST)
                    .send()
                    .end();
            } else {
                const _files = req.files;
                let output = null;
                if (_files instanceof Array) {
                    output = _files.map(f => ({
                        fileName: f.key,
                        fileLocation: f.location,
                    }));
                } else {
                    output = {
                        fileName: _files.key,
                        fileLocation: _files.location,
                    };
                }
                return res
                    .status(HttpStatus.CREATED)
                    .json(output)
                    .end();
            }
        });
    }

    go = multer({
        fileFilter: function(req, file, next) {
            const ext = path.extname(file.originalname).toLowerCase();
            const allowed = ['.png', '.jpg', '.gif', '.jpeg'];

            if (!allowed.includes(ext)) {
                next(new BadRequestException('Only images are allowed!'));
            } else {
                next(null, true);
            }
        },
        storage: multerS3({
            s3: this.S3,
            bucket: this.configService.awsS3BucketName,
            acl: 'public-read',
            key: function(request, file, next) {
                const fileName =
                    Date.now().toString() + ' - ' + file.originalname;
                next(null, fileName);
            },
        }),
    }).array('upload');
}
