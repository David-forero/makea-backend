import {
  Body,
  Controller,
  Get,
  HttpStatus,
  NotAcceptableException,
  NotFoundException,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { UsersService } from 'src/services';
import * as bcrypt from 'bcrypt';

@Controller('')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/signup')
  async signUp(
    @Res() res,
    @Body('password') password: string,
    @Body('phone') phone: string,
    @Body('email') email: string,
  ) {
    const user = await this.usersService.findUser(email);
    if (user) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        status: 301,
        message: 'Usuario ya existe',
        data: false,
      });
    }
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);

    const response = await this.usersService.register(
      email,
      phone,
      hashedPassword,
    );

    return res.status(HttpStatus.OK).json({
      status: 200,
      message: 'Successfully!',
      data: response,
    });
  }

  @Post('/signin')
  async signIn(
    @Res() res,
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    const user = await this.usersService.findUser(email);

    const passwordValid = await bcrypt.compare(password, user.password);
    
    if (!user) {
      return res.status(HttpStatus.NOT_FOUND).json({
        status: 404,
        message: 'usuario no existe',
        data: false,
      });
    }

    if (!passwordValid) {
      return res.status(HttpStatus.NOT_FOUND).json({
        status: 301,
        message: 'Clave invalida',
        data: false,
      });
    }
    if (user && passwordValid) {
      return res.status(HttpStatus.OK).json({
        message: 'Successfully!',
        data: user,
      });
    }

    return;
   
  }
}
