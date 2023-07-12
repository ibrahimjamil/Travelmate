import { Router, Request, Response } from 'express';
import nodemailer from 'nodemailer';
import {google, google} from 'googleapis'

export class InviteController {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  public postEmail = async (req: Request, res: Response) => {
    const { email } = req.body;
    const testAccount = await nodemailer.createTestAccount();
    const CLIENTID = '855982585807-29ct3cdn2ff42kc9j2ij90voumtvog2s.apps.googleusercontent.com'
    const CLIENT_SECRET = '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'
    const REDIRECT_URI = 'https://developers.google.com/oauthplayground'
    const REFRESH_TOKEN = '1//049a9IZLSpMhECgYIARAAGAQSNwF-L9IrklDwV7L8xL8vTWj0xEzcW5Quv_o05oWv409CgLfWVkpZf1rZMCJIdZm0ou6WcGcHgK0'

    const googleAPI = new google.auth.OAuth2(CLIENTID, CLIENT_SECRET, REDIRECT_URI)
    googleAPI.setCredentials({refresh_token: REFRESH_TOKEN})

    const accessToken = await googleAPI.getAccessToken();

    const transporter: any = nodemailer.createTransport<any>({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: 'jacklyn.kreiger@ethereal.email',
            clientId: CLIENTID,
            clientSecret: CLIENT_SECRET,
            refreshToken: REFRESH_TOKEN,
            accessToken: accessToken
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
