import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SignUpDto } from '../auth/req/signUp.dto';
import * as bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async findOne(email: string) {
    return this.userRepository.findOne(email);
  }

  async findByUuid(uuid: string) {
    return this.userRepository.findByUuid(uuid);
  }

  async create(signUpDto: SignUpDto) {
    return this.userRepository.create(signUpDto);
  }

  async updateRefreshToken(refreshToken: string, uuid: string) {
    return this.userRepository.updateRefreshToken(refreshToken, uuid);
  }
}
