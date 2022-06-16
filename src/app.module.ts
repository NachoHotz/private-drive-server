import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { FilesModule } from './files/files.module';
import { UsersModule } from './users/users.module';
import { envConfig } from './config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [envConfig] }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    FilesModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
