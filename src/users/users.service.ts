import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import bcrypt from 'bcrypt';
import { CreateUserDto, LoginUserDto } from './dto';
import { User, UserDocument } from './schemas/user.schema';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
  ) {}

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

      const createdUser = await this.userModel.create({
        ...createUserDto,
        password: hashedPassword,
      });

      const access_token = this.jwtService.sign(createdUser);

      return { createdUser, access_token };
    } catch (e) {
      throw new InternalServerErrorException(
        `Error registering user: ${e.message}`,
      );
    }
  }

  async login(userInfo: LoginUserDto) {
    try {
      const { email, password } = userInfo;

      const user = await this.userModel.findOne({ email });

      if (!user) {
        throw new NotFoundException('Invalid email or password');
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        throw new BadRequestException('Invalid email or password');
      }

      const access_token = this.jwtService.sign(user);

      return { user, access_token };
    } catch (e) {
      throw new InternalServerErrorException(`Error logging in: ${e.message}`);
    }
  }
}
