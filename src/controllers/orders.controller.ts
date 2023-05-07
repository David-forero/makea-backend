import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
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
}
