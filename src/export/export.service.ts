import { Injectable } from '@nestjs/common';
import { ResponseService } from '../response/response.service';
import { FormService } from '../form/form.service';
import { userInfoKeys } from './export.user';
import { csvTransformStream } from './export.csv';

@Injectable()
export class ExportService {
    constructor(
        private readonly responseService: ResponseService,
        private readonly formService: FormService,
    ) {}

    async getResponseKeys(formId: string) {
        const form = await this.formService.findById(formId);
        return form.questions.map(({ key }) => ({
            label: key,
            value: `answers.${key}`,
            default: '-',
        }));
    }
    async exportToCsv(formId: string) {
        const responseKeys = await this.getResponseKeys(formId);
        const keys = [...userInfoKeys, ...responseKeys];
        const response = this.responseService.findAllResponse(formId);
        return response.pipe(csvTransformStream(keys));
    }
}
