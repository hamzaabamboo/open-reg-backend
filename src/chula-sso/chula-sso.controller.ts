import { Controller, Get, Query } from '@nestjs/common';
import { ChulaSsoService } from './chula-sso.service';
import { UserService } from '../user/user.service';
import { ChulaSsoSuccessResponse } from './chula-sso.dto';
import { JwtService } from '@nestjs/jwt';
import { ApiOkResponse } from '@nestjs/swagger';
import { ValidateTicketResponse } from './chula-sso.response';

@Controller('chula-sso')
export class ChulaSsoController {
    constructor(
        private readonly chulaSsoService: ChulaSsoService,
        private readonly jwtService: JwtService,
        private readonly userService: UserService,
    ) {}

    @ApiOkResponse({ type: ValidateTicketResponse })
    @Get('/validate-ticket')
    async validateTicket(@Query('ticket') ticket: string) {
        const data: ChulaSsoSuccessResponse = await this.chulaSsoService.validateTicket(
            ticket,
        );
        const info = this.chulaSsoService.parseStudentInfo(data);
        const user = await this.userService.createUserFromChulaSso(info);
        return { token: this.jwtService.sign({ id: user._id }) };
    }
}
