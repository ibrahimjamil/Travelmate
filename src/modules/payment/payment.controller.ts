import { Router, Request, Response } from 'express';
import PaymentService from './payment.service';
const stripe = require('stripe')('sk_test_26PHem9AhJZvU623DfE1x4sd');

export class PaymentController {
  public router: Router;
  public paymentService = PaymentService;

  constructor() {
    this.router = Router();
    this.routes();
  }

  public createPayment = async (req: Request, res: Response) => {
    // dummy payment success
    const session = await  stripe.paymentIntents.create({
      amount: 500,
      currency: 'gbp',
      payment_method: 'pm_card_visa',
    });
  
    res.status(200).send({
      error: false,
      message: 'Payment Successfull'
    });
  }

  public routes() {
    this.router.post('/create-checkout-session', this.createPayment);
    return this.router
  }
}
