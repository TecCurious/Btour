"use server"
import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

interface userData {
    name: string,
    email: string,
    password: string,
    profileImageUrl?: string,
    emailVerified?: Date,
}

// Create a new user
export async function createUser(data:userData): Promise<User> {
  return prisma.user.create({
    data
  });
}

// Delete a user by ID
export async function deleteUserById(id: string): Promise<User> {
  return prisma.user.delete({
    where: {
      id,
    },
  });
}

// Find a user by ID
export async function findUserById(id: string): Promise<User | null> {
  return prisma.user.findUnique({
    where: {
      id,
    },
  });
}

// Find a user by email
export async function findUserByEmail(email: string | undefined): Promise<User | null> {
  return prisma.user.findUnique({
    where: {
      email,
    },
  });
}

// Update a user's profile image
export async function updateUserProfileImage(
  userId: string,
  newProfileImageUrl: string
): Promise<User> {
  return prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      profileImageUrl: newProfileImageUrl,
    },
  });
}


export async function markUserEmailVerified(userId: string): Promise<void> {
  try{
    await prisma.user.update({
      where: { id: userId },
      data: { emailVerified: new Date() }
    });
  }catch(err){
    console.log(err);
  }
 
}