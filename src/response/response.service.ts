import { Injectable, BadRequestException } from '@nestjs/common';
import { RESPONSE_MODEL, ResponseModel } from './response.model';
import { InjectModel } from '@nestjs/mongoose';
import { SubmitResponseDTO } from './response.dto';
import { FormService } from '../form/form.service';
import { validateResponse } from './response.utils';

@Injectable()
export class ResponseService {
    constructor(
        @InjectModel(RESPONSE_MODEL)
        private readonly responseModel: ResponseModel,
        private readonly formService: FormService,
    ) {}

    async submitResponse({ answers, form }: SubmitResponseDTO, userId: string) {
        const checkForm = await this.formService.findById(form);
        if (!checkForm) throw new BadRequestException('Invalid form id');
        const responseIsValid = validateResponse(checkForm.questions, answers);
        if (!responseIsValid) throw new BadRequestException('Invalid response');
        const query = {
            user: userId,
            form,
        };
        const newResponse = this.responseModel.findOneAndUpdate(
            query,
            {
                $setOnInsert: query,
                $set: {
                    answers,
                },
            },
            { new: true, upsert: true },
        );
        return await newResponse.exec();
    }

    findById(id: string) {
        return this.responseModel.findById(id).exec();
    }

    findAllResponse(formId: string) {
        return this.responseModel
            .find({ form: formId })
            .populate('user', 'info')
            .select('user answers')
            .cursor();
    }
}
