import { Module } from '@nestjs/common';
import { ResponseService } from './response.service';
import { ResponseController } from './response.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RESPONSE_MODEL, ResponseSchema } from './response.model';
import { FormModule } from '../form/form.module';
@Module({
    imports: [
        MongooseModule.forFeature([
            { name: RESPONSE_MODEL, schema: ResponseSchema },
        ]),
        FormModule,
    ],
    providers: [ResponseService],
    exports: [ResponseService],
    controllers: [ResponseController],
})
export class ResponseModule {}
