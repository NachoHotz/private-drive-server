import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail, IsString, MinLength } from 'class-validator';
import { IUser } from '../interface/user.interface';

export class LoginUserDto implements Partial<IUser> {
  @ApiProperty({
    type: String,
    description: 'User email',
    example: 'juanhotz@gmail.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    type: String,
    description: 'User password',
    example: 'strongpassword',
    minLength: 6,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;
}
