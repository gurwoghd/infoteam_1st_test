import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SignUpDto } from '../auth/req/signUp.dto';
import * as bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findOne(email: string) {
    return this.prisma.user.findFirst({
      where: {
        email,
      },
    });
  }

  async create({ name, email, password }: SignUpDto) {
    return this.prisma.user.create({
      data: {
        uuid: uuid(),
        name,
        email,
        password: await bcrypt.hash(password, 10),
      },
    });
  }
}
