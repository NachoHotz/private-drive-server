import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { FilesModule } from './files/files.module';
import { UsersModule } from './users/users.module';
import { envConfig } from './config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [envConfig] }),
    MongooseModule.forRoot(
      process.env.NODE_ENV === 'development'
        ? process.env.MONGO_DEV_URI
        : process.env.MONGO_PROD_URI,
    ),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
    FilesModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
