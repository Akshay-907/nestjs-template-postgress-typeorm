import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Apply global validation pipe
  app.useGlobalPipes(new ValidationPipe());

  // Swagger Documentation (Optional)
  const config = new DocumentBuilder()
    .setTitle('NestJS Template API')
    .setDescription('API documentation for the NestJS template project')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Start the server
  await app.listen(3000, async () => {
    console.log(`Application is running on: ${await app.getUrl()}`);
  });
}

bootstrap();
