import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class FurnitureService {
    constructor(private prisma: PrismaService) {}

  async getFurnitures()  
  {    
      const result = await this.prisma.furniture.findMany()
      return result;
  }

  async getFurniture(id: string){
    const result = await this.prisma.furniture.findUnique({
        where: {id},
    })

    return result;
  }
}
