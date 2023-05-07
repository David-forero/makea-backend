import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import stripe from 'stripe'

@Injectable()
export class OrdersService {
    constructor(private prisma: PrismaService){}

   checkOutWithStripe({items, email}){
    const transformedItems = items.map(item => ({
        quantity: 1,
        price_data: {
            currency: 'usd',
            unit_amount: item.price * 100,
            product_data: {
                name: item.title,
                description: item.description,
                images: [item.image]
            },

        }
    }));

    // const session = await stripe.checkout.sessions.create({
    //     payment_method_types: ['card'],
    //     shipping_options: [
    //         {
    //             shipping_rate_data: {
    //               type: 'fixed_amount',
    //               fixed_amount: {amount: 0, currency: 'usd'},
    //               display_name: 'Delivery Gratis',
    //               delivery_estimate: {
    //                 minimum: {unit: 'business_day', value: 5},
    //                 maximum: {unit: 'business_day', value: 7},
    //               },
    //             },
    //           },
    //           {
    //             shipping_rate_data: {
    //               type: 'fixed_amount',
    //               fixed_amount: {amount: 1500, currency: 'usd'},
    //               display_name: 'Next day air',
    //               delivery_estimate: {
    //                 minimum: {unit: 'business_day', value: 1},
    //                 maximum: {unit: 'business_day', value: 1},
    //               },
    //             },
    //           },
    //       ],
    //     line_items: transformedItems,
    //     mode: 'payment',
    //     success_url: `${process.env.HOST}/success`,
    //     cancel_url: `${process.env.HOST}/checkout`,
    //     metadata: {
    //         email,
    //         images: JSON.stringify(items.map(item => item.image))
    //     }
    // })
   }


}
