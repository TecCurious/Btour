
import { PrismaClient, emailVerificationTokens } from '@prisma/client';

const prisma = new PrismaClient();

// Types and Interfaces
interface CreateEmailVerificationTokenParams {
  email: string;
  token: string;
  expiresAt: Date;
}

interface VerificationTokenResponse {
  success: boolean;
  token: emailVerificationTokens | null;
  error?: string;
}

interface DeleteTokenResponse {
  success: boolean;
  error?: string;
}

// Custom error class
class VerificationTokenError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'VerificationTokenError';
  }
}

// Helper function to handle errors
function handleError(error: unknown): VerificationTokenResponse {
  const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
  return {
    success: false,
    token: null,
    error: errorMessage
  };
}

// Main functions
export async function createEmailVerificationToken({
  email,
  token,
  expiresAt,
}: CreateEmailVerificationTokenParams): Promise<VerificationTokenResponse> {
  try {
    const emailVerificationToken = await prisma.emailVerificationTokens.create({
      data: {
        email,
        token,
        expiresAt,
      },
    });

    return {
      success: true,
      token: emailVerificationToken,
    };
  } catch (error) {
    return handleError(error);
  }
}

export async function deleteEmailVerificationToken(
  id: string |undefined
): Promise<DeleteTokenResponse> {
  try {
    await prisma.emailVerificationTokens.delete({
      where: {
        id,
      },
    });

    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to delete token',
    };
  }
}

export async function findEmailVerificationTokenByToken(
  token: string
): Promise<VerificationTokenResponse> {
  try {
    const emailVerificationToken = await prisma.emailVerificationTokens.findUnique({
      where: {
        token,
      },
    });

    if (!emailVerificationToken) {
      throw new VerificationTokenError('Token not found');
    }

    return {
      success: true,
      token: emailVerificationToken,
    };
  } catch (error) {
    return handleError(error);
  }
}

export async function findEmailVerificationTokenByEmail(
  email: string
): Promise<VerificationTokenResponse> {
  try {
    const emailVerificationToken = await prisma.emailVerificationTokens.findUnique({
      where: {
        email,
      },
    });

    if (!emailVerificationToken) {
      throw new VerificationTokenError('No token found for this email');
    }

    return {
      success: true,
      token: emailVerificationToken,
    };
  } catch (error) {
    return handleError(error);
  }
}

// Utility function to check if a token is expired
export function isTokenExpired(token: emailVerificationTokens): boolean {
  return new Date() > new Date(token.expiresAt);
}
