import {
    Controller,
    Get,
    Post,
    Body,
    UseInterceptors,
    UploadedFile,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserId } from './user.decorator';
import { Authenticated } from '../auth/auth.decorator';
import { UserInfoDto } from './user.dto';
import { ApiOkResponse } from '@nestjs/swagger';
import { FormResponse } from '../form/form.response';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from '../file/file.service';
@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly fileService: FileService,
    ) {}

    @Authenticated()
    @Get('profile')
    getProfile(@UserId() userId: string) {
        return this.userService.findById(userId);
    }

    @ApiOkResponse({ type: FormResponse })
    @Authenticated()
    @Get('form')
    getRegistrationForm(@UserId() userId: string) {
        return this.userService.getRegistrationForm(userId);
    }

    @UseInterceptors(FileInterceptor('image'))
    @Authenticated()
    @Post('form')
    submitRegistrationForm(
        @UserId() userId: string,
        @Body() userInfo: UserInfoDto,
        @UploadedFile() file: any,
    ) {
        return this.userService.submitRegistrationForm(userId, userInfo, file);
    }
}
