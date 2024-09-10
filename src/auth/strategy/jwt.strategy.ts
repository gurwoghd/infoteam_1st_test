import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'access_token') {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.ACCESS_TOKEN_KEY,
    });
  }

  async validate(payload: any) {
    return {
      userUuid: payload.userUuid,
      email: payload.email,
      username: payload.username,
    };
  }
}

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'refresh_token') {
  constructor(private configService: ConfigService, private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.refresh_token
        }]),
      ignoreExpiration: false,
      secretOrKey: process.env.REFRESH_TOKEN_KEY,
      passReqToCallBack: true,
    });
  }

  async validate(request: Request, payload: any) {
    const refreshToken = request.cookies['refreshToken'];
    const user = await this.userService.findByUuid(payload.email);

    if(!user) {
      throw new UnauthorizedException();
    }

    const isMatch = await this.isMatch(refreshToken, user.refreshToken);

    if(!isMatch) throw new UnauthorizedException();

    return {
        userUuid: payload.userUuid,
        email: payload.email,
        username: payload.username,
     };
  }

  async isMatch(refreshToken: string, userRefreshToken: string) {
    return bcrypt.compare(refreshToken, userRefreshToken);
  }
}
