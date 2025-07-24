import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    ///////// swagger

    const config = new DocumentBuilder()
        .setTitle('Itter example')
        .setDescription('The Itter API description')
        .setVersion('1.0')
        .addTag('Itter')
        .build();
    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, documentFactory);
    const PORT = process.env.PORT
    await app.listen(PORT || 3000, () => {
        console.log(`Server is running at ${PORT}`)
        console.log(`Swagger http://localhost:4002/api`)
        
    });
}
bootstrap();
