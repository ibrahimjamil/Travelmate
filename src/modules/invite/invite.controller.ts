import { Router, Request, Response } from 'express';
import nodemailer from 'nodemailer';
import {google} from 'googleapis'

export class InviteController {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  public postEmail = async (req: Request, res: Response) => {
    const { email } = req.body;
    const testAccount = await nodemailer.createTestAccount();
    const googleAPI = new google.auth.OAuth2(process.env.CLIENTID, process.env.CLIENT_SECRET, process.env.REDIRECT_URI)
    googleAPI.setCredentials({refresh_token: process.env.REFRESH_TOKEN})

    const accessToken = await googleAPI.getAccessToken();

    const transporter: any = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: 'ibrahimjamil090@gmail.com',
            clientId: process.env.CLIENTID,
            clientSecret: process.env.CLIENT_SECRET,
            refreshToken: process.env.REFRESH_TOKEN,
            accessToken: process.env.ACCESS_TOKEN
        }
    }) as any

    const info = await transporter.sendMail({
        from: 'ibrahimjamil090@gmail.com',
        to: `${email}`,
        subject: "Travelmate Invite",
        text: "Hy! I invite you to our app travelmate for travel user matching online this website https://travelmate-frontend.vercel.app/",
        html: "<b>Hy! I invite you to our app travelmate for travel user matching online</b>",
      });

    return res.status(200).send(info.messageId)
  };

  public routes() {
    this.router.post('/send', this.postEmail);
    return this.router;
  }
}
