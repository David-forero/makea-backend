import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import Stripe from 'stripe';
import { buffer } from 'micro';

@Injectable()
export class OrdersService {
  private stripe;
  endpointSecret = process.env.STRIPE_SIGNING_SECRET;

  constructor(private prisma: PrismaService) {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2022-11-15',
    });
  }

  async checkOutWithStripe(body: any): Promise<any> {
    
    const transformedItems = body.items.map((item) => ({
      quantity: 1,
      price_data: {
        currency: 'usd',
        unit_amount: item.price * 100,
        product_data: {
          name: item.title,
          description: item.description,
          images: [item.imgUrl],
        },
      },
    }));

    const session = await this.stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        shipping_options: [
            {
                shipping_rate_data: {
                  type: 'fixed_amount',
                  fixed_amount: {amount: 0, currency: 'usd'},
                  display_name: 'Delivery Gratis',
                  delivery_estimate: {
                    minimum: {unit: 'business_day', value: 5},
                    maximum: {unit: 'business_day', value: 7},
                  },
                },
              },
              {
                shipping_rate_data: {
                  type: 'fixed_amount',
                  fixed_amount: {amount: 1500, currency: 'usd'},
                  display_name: 'Delivery Normal',
                  delivery_estimate: {
                    minimum: {unit: 'business_day', value: 1},
                    maximum: {unit: 'business_day', value: 2},
                  },
                },
              },
          ],
        line_items: transformedItems,
        mode: 'payment',
        success_url: `${process.env.HOST_WEB}/orders`,
        cancel_url: `${process.env.HOST_WEB}`,
        metadata: {
            email: body.email,
            images: JSON.stringify(body.items.map(item => item.image))
        }
    })

    return session
  }


  async hooksStripe(body, headers) {
    const requestBuffer = await buffer(body);
    const payload = requestBuffer.toString();
    const sig = headers['stripe-signature'];
    console.log(headers);
    
    let event;

    //Obtengo mis eventos del webhook
    try {
        event = this.stripe.webhooks.constructEvent(payload, sig, this.endpointSecret)
    } catch (err) {
        console.log("ERROR", err.message);
    }

    //Cuando el pago fue sastifactorio se ejecuta el evento ✅
    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
    console.log('lets go!');
      
        //guardando la orden...
        
    }
  }


}
