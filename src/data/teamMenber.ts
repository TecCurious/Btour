"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

interface DeleteTeamMemberResponse {
  success: boolean;
  message: string;
}

export async function removeTeamMember(
  memberId: string
): Promise<DeleteTeamMemberResponse> {
  try {
    // First, fetch the team member with all related data
    const teamMember = await prisma.teamMember.findUnique({
      where: { id: memberId },
      include: {
        user: true,
        team: true,
        createdExpenses: {
          include: {
            shares: true,
          },
        },
        expenseShares: true,
      },
    });

    if (!teamMember) {
      return {
        success: false,
        message: `Team member with id ${memberId} not found.`,
      };
    }

    // Check if the member has any outstanding balance
    if (teamMember.payableAmount > 0) {
      return {
        success: false,
        message: `Cannot remove member with outstanding balance of ${teamMember.payableAmount}`,
      };
    }

    // Begin transaction to ensure all operations succeed or fail together
    await prisma.$transaction(async (tx) => {
      // 1. Delete all expense shares associated with this member
      await tx.expenseShare.deleteMany({
        where: { memberId: teamMember.id },
      });

      // 2. For expenses created by this member:
      // First, delete all shares of these expenses
      await tx.expenseShare.deleteMany({
        where: {
          expense: {
            creatorId: teamMember.id,
          },
        },
      });

      // Then delete the expenses themselves
      await tx.expense.deleteMany({
        where: { creatorId: teamMember.id },
      });

      // 3. Finally, delete the team member record
      await tx.teamMember.delete({
        where: { id: teamMember.id },
      });
    });

    // Revalidate the team members page to update the UI
    revalidatePath(`/team/${teamMember.teamId}/members`);

    return {
      success: true,
      message: `Successfully removed ${teamMember.user.name} from the team`,
    };
  } catch (error) {
    console.error("Error removing team member:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to remove team member",
    };
  }
}