import { Router, Request, Response } from 'express';
import nodemailer from 'nodemailer';

export class InviteController {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  public postEmail = async (req: Request, res: Response) => {
    const { email } = req.body;
    const testAccount = await nodemailer.createTestAccount();
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'jacklyn.kreiger@ethereal.email',
            pass: '144s42UK4gAHaAkGT8'
        }
    }) 

    const info = await transporter.sendMail({
        from: 'ibrahimjamil090@gmail.com',
        to: `${email}`,
        subject: "Travelmate Invite",
        text: "Hy! I invite you to our app travelmate for travel user matching online",
        html: "<b>Hy! I invite you to our app travelmate for travel user matching online</b>",
      });

    return res.status(200).send(info.messageId)
  };

  public routes() {
    this.router.post('/send', this.postEmail);
    return this.router;
  }
}
