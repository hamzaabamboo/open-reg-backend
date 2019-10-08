import { Injectable } from '@nestjs/common';
import { ResponseService } from '../response/response.service';
import { csvTransformStream, getResponseFields } from './export.utils';
import { FormDocument } from '../form/form.model';
import { userInfoFields } from './export.user';
import { responseTransformStream } from '../response/response.utils';

@Injectable()
export class ExportService {
    constructor(private readonly responseService: ResponseService) {}

    exportToCsv(form: FormDocument) {
        const responseFields = getResponseFields(form.questions);
        const keys = [...userInfoFields, ...responseFields];
        const response = this.responseService.findAllResponse(form._id);
        return response
            .pipe(responseTransformStream(form.questions))
            .pipe(csvTransformStream(keys));
    }
}
