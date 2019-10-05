import { Controller, Get, Param, Res } from '@nestjs/common';
import { ExportService } from './export.service';
import { Response } from 'express';

@Controller('export')
export class ExportController {
    constructor(private readonly exportService: ExportService) {}

    @Get('/csv/:id')
    async exportCsv(@Param('id') id: string, @Res() res: Response) {
        return (await this.exportService.exportToCsv(id)).pipe(res);
    }
}
