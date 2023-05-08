import { Injectable, } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async register(email, phone: string, password): Promise<User> {
    const result = await this.prisma.user.create({
      data: { email, phone, password },
    });

    return result;
  }

  async findUser(email) {
    const result = await this.prisma.user.findUnique({
      where: {email}
    });
    return result
  }
}
