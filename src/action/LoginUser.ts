"use server";

import { findUserByEmail } from "@/data/user";
import { sendEmailVerificationEmail } from "@/lib/mail";
import { generateEmailVerificationToken } from "@/lib/Token";
// import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginSchema } from "@/schemas";
import  AuthError  from "next-auth";
import * as z from "zod";
import { loginUser } from "./actions";

export async function LoginUser(values: z.infer<typeof LoginSchema>) {
  const validation = LoginSchema.safeParse(values);

  if (!validation.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password } = validation.data;
  const existingUser = await findUserByEmail(email);

  if (!existingUser) {
    return { error: "Email does not exist!" };
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateEmailVerificationToken(
      existingUser.email
    );
    if (verificationToken) {
      await sendEmailVerificationEmail(
        verificationToken.token?.email,
        verificationToken.token?.token,
      );
      return { success: "Email sent for email verification!" };
    }
  }

  try {
   return await loginUser(email, password);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        default:
          return { error: "Something went wrong!" };
      }
    }

    throw error;
  }
}
