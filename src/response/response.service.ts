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

    async submitResponse(response: SubmitResponseDTO, userId: string) {
        const form = await this.formService.findById(response.form);
        if (!form)
            throw new HttpException('Invalid form id', HttpStatus.BAD_REQUEST);
        const responseIsValid = validateResponse(
            form.questions,
            response.answers,
        );
        if (!responseIsValid)
            throw new HttpException('Invalid response', HttpStatus.BAD_REQUEST);
        const newResponse = new this.responseModel({
            user: userId,
            ...response,
        });
        return await newResponse.save();
    }

    findById(id: string) {
        return this.responseModel.findById(id).exec();
    }
}
