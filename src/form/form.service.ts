import { Injectable, NotFoundException } from '@nestjs/common';
import { FORM_MODEL, FormModel, FormDocument } from './form.model';
import { InjectModel } from '@nestjs/mongoose';
import { CreateFormDTO, EditFormDTO } from './form.dto';
import { RESPONSE_MODEL, ResponseModel } from '../response/response.model';
import { prefillAnswer } from './form.utils';
import { EditEventDTO } from '../event/event.dto';
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
        if (!form) throw new NotFoundException('Invalid form id');
        return form.toObject() as FormDocument;
    }

    async findOldResponse(formId: string, userId: string) {
        const response = await this.responseModel
            .findOne({ form: formId, user: userId })
            .exec();
        return response ? Object.fromEntries(response.answers) : {};
    }

    async getForm(formId: string, userId: string) {
        const form = await this.findById(formId);
        const oldResponse = await this.findOldResponse(formId, userId);
        const questions = prefillAnswer(form.questions, oldResponse);
        return Object.assign({}, form, { questions });
    }

    async editForm(formId: string, input: EditFormDTO) {
        return this.formModel.findByIdAndUpdate(
            formId,
            { $set: input },
            { new: true },
        );
    }
}
