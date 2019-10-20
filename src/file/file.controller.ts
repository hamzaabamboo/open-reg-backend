import { Controller, Post, Req, Res } from '@nestjs/common';
import { FileService } from './file.service';

@Controller('file')
export class FileController {
    constructor(private readonly fileService: FileService) {}
    @Post('upload')
    async create(@Req() request, @Res() response) {
        try {
            await this.fileService.fileUpload(request, response);
        } catch (error) {
            return response
                .status(500)
                .json(`Failed to upload image file: ${error.message}`);
        }
    }
}
