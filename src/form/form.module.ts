import { Module } from '@nestjs/common';
import { FormService } from './form.service';
import { FormController } from './form.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { FORM_MODEL, FormSchema } from './form.model';
import { QUESTION_MODEL, QuestionSchema } from './question.model';
import { RESPONSE_MODEL, ResponseSchema } from '../response/response.model';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: FORM_MODEL, schema: FormSchema },
            { name: QUESTION_MODEL, schema: QuestionSchema },
            { name: RESPONSE_MODEL, schema: ResponseSchema },
        ]),
    ],
    providers: [FormService],
    exports: [FormService],
    controllers: [FormController],
})
export class FormModule {}
