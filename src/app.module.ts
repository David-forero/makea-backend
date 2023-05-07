import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { UsersController, FurnitureController, OrdersController } from './controllers';
import { OrdersService, UsersService, FurnitureService } from './services';

@Module({
  imports: [],
  controllers: [AppController, UsersController, OrdersController, FurnitureController],
  providers: [AppService, PrismaService, OrdersService, FurnitureService, UsersService],
})
export class AppModule {}
