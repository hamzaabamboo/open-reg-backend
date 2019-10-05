import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
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
        if (!checkForm)
            throw new HttpException('Invalid form id', HttpStatus.BAD_REQUEST);
        const responseIsValid = validateResponse(checkForm.questions, answers);
        if (!responseIsValid)
            throw new HttpException('Invalid response', HttpStatus.BAD_REQUEST);
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
}
