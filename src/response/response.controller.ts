import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { ResponseService } from './response.service';
import { SubmitResponseDTO } from './response.dto';
import { Authenticated } from '../auth/auth.decorator';
import { UserId } from '../user/user.decorator';

@Controller('response')
export class ResponseController {
    constructor(private readonly responseService: ResponseService) {}
    @Get(':id')
    getForm(@Param('id') id: string) {
        return this.responseService.findById(id);
    }

    @Authenticated()
    @Post()
    submitResponse(
        @Body() response: SubmitResponseDTO,
        @UserId() userId: string,
    ) {
        return this.responseService.submitResponse(response, userId);
    }
}
