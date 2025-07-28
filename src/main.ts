import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.enableCors({
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
    });
    console.log('✅ CORS enabled for http://localhost:3000');
    ///////// swagger

    const config = new DocumentBuilder()
        .setTitle('Itter example')
        .setDescription('The Itter API description')
        .setVersion('1.0')
        .addTag('Itter')
        .build();
    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, documentFactory);

    app.useGlobalPipes(new ValidationPipe());

    const PORT = process.env.PORT
    await app.listen(PORT || 4002, () => {
        console.log(`Server is running at ${PORT}`)
        console.log(`Swagger http://localhost:4002/api`)

    });
}
bootstrap();
