import {
  Controller,
  Post,
  Body,
  Get,
} from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaClient } from '@prisma/client';

@Controller('test')
export class AppController {
  constructor(
    private readonly appService: AppService,
  ) {}
  
@Post('')
  async signupUser(@Body() userData: { name?: string; email: string; birthYear?: number}) {
    return this.appService.getProducts();
  }
}