import { Injectable } from "@nestjs/common";
import { SignUpDto } from "src/auth/req/signUp.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { v4 as uuid } from 'uuid';
import * as bcrypt from 'bcrypt';



@Injectable()
export class UserRepository {
    constructor(private prisma: PrismaService) {}
    async findOne(email: string) {
        return this.prisma.user.findFirst({
          where: {
            email,
          },
        });
      }
    
      async findByUuid(uuid: string) {
        return this.prisma.user.findFirst({
          where: {
            uuid,
          }
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
    
      async updateRefreshToken(refreshToken: string, uuid: string) {
        return this.prisma.user.update({
            where: {
                uuid,
            },
            data: {
                refreshToken: await bcrypt.hash(refreshToken, 10),
            }
        });
      }
}