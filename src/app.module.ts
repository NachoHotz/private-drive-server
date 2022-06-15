import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { envConfig } from './config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, load: [envConfig] })],
  controllers: [],
  providers: [],
})
export class AppModule {}
