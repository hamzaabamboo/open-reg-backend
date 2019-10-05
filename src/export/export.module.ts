import { Module } from '@nestjs/common';
import { ExportController } from './export.controller';
import { ExportService } from './export.service';
import { ResponseModule } from '../response/response.module';
import { FormModule } from '../form/form.module';

@Module({
    imports: [FormModule, ResponseModule],
    providers: [ExportService],
    controllers: [ExportController],
})
export class ExportModule {}
