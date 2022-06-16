import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { Files, FilesDocument } from './schemas/files.schema';

@Injectable()
export class FilesService {
  constructor(
    @InjectModel(Files.name) private filesModel: Model<FilesDocument>,
  ) {}
  async create(createFileDto: CreateFileDto) {
    try {
      return await this.filesModel.create(createFileDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll() {
    return await this.filesModel.find();
  }

  async findOne(id: number) {
    return await this.filesModel.findOne({ _id: id });
  }

  async update(id: number, updateFileDto: UpdateFileDto) {
    return await this.filesModel.findByIdAndUpdate(id, updateFileDto);
  }

  async remove(id: number) {
    return await this.filesModel.findByIdAndRemove(id);
  }
}
