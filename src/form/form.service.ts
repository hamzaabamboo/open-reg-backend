import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { FORM_MODEL, FormModel, FormDocument } from './form.model';
import { InjectModel } from '@nestjs/mongoose';
import { CreateFormDTO } from './form.dto';
import { RESPONSE_MODEL, ResponseModel } from '../response/response.model';
import { prefillAnswer } from './form.utils';
@Injectable()
export class FormService {
    constructor(
        @InjectModel(FORM_MODEL) private readonly formModel: FormModel,
        @InjectModel(RESPONSE_MODEL)
        private readonly responseModel: ResponseModel,
    ) {}

    async createForm(form: CreateFormDTO) {
        const newForm = new this.formModel(form);
        return await newForm.save();
    }

    async findAll() {
        const forms = await this.formModel.find().exec();
        return forms;
    }

    async findById(id: string) {
        const form = await this.formModel.findById(id).exec();
        if (!form)
            throw new HttpException('ivalid form id', HttpStatus.NOT_FOUND);
        return form.toObject() as FormDocument;
    }

    async findOldResponse(formId: string, userId: string) {
        const response = await this.responseModel
            .findOne({ form: formId, user: userId })
            .exec();
        return Object.fromEntries(response ? response.answers : new Map());
    }

    async getForm(formId: string, userId: string) {
        const form = await this.findById(formId);

        const oldResponse = await this.findOldResponse(formId, userId);
        const questions = prefillAnswer(form.questions, oldResponse);
        return Object.assign({}, form, { questions });
    }
}
