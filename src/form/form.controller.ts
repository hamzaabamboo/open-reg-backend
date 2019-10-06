import { Controller, Get, Param, Post, Body, UseGuards } from '@nestjs/common';
import { FormService } from './form.service';
import { CreateFormDTO } from './form.dto';
import { DebugGuard } from '../debug.guard';
import { ApiOkResponse } from '@nestjs/swagger';
import { FormResponse } from './form.response';

@Controller('form')
export class FormController {
    constructor(private readonly formService: FormService) {}

    @UseGuards(DebugGuard)
    @Get('all')
    getAll() {
        return this.formService.findAll();
    }

    @ApiOkResponse({ type: FormResponse })
    @Get(':id')
    getForm(@Param('id') id: string) {
        return this.formService.findById(id);
    }

    @ApiOkResponse({ type: FormResponse })
    @Post()
    createForm(@Body() createForm: CreateFormDTO) {
        return this.formService.createForm(createForm);
    }
}
