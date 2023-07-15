import { Router, Request, Response } from 'express';
import PaymentService from './payment.service';
const stripe = require('stripe')('sk_test_51NTsCuLT8CFim6xhVOFFDpjOUF2s59j9MZCFGSwY3cwNC2xnP5oGEJyxLa6nt39N8yVVlTC2sBZTxA6flx871DEA00px775nMX');

export class PaymentController {
  public router: Router;
  public paymentService = PaymentService;

  constructor() {
    this.router = Router();
    this.routes();
  }

  public createPayment = async (req: Request, res: Response) => {
    const storeItems = new Map([
      [1, { priceInCents: 10000, name: "PC Hotel" }],
      [2, { priceInCents: 10000, name: "Avari Hotel" }],
    ])
    try {
      const storeItem = storeItems.get(Number(req.query.id) || 1)
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        line_items: [{
            price_data: {
              currency: "usd",
              product_data: {
                name: storeItem?.name,
              },
              unit_amount: storeItem?.priceInCents,
            },
            quantity: 1,
          }
        ],
        success_url: `${process.env.CLIENT_URL}/payment-success`,
        cancel_url: `${process.env.CLIENT_URL}/payment-fail`,
      })
      res.json({ url: session.url })
    } catch (e: any) {
      res.status(500).json({ error: e.message })
    }
  }

  public routes() {
    this.router.post('/create-checkout-session', this.createPayment);
    return this.router
  }
}
