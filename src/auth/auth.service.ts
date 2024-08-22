import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { SignUpDto } from './req/signUp.dto';
import { JwtService } from '@nestjs/jwt';

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

  async login(user: any) {
    const payload = {
      username: user.username,
      userUuid: user.uuid,
      email: user.email,
    };

    return { accessToken: await this.jwtService.sign(payload) };
  }
}
