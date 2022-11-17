import { z } from 'zod';

export const UserSchema = z.object({
  id: z.number(),
  firstName: z.string(),
  lastName: z.string(),
  password: z.string(),
  email: z.string().email(),
  type: z.enum(['admin', 'noice']).optional()
});


export type UserType = z.infer<typeof UserSchema>;

export const userSignUpSchema = z.object({
  firstName: z.string().nonempty('firstName field is required'),
  lastName: z.string().nonempty('lastName field is required'),
  password: z.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
  email: z.string().nonempty('Email field is required').email(),
  type: z.string()
});

export const userSignInSchema = z.object({
  email: z.string().nonempty('email field is required').email(),
  password: z.string(),
});

export const ForgotPasswordSchema = z.object({
  email: z.string().nonempty('Email field is required').email(),
}).strict()

export const ResetPasswordSchema = z.object({
  email: z.string().nonempty('Email field is required').email(),
  password: z.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
  confirmationCode: z.string(),
}).strict();

export const inviteUserSchema = z.object({
  email: z.string().nonempty('Email field is required').email(),
});