import {
    Controller,
    Get,
    Param,
    Res,
    ForbiddenException,
} from '@nestjs/common';
import { ExportService } from './export.service';
import { Response } from 'express';
import { FormService } from '../form/form.service';
import { Authenticated } from '../auth/auth.decorator';
import { UserId } from '../user/user.decorator';
import { UserService } from '../user/user.service';
import { ConfigService } from '../config/config.service';
import { User } from '../user/user.model';

@Controller('export')
export class ExportController {
    constructor(
        private readonly exportService: ExportService,
        private readonly formService: FormService,
        private readonly userService: UserService,
        private readonly configService: ConfigService,
    ) {}

    @Authenticated()
    @Get('/csv/:id')
    async exportCsv(
        @Param('id') formId: string,
        @Res() res: Response,
        @UserId() userId: string,
    ) {
        const findUser: Promise<User> = this.configService.isDevelopment
            ? new Promise((r, _) => r(null))
            : this.userService.findById(userId);

        // Refer: https://stackoverflow.com/questions/35612428/call-async-await-functions-in-parallel
        const [form, user] = await Promise.all([
            this.formService.findById(formId),
            findUser,
        ]);

        if (
            !this.configService.isDevelopment &&
            !form.readPermissions.includes(user.info.chulaId)
        )
            throw new ForbiddenException('You are not authorized');

        res.attachment(`${form.title}-${new Date()}.csv`);
        return this.exportService.exportToCsv(form).pipe(res);
    }
}
