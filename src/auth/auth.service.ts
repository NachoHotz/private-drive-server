import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto, LoginUserDto } from 'src/users/dto';
import { IUser } from 'src/users/interface/user.interface';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(userInfo: LoginUserDto) {
    try {
      const user = await this.validateUser(userInfo.email, userInfo.password);
      return this.signJwt(user);
    } catch (e) {
      throw new InternalServerErrorException(`Error login in: ${e.message}`);
    }
  }

  async signUp(userCredentials: CreateUserDto) {
    try {
      const userExists = await this.usersService.findOne({
        email: userCredentials.email,
        password: userCredentials.password,
      });

      if (userExists) {
        throw new BadRequestException(
          `There is already a user registered with the email ${userExists.email}`,
        );
      }

      const createdUser = await this.usersService.create(userCredentials);

      return {
        createdUser,
        access_token: this.signJwt(createdUser.createdUser),
      };
    } catch (e) {
      throw new InternalServerErrorException(`Error signin up: ${e.message}`);
    }
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOne({ email, password });
    if (user && user.password === password) {
      return user;
    }
    return null;
  }

  signJwt(userInfo: IUser) {
    return this.jwtService.sign(userInfo);
  }
}
