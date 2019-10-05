import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    app.useGlobalPipes(new ValidationPipe());
    const options = new DocumentBuilder()
        .setTitle('Open Reg API')
        .setVersion('1.0')
        .setSchemes('https', 'http')
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);
    const PORT = process.env.PORT || 3000;
    console.log(PORT);
    await app.listen(PORT);
}
bootstrap();
