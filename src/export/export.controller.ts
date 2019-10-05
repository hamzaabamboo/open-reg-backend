import {
    Controller,
    Get,
    Param,
    Res,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { ExportService } from './export.service';
import { Response } from 'express';
import { FormService } from '../form/form.service';
import { Authenticated } from '../auth/auth.decorator';
import { UserId } from '../user/user.decorator';
import { UserService } from '../user/user.service';

@Controller('export')
export class ExportController {
    constructor(
        private readonly exportService: ExportService,
        private readonly formService: FormService,
        private readonly userService: UserService,
    ) {}

    @Authenticated()
    @Get('/csv/:id')
    async exportCsv(
        @Param('id') formId: string,
        @Res() res: Response,
        @UserId() userId: string,
    ) {
        const form = await this.formService.findById(formId);
        const user = await this.userService.findById(userId);
        if (!form.readPermissions.includes(user.info.chulaId))
            throw new HttpException(
                'You are not authorized',
                HttpStatus.FORBIDDEN,
            );
        res.attachment(`${form.title}-${new Date()}.csv`);
        return this.exportService.exportToCsv(form).pipe(res);
    }
}
