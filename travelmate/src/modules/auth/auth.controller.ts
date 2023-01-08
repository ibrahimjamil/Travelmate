import { Router, Request, Response, NextFunction } from 'express';
import AuthService from './auth.service';
import UserService from '../users/user.service';
import {
  ForgotPasswordSchema,
  ResetPasswordSchema,
  userSignInSchema,
  userSignUpSchema,
} from '../users/user.types';

export class AuthController {
  public router: Router;
  public authService = AuthService;
  public userService = UserService;

  constructor() {
    this.router = Router();
    this.routes();
  }

  // eslint-disable-next-line consistent-return
  public signUp = async (req: Request, res: Response, next: NextFunction) => {
    const schemaValidation = userSignUpSchema.safeParse(req.body);

    if (schemaValidation.success) {
      // eslint-disable-next-line prefer-const
      let { firstName, lastName, password, email, type } = req.body;

      const userAttr = [];
      userAttr.push({ Name: 'email', Value: email });
      userAttr.push({ Name: 'custom:type', Value: type });

      try {
        const data: any = await this.authService.signUpUser(email, password, userAttr);
        if (!data.error) {
          if (!!data?.UserConfirmed && !!data?.UserSub) {
            try {
              await this.userService.addUser({
                email,
                firstName,
                lastName,
                type
              });
              next();
            } catch (error: any) {
              res.status(500).json({
                error: true,
                message: error.message,
              });
            }
          }
        } else {
          res.status(403).json({
            error: true,
            ...data,
          });
        }
      } catch (error: any) {
        res.status(500).json({
          error: true,
          message: error.message,
        });
      }
    } else if (!schemaValidation.success) {
      res.status(400).send({
        error: true,
        zodError: true,
        errorFields: schemaValidation.error.errors.map((error) => error.path[0]),
      });
    }
  };

  public signIn = async (req: Request, res: Response) => {
    const body = {
      email: req.body.email,
      password: req.body.password,
    };
    const schemaValidation = userSignInSchema.safeParse(body);
    if (schemaValidation.success) {
      const { email, password } = body;
      try {
        const data: any = await this.authService.signInUser(email, password);
        if (!data.error) {
          res.status(200).json({
            error: false,
            ...data,
          });
        } else {
          res.status(403).json({
            error: true,
            ...data,
          });
        }
      } catch (error: any) {
        res.status(500).json({
          error: true,
          message: error.message,
        });
      }
    } else if (!schemaValidation.success) {
      res.status(400).send({
        error: true,
        zodError: true,
        errorFields: schemaValidation.error.errors.map((error) => error.path[0]),
      });
    }
  };

  public forgotPassword = async (req: Request, res: Response) => {
    const schemaValidation = ForgotPasswordSchema.safeParse(req.body);
    if (schemaValidation.success) {
      try {
        const user = await this.userService.getOneUser(schemaValidation.data.email);
        if (user) {
          const data: any = await this.authService.forgotPassword(schemaValidation.data.email);
          if (!data.error) {
            res.status(200).send({
              error: false,
              data: data?.CodeDeliveryDetails,
              message: 'Reset code send to your destination email',
            });
          } else {
            res.status(404).send({
              error: true,
              message: `cognito didn't able to recognize your email`,
            });
          }
        } else {
          res.status(404).send({
            error: true,
            message: `Email does not exists`,
          });
        }
      } catch (error: any) {
        res.status(404).send({
          error: true,
          message: error.message,
        });
      }
    } else if (!schemaValidation.success) {
      res.status(400).send({
        error: true,
        zodError: true,
        message: 'schema validation error',
      });
    }
  };

  public resetPassword = async (req: Request, res: Response) => {
    const schemaValidation = ResetPasswordSchema.safeParse(req.body);
    if (schemaValidation.success) {
      try {
        const user = await this.userService.getOneUser(schemaValidation.data.email);
        if (user) {
          const data: any = await this.authService.resetPassword({
            email: schemaValidation.data.email,
            password: schemaValidation.data.password,
            confirmationCode: schemaValidation.data.confirmationCode,
          });
          if (!data.error) {
            res.status(200).send({
              error: false,
              message: 'Your password has been set successfully',
            });
          } else {
            res.status(404).send({
              error: true,
              message: data.message,
            });
          }
        } else {
          res.status(404).send({
            error: true,
            message: 'Email does not exists',
          });
        }
      } catch (error: any) {
        res.status(404).send({
          error: true,
          message: error.message,
        });
      }
    } else if (!schemaValidation.success) {
      res.status(400).send({
        error: true,
        zodError: true,
        message: 'schema validation error',
        errorFields: schemaValidation.error.errors.map((error) => error.path[0]),
      });
    }
  };

  public routes() {
    this.router.post('/signUp', this.signUp, this.signIn);
    this.router.post('/signIn', this.signIn);
    this.router.post('/forgotPassword', this.forgotPassword);
    this.router.post('/resetPassword', this.resetPassword);
    return this.router;
  }
}
