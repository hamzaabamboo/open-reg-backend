import { Controller, Get, Param, Res } from '@nestjs/common';
import { ExportService } from './export.service';
import { Response } from 'express';
import { FormService } from '../form/form.service';

@Controller('export')
export class ExportController {
    constructor(
        private readonly exportService: ExportService,
        private readonly formService: FormService,
    ) {}

    @Get('/csv/:id')
    async exportCsv(@Param('id') id: string, @Res() res: Response) {
        const form = await this.formService.findById(id);
        res.attachment(`${form.title}-${new Date()}.csv`);
        return (await this.exportService.exportToCsv(form)).pipe(res);
    }
}
