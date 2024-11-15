"use server"
import { RegisterUserSchema } from "@/schemas";
import { z } from "zod";
import { findUserByEmail, createUser } from "@/data/user";
import bcrypt from "bcryptjs";
import { generateEmailVerificationToken } from "@/lib/Token";
import { sendEmailVerificationEmail } from "@/lib/mail";

interface UserInterface {
    name:string;
    email:string;
    password:string;
}

export async function registerUser(values: z.infer<typeof RegisterUserSchema>) {
    const validation = RegisterUserSchema.safeParse(values);
    if (!validation.success) {
      return { error: "Invalid fields!" } as const;
    }
  
    const { email, name, password } = validation.data;
  
    const existingUser = await findUserByEmail(email!);
    if (existingUser) {
      return { error: "User with this email already exists!" } as const;
    }
  
    const hashedPassword = await bcrypt.hash(password!, 10);
  
  
    const userData: UserInterface = {
      name,
      email,
      password: hashedPassword,
    };
    
  
    await createUser(userData);
    console.log(email);
  
    const verificationToken = await generateEmailVerificationToken(email);
    if (verificationToken) {
      await sendEmailVerificationEmail(
        verificationToken.token?.email,
        verificationToken.token?.token
      );
      return {
        success: "User created successfully and confirmation email sent!",
      } as const;
    } else {
      return { error: "Some error occurred!" } as const;
    }
  }