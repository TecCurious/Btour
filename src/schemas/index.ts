
import { string, z } from "zod";


const nameSchema = z
  .string({ required_error: "Full name is required!" })
  .min(1, { message: "Full name is required!" })
  .min(3, { message: "Full name must be at least 3 characters." })
  .max(50, { message: "Full name must be at most 50 characters." });

const emailSchema = z
  .string({ required_error: "Email is required!" })
  .min(1, { message: "Email is required!" })
  .email({ message: "Invalid email!" });

const passwordSchema = z
  .string({ required_error: "Password is required!" })
  .min(1, { message: "Password is required!" })
  .min(8, { message: "Password must be at least 8 characters!" })
  .max(25, { message: "Password must be at most 25 characters!" });

export const RegisterUserSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
});

export const LoginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const ForgotPasswordSchema = z.object({
  email: emailSchema,
});

export const ResetPasswordSchema = z.object({
  password: passwordSchema,
});
