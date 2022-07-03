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
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async register(createUserDto: CreateUserDto) {
    try {
      const userExists = await this.userModel.findOne({
        email: createUserDto.email,
      });

      if (userExists) {
        throw new BadRequestException(
          `The user with email ${createUserDto.email} already exists`,
        );
      }

      const hashedPassword = await bcrypt.hash(createUserDto.password, 12);

      const createdUser = await this.userModel.create({
        ...createUserDto,
        password: hashedPassword,
      });

      return createdUser;
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

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
