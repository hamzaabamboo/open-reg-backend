import {
    Controller,
    Post,
    UseInterceptors,
    UploadedFiles,
    UseGuards,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';
import { DebugGuard } from '../debug.guard';

@Controller('file')
export class FileController {
    constructor(private readonly fileService: FileService) {}

    @UseGuards(DebugGuard)
    @Post('upload')
    @UseInterceptors(FileFieldsInterceptor([{ name: 'image', maxCount: 10 }]))
    uploadFile(@UploadedFiles() files) {
        console.log(files);
        return files; // Please don't do this in production!
    }
}
