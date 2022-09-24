import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { corsOptions, envConfig, swaggerConfig } from './config';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');

  const PORT = envConfig().API_PORT;
  const NODE_ENV = envConfig().NODE_ENV;

  app.use(helmet());

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api-docs', app, document);

  // whitelist any non-specified property in request body by a DTO
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  app.enableCors(corsOptions);

  await app.listen(PORT || 3001);
  logger.log(`Server running on port ${PORT || 3001} in ${NODE_ENV} mode`);
}
bootstrap();
