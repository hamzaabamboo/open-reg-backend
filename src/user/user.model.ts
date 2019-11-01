import { Model, Document, Schema } from 'mongoose';

export interface UserInfo {
    email: string;
    line: string;
    facebook: string;
    firstName: string;
    firstNameEn: string;
    lastName: string;
    lastNameEn: string;
    nickName: string;
    nickNameEn: string;
    title: string;
    titleEn: string;
    tel: string;
    emergencyTel: string;
    emergencyRelationship: string;
    chulaId: string;
    faculty: string;
    year: number;
}
export interface User extends Document {
    // username: string;
    // password: string;
    image: string;
    info: UserInfo;
}

export type UserModel = Model<User>;

export const USER_MODEL = 'user';

const UserInfoSchema = new Schema(
    {
        title: String,
        firstName: String,
        lastName: String,
        titleEn: String,
        firstNameEn: String,
        lastNameEn: String,
        nickName: String,
        nickNameEn: String,
        tel: String,
        emergencyTel: String,
        emergencyRelationship: String,
        email: String,
        line: String,
        facebook: String,
        chulaId: String,
        faculty: String,
        year: String,
    },
    { strict: false },
);

export const UserSchema = new Schema({
    image: String,
    info: UserInfoSchema,
});
