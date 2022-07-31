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
      return this.filesModel.create(createFileDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll() {
    return this.filesModel.find();
  }

  async findOne(id: number) {
    return this.filesModel.findOne({ _id: id });
  }

  async update(id: number, updateFileDto: UpdateFileDto) {
    return this.filesModel.findByIdAndUpdate(id, updateFileDto);
  }

  async remove(id: number) {
    return this.filesModel.findByIdAndRemove(id);
  }
}
