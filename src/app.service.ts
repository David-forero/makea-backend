import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  async getProducts()  
  {    
      const result = await this.prisma.furniture.findMany()
      return result;
  }
}