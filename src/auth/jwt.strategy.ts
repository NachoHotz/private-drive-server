import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from 'src/users/dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      seccretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(userInfo: LoginUserDto) {
    const user = await this.authService.validateUser(
      userInfo.email,
      userInfo.password,
    );
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
