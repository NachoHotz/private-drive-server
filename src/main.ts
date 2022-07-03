import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { corsOptions } from './config';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');

  app.use(helmet());

  // SWAGGER config
  const config = new DocumentBuilder()
    .setTitle('Private Drive API')
    .setDescription('Private Drive API documentation')
    .setVersion('0.0.1')
    .setContact(
      'Juan Hotz',
      'https://github.com/nachohotz',
      'juanhotz611@gmail.com',
    )
    .addServer('http://localhost:3001')
    .addBearerAuth(
      {
        type: 'http',
        in: 'header',
        name: 'Authorization',
        bearerFormat: 'Bearer',
        description: 'Bearer access token',
      },
      'Access token',
    )
    .addTag('files')
    .addTag('users')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  // whitelist any non-specified property in request body by a DTO
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  app.enableCors(corsOptions);

  await app.listen(process.env.PORT || 3001);
  logger.log(`Server running on port ${process.env.PORT || 3001}`);
}
bootstrap();
