import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { SignUpDto } from './req/signUp.dto';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string) {
    const user = await this.userService.findOne(username);

    if (!user) return null;
    if (await bcrypt.compare(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async signup(query: SignUpDto) {
    return this.userService.create(query);
  }

  async login(user: any, res: any) {
    const accessToken = await this.createAccessToken(user);
    const refreshToken = await this.createRefreshToken(user);

    res.setHeader('Authorization', 'Bearer' + accessToken);
    res.cookie('refreshToken', refreshToken);

    await this.userService.updateRefreshToken(refreshToken, user.uuid);

    const payload = {
      username: user.username,
      userUuid: user.uuid,
      email: user.email,
    };

    return { accessToken, refreshToken };
  }

  async createAccessToken(user: any) {
    const payload = {
      username: user.username,
      userUuid: user.uuid,
      email: user.email,
    };

    return this.jwtService.signAsync(payload, {
      secret: process.env.ACCESS_TOKEN_KEY,
    })
  }

  async createRefreshToken(user: any) {
    const payload = {
      username: user.username,
      userUuid: user.uuid,
      email: user.email,
    };

    return this.jwtService.signAsync(payload, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });
  }
  
  async refresh(user: any, refreshToken: string) {
    const accessToken = await this.createAccessToken(user);

    return { accessToken };
  }
}
