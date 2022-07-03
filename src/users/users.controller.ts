import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiResponse({
    status: 201,
    type: CreateUserDto,
    description: 'User created',
  })
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.register(createUserDto);
  }

  @ApiResponse({
    status: 200,
    isArray: true,
    type: CreateUserDto,
    description: 'All users',
  })
  @ApiResponse({ status: 404, description: 'Users not found' })
  @Get()
  findAll() {
    const allUsers = this.usersService.findAll();

    if (!allUsers || allUsers.length === 0) {
      throw new NotFoundException('No users found');
    }

    return { users: allUsers };
  }

  @ApiResponse({ status: 200, type: CreateUserDto, description: 'One User' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @ApiResponse({
    status: 200,
    type: CreateUserDto,
    description: 'User updated',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request with value types in request body',
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @ApiResponse({ status: 200, description: 'User deleted successfully' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
