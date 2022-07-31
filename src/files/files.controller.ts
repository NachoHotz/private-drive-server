import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  NotFoundException,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { FilesService } from './files.service';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';

@ApiTags('files')
@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @ApiResponse({ status: 200, description: 'File created' })
  @ApiResponse({
    status: 400,
    description: 'Bad request with the request body, probably types validation',
  })
  @Post()
  async create(@Body() createFileDto: CreateFileDto) {
    return this.filesService.create(createFileDto);
  }

  @ApiResponse({ status: 200, description: 'Files found' })
  @ApiResponse({ status: 404, description: 'Files not found' })
  @ApiResponse({
    status: 500,
    description: 'Internal server error. Probably no network connection',
  })
  @Get()
  async findAll() {
    const allFiles = await this.filesService.findAll();

    if (!allFiles || allFiles.length === 0) {
      throw new NotFoundException('No files found');
    }

    return { files: allFiles };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const uniqueFile = await this.filesService.findOne(+id);

    if (!uniqueFile) {
      throw new NotFoundException('File not found');
    }

    return { file: uniqueFile };
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateFileDto: UpdateFileDto) {
    return this.filesService.update(+id, updateFileDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.filesService.remove(+id);
  }
}
