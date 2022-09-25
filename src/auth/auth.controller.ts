import {
  Body,
  Post,
  Controller,
  InternalServerErrorException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto, LoginUserDto } from 'src/users/dto';
import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signUp')
  async signUp(@Body() userCredentials: CreateUserDto) {
    try {
      return this.authService.signUp(userCredentials);
    } catch (e) {
      throw new InternalServerErrorException(`Error signin up: ${e.message}`);
    }
  }

  @Post('/login')
  async login(@Body() userCredentials: LoginUserDto) {
    try {
      return await this.authService.login(userCredentials);
    } catch (e) {
      throw new InternalServerErrorException(`Error login in: ${e.message}`);
    }
  }
}
