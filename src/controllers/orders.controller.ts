import { Body, Controller, Get, Headers, HttpStatus, Param, Post, Res } from '@nestjs/common';
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

  @Get('/getorder/:userId')
  async getOrdersByUser(@Res() res, @Param('userId') userId: string) {
    const order = await this.orderService.getOrdersUser(userId);
    
    return res.status(HttpStatus.OK).json({
        data: order,
        status: 200,
        message: 'Success'
    })
  }

  @Post('/webhook')
  async webhookStripe(@Res() res, @Body() body, @Headers('stripe-signature') header) {
    
    const order = await this.orderService.hooksStripe(body, header);

    return res.status(HttpStatus.OK).json({
        data: order,
        status: 200,
        message: 'Success'
    })
  }

  @Post('/create-order-form-movil')
  async createOrderMovilR(@Res() res, @Body() body){
    const order = await this.orderService.createOrderMovil(body)

    res.status(HttpStatus.OK).json({
      data: order,
      status: 200,
      message: 'success'
    })
  }
}





