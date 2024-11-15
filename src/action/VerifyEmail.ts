"use server";

import {
  deleteEmailVerificationToken,
  findEmailVerificationTokenByToken,
} from "@/data/email-verification-token";
import { findUserByEmail, markUserEmailVerified } from "@/data/user";

export async function verifyEmail(token: string) {
  const existingToken = await findEmailVerificationTokenByToken(token);

  if (!existingToken) {
    return { error: "Token does not exist!" } as const;
  }

  if (isTokenExpired(existingToken.token?.expiresAt)) {
    return { error: "Token has expired!" } as const;
  }


  console.log("verify email",existingToken.token?.email);
  const existingUser = await findUserByEmail(existingToken.token?.email);
  if (!existingUser) {
    return { error: "Email does not exist!" } as const;
  }

  console.log(existingUser);

  await markUserEmailVerified(existingUser.id);
  await deleteEmailVerificationToken(existingToken.token?.id);

  return { success: "Email verified!" } as const;
}

function isTokenExpired(expiryDate: Date | undefined): boolean {
    if(expiryDate){
        return expiryDate < new Date();
    }
  return false;
}
