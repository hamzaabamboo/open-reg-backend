import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { MulterModule } from '@nestjs/platform-express';

@Module({
    imports: [
        ConfigModule,
        MulterModule.registerAsync({
            imports: [ConfigModule],
            useClass: FileService,
            inject: [ConfigService],
        }),
    ],
    providers: [FileService],
    controllers: [FileController],
})
export class FileModule {}
