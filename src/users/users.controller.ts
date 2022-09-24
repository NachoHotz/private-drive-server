import {
  Controller,
  Post,
  Body,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto, LoginUserDto } from './dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/login')
  async signIn(@Body() userInfo: LoginUserDto) {
    return this.usersService.login(userInfo);
  }

  @ApiResponse({
    status: 201,
    type: CreateUserDto,
    description: 'User created',
  })
  @Post('/signUp')
  async signUp(@Body() createUserDto: CreateUserDto) {
    return this.usersService.signUp(createUserDto);
  }
}
