"use server"
import { v4 as uuidv4 } from "uuid";

import { findEmailVerificationTokenByEmail,
    deleteEmailVerificationToken,
    createEmailVerificationToken
 } from "@/data/email-verification-token";


export async function generateEmailVerificationToken(email: string) {
    console.log("generating email vefication token");
    const expirationTimeMs = parseInt(
      process.env.EMAIL_VERIFICATION_TOKEN_EXPIRY_TIME_MS!
    );
  
    try {
      const existingToken = await findEmailVerificationTokenByEmail(email);
      if (existingToken) {
        await deleteEmailVerificationToken(existingToken?.token?.id);
      }
  
      const token = uuidv4();
      const expiresAt = new Date(new Date().getTime() + expirationTimeMs);
      console.log("emailVarification generated");
      return await createEmailVerificationToken({ email, token, expiresAt });

    } catch (error) {
      console.error(`Error generating token`, error);
      return null;
    }
  }