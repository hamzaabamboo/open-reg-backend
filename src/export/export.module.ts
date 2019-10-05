import { Module } from '@nestjs/common';
import { ExportController } from './export.controller';
import { ExportService } from './export.service';
import { ResponseModule } from '../response/response.module';
import { FormModule } from '../form/form.module';
import { UserModule } from '../user/user.module';

@Module({
    imports: [FormModule, ResponseModule, UserModule],
    providers: [ExportService],
    controllers: [ExportController],
})
export class ExportModule {}
