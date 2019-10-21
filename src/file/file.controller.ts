import { Controller, Post, Req, Res } from '@nestjs/common';
import { FileService } from './file.service';

@Controller('file')
export class FileController {
    constructor(private readonly fileService: FileService) {}
    @Post('upload')
    async create(@Req() request, @Res() response) {
        return this.fileService.fileUpload(request, response);
    }
}
