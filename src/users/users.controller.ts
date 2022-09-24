import { Controller, Post, Body } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto, LoginUserDto } from './dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiResponse({
    status: 200,
    type: LoginUserDto,
    description: 'User logged in',
  })
  @Post('/login')
  async signIn(@Body() userInfo: LoginUserDto) {
    return await this.usersService.login(userInfo);
  }

  @ApiResponse({
    status: 201,
    type: CreateUserDto,
    description: 'User created',
  })
  @Post('/signUp')
  async signUp(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.signUp(createUserDto);
  }
}
