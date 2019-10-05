import { Controller, Get, Query } from '@nestjs/common';
import { ChulaSsoService } from './chula-sso.service';
import { UserService } from '../user/user.service';
import { ChulaSsoSuccessResponse } from './chula-sso.dto';
import { JwtService } from '@nestjs/jwt';

@Controller('chula-sso')
export class ChulaSsoController {
    constructor(
        private readonly chulaSsoService: ChulaSsoService,
        private readonly jwtService: JwtService,
        private readonly userService: UserService,
    ) {}

    @Get('/validate-ticket')
    async validateTicket(@Query('ticket') ticket: string) {
        const {
            ouid,
            roles,
        }: ChulaSsoSuccessResponse = await this.chulaSsoService.validateTicket(
            ticket,
        );
        const info = { chulaId: ouid, faculty: roles[0], role: roles[1] };
        const user = await this.userService.createUserFromChulaSso(info);
        return { token: this.jwtService.sign({ id: user._id }) };
    }
}
