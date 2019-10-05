import {
    Controller,
    Get,
    UseGuards,
    Post,
    Request,
    Body,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { UserId } from './user/user.decorator';

@Controller()
export class AppController {
    constructor(private readonly authService: AuthService) {}

    @Get('ping')
    ping() {
        return { message: 'pong!' };
    }

    // @UseGuards(AuthGuard('local'))
    // @Post('login')
    // login(@UserId() id: string) {
    //     return this.authService.login(id);
    // }

    // @Post('signup')
    // signup(@Body() { username, password }: CreateUserDTO) {
    //     return this.authService.signup(username, password);
    // }
}
