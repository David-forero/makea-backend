import { Body, Controller, Get, Headers, HttpStatus, Post, Res } from '@nestjs/common';
import { OrdersService } from 'src/services';

@Controller('')
export class OrdersController {
  constructor(private readonly orderService: OrdersService) {}

  @Post('/create-checkout-session')
  async createOrder(@Res() res, @Body() body) {
    const order = await this.orderService.checkOutWithStripe(body);

    return res.status(HttpStatus.OK).json({
        data: order,
        status: 200,
        message: 'Success'
    })
  }

  @Post('/webhook')
  async webhookStripe(@Res() res, @Body() body, @Headers() headers) {
    const order = await this.orderService.hooksStripe(body, headers);

    return res.status(HttpStatus.OK).json({
        data: order,
        status: 200,
        message: 'Success'
    })
  }

  @Post('/get-orders')
  async getOrders(@Res() res, ){

  }
}





