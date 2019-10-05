import { Module, HttpModule, HttpService } from '@nestjs/common';
import { ChulaSsoController } from './chula-sso.controller';
import { ChulaSsoService } from './chula-sso.service';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        ConfigModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                secret: config.secret,
            }),
        }),
        HttpModule,
        UserModule,
    ],
    controllers: [ChulaSsoController],
    providers: [ChulaSsoService, ConfigService],
})
export class ChulaSsoModule {}
