import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { USER_MODEL, UserModel } from './user.model';
import { CreateUserFromChulaSsoDTO, UserInfoDto } from './user.dto';
import { registrationForm } from './user.form';
import { prefillAnswer } from '../form/form.utils';
@Injectable()
export class UserService {
    constructor(
        @InjectModel(USER_MODEL) private readonly userModel: UserModel,
    ) {}

    createUserFromChulaSso(info: CreateUserFromChulaSsoDTO) {
        return this.userModel
            .findOneAndUpdate(
                { 'info.chulaId': info.chulaId },
                { $setOnInsert: { info } },
                { new: true, upsert: true },
            )
            .exec();
    }

    findById(id: string) {
        return this.userModel.findById(id).exec();
    }

    // findByUsername(username: string) {
    //     return this.userModel.findOne({ username }).exec();
    // }

    async getRegistrationForm(id: string) {
        const { info } = await this.findById(id);
        const questions = prefillAnswer(registrationForm.questions, info);
        return { ...registrationForm, questions };
    }

    submitRegistrationForm(id: string, info: UserInfoDto) {
        return this.userModel.findByIdAndUpdate(
            id,
            { $set: { info } },
            { new: true },
        );
    }
}
