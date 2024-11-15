"use server"
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getTeamById(teamId: string) {
  const team = await prisma.team.findUnique({
    where: { id: teamId },
    include: {
      creator: true,
      members: true,
      expenses: true
    }
  });

  return team;
}