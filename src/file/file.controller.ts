import {
    Controller,
    Post,
    UseInterceptors,
    UploadedFiles,
    UseGuards,
    Body,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';
import { DevEnvironmentGuard } from '../dev-environment.guard';

@Controller('file')
export class FileController {
    constructor(private readonly fileService: FileService) {}

    @UseGuards(DevEnvironmentGuard)
    @Post('upload')
    @UseInterceptors(FileFieldsInterceptor([{ name: 'image', maxCount: 10 }]))
    uploadFile(@UploadedFiles() files) {
        //
        // PREFIXING FILE NAME:
        // Pass request body with key: `override`
        // Key `override` needs to be in an order before `image` or any file upload field
        // See: https://github.com/expressjs/multer/issues/96
        //

        console.log(files);
        return files; // Please don't do this in production!
    }
}
