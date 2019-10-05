import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/user.model';
import { TokenPayload } from './auth.interface';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) {}

    // async validateUser(username: string, password: string): Promise<any> {
    //     const user = await this.userService.findByUsername(username);
    //     if (!user) return null;

    //     const valid = await bcrypt.compare(password, user.password);
    //     if (!valid) return null;

    //     return user;
    // }

    // login(id: string) {
    //     const payload: TokenPayload = {
    //         id,
    //     };
    //     return {
    //         token: this.jwtService.sign(payload),
    //     };
    // }

    // async signup(username: string, password: string) {
    //     const hashed = await bcrypt.hash(password, 10);
    //     const user = await this.userService.createUser({
    //         username,
    //         password: hashed,
    //     });
    //     return this.login(user._id);
    // }
}
