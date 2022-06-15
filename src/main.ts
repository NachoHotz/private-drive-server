import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { corsOptions } from './config';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());
  app.enableCors(corsOptions);

  await app.listen(3000);
  console.log(`Server running on ${await app.getUrl()}`);
}
bootstrap();
