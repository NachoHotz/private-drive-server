import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { Files, FilesSchema } from './schemas/files.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Files.name, schema: FilesSchema }]),
  ],
  controllers: [FilesController],
  providers: [FilesService],
})
export class FilesModule {}
