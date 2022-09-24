import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async signUp(createUserDto: CreateUserDto) {
    try {
      const userExists = await this.userModel.findOne({
        email: createUserDto.email,
      });

      if (userExists) {
        throw new BadRequestException(
          `There is already a user registered with the email ${createUserDto.email}`,
        );
      }

      const hashedPassword = await bcrypt.hash(createUserDto.password, 12);

      return await this.userModel.create({
        ...createUserDto,
        password: hashedPassword,
      });
    } catch (e) {
      throw new InternalServerErrorException(
        `Error creating user: ${e.message}`,
      );
    }
  }

  async login(email: string, password: string) {
    try {
      const user = await this.userModel.findOne({ email });

      if (!user) {
        throw new NotFoundException('Invalid email or password');
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        throw new BadRequestException('Invalid email or password');
      }

      return user;
    } catch (e) {
      throw new InternalServerErrorException(`Error logging in: ${e.message}`);
    }
  }
}
