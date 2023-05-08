import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class FurnitureService {
    constructor(private prisma: PrismaService) {}

  async getFurnitures()  
  {    
      const result = await this.prisma.furniture.findMany()
      console.log('Se consulto muebles');
      
      return result;
  }

  async getFurniture(id: string){
    const result = await this.prisma.furniture.findUnique({
        where: {id},
    })

    return result;
  }
}
