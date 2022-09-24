import { DocumentBuilder } from '@nestjs/swagger';
// SWAGGER config
export const swaggerConfig = new DocumentBuilder()
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
