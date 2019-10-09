import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    UseGuards,
    HttpException,
    HttpStatus,
    Patch,
} from '@nestjs/common';
import { FormService } from './form.service';
import { CreateFormDTO, EditFormDTO } from './form.dto';
import { ApiOkResponse } from '@nestjs/swagger';
import { FormResponse } from './form.response';
import { Authenticated } from '../auth/auth.decorator';
import { UserId } from '../user/user.decorator';
import { EditEventDTO } from '../event/event.dto';

@Controller('form')
export class FormController {
    constructor(private readonly formService: FormService) {}

    @ApiOkResponse({ type: [FormResponse] })
    @Get('all')
    getAll() {
        return this.formService.findAll();
    }

    @Authenticated()
    @ApiOkResponse({ type: FormResponse })
    @Get(':id')
    async getForm(@Param('id') id: string, @UserId() userId: string) {
        const form = await this.formService.getForm(id, userId);
        return form;
    }

    @ApiOkResponse({ type: FormResponse })
    @Post()
    createForm(@Body() createForm: CreateFormDTO) {
        return this.formService.createForm(createForm);
    }

    @ApiOkResponse({ type: FormResponse })
    @Patch(':id')
    editForm(@Body() form: EditFormDTO, @Param('id') id: string) {
        return this.formService.editForm(id, form);
    }
}
