import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    UseGuards,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { FormService } from './form.service';
import { CreateFormDTO } from './form.dto';
import { ApiOkResponse } from '@nestjs/swagger';
import { FormResponse } from './form.response';

@Controller('form')
export class FormController {
    constructor(private readonly formService: FormService) {}

    @Get('all')
    getAll() {
        return this.formService.findAll();
    }

    @ApiOkResponse({ type: FormResponse })
    @Get(':id')
    async getForm(@Param('id') id: string) {
        const form = await this.formService.findById(id);
        if (!form)
            throw new HttpException('form not found', HttpStatus.NOT_FOUND);
        return form;
    }

    @ApiOkResponse({ type: FormResponse })
    @Post()
    createForm(@Body() createForm: CreateFormDTO) {
        return this.formService.createForm(createForm);
    }
}
