import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MinLength, IsOptional } from 'class-validator';
import { User } from '../interface/user.interface';

export class CreateUserDto implements User {
  @ApiProperty({ type: String, description: 'User name', example: 'John Doe' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: String,
    description: 'User email',
    example: 'john@doe.com',
  })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    type: String,
    description: 'User password',
    minLength: 6,
    example: '123456',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiProperty({
    type: String,
    description: 'User avatar',
    example: 'avatar.png',
  })
  @IsOptional()
  @IsString()
  avatar?: string;
}
