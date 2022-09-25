import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import bcrypt from 'bcrypt';
import { CreateUserDto, LoginUserDto } from './dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const hashedPassword = await bcrypt.hash(createUserDto.password, 12);

      const createdUser = await this.userModel.create({
        ...createUserDto,
        password: hashedPassword,
      });

      return { createdUser };
    } catch (e) {
      throw new InternalServerErrorException(
        `Error registering user: ${e.message}`,
      );
    }
  }

  async findOne(userInfo: LoginUserDto) {
    try {
      const user = await this.userModel.findOne({ email: userInfo.email });

      if (!user) {
        throw new UnauthorizedException();
      }

      const isPasswordValid = await bcrypt.compare(
        userInfo.password,
        user.password,
      );

      if (!isPasswordValid) {
        throw new UnauthorizedException();
      }

      return user;
    } catch (e) {
      throw new InternalServerErrorException(
        `Error finding user: ${e.message}`,
      );
    }
  }
}
