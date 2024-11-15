"use server"
import nodemailer from "nodemailer";
import  prisma  from "@/lib/prisma";

const transporter = nodemailer.createTransport({
  host: process.env.NODEMAILER_HOST,
  port: parseInt(process.env.NODEMAILER_PORT!),
  auth: {
    user: process.env.NODEMAILER_EMAIL_USER,
    pass: process.env.NODEMAILER_EMAIL_PASSWORD,
  },
});

export async function sendEmailVerificationEmail(email: string | undefined, token: string | undefined) {
  const emailVerificationUrl = `${process.env.NEXT_PUBLIC_BASE_URL}${process.env.NEXT_PUBLIC_EMAIL_VERIFICATION_ENDPOINT}`;
  const url = `${emailVerificationUrl}?token=${token}`;

  try {
    console.log(`Sending email for account activation to ${email}`);
    const info = await transporter.sendMail({
      from: process.env.NODEMAILER_EMAIL_USER,
      to: email,
      subject: "Activate your account",
      html: `<p>Click <a href="${url}">here</a> to activate your account.</p>`,
    });
    console.log("Email sent: %s", info.messageId);
  } catch (error) {
    console.error(`Error sending email!`, error);
  }
}

export async function sendPasswordResetEmail(email: string, token: string) {
  const resetPasswordUrl = `${process.env.NEXT_PUBLIC_BASE_URL}${process.env.NEXT_PUBLIC_RESET_PASSWORD_ENDPOINT}`;
  const url = `${resetPasswordUrl}?token=${token}`;

  try {
    console.log(`Sending email to reset password to ${email}`);
    const info = await transporter.sendMail({
      from: process.env.NODEMAILER_EMAIL_USER,
      to: email,
      subject: "Reset your password",
      html: `<p>Click <a href="${url}">here</a> to reset your password.</p>`,
    });
    console.log("Email sent: %s", info.messageId);
  } catch (error) {
    console.error(`Error sending email!`, error);
  }
}


export async function sendExpenseNotificationEmail(
  teamId: string,
  creatorId: string,
  expenseTitle: string,
  amount: number
) {
  try {
      // Get team data with creator and all members including their user details
      const team = await prisma.team.findUnique({
          where: { id: teamId },
          include: {
              members: {
                  include: {
                      user: {
                          select: {
                              name: true,
                              email: true
                          }
                      }
                  }
              }
          }
      });

      if (!team || !team.members.length) {
          console.error("Team or members not found");
          return false;
      }
      console.log("CreatorID",creatorId);
      // Find the creator's details
      const creator = team.members.find(member => member.userId === creatorId);
      if (!creator) {
          console.error("Creator not found in team members");
          return false;
      }

      // Get all team members' emails (excluding null emails)
      const emailAddresses = team.members
          .map(member => member.user.email)
          .filter(email => email !== null);

      // Calculate share amount per member
      const shareAmount = amount / team.members.length;

      const emailContent = `
          <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #333;">New Expense Added to ${team.name}</h2>
              <p style="color: #666; font-size: 16px;">A new expense has been added to your team.</p>
              
              <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
                  <p style="margin: 5px 0;"><strong>Created by:</strong> ${creator.user.name}</p>
                  <p style="margin: 5px 0;"><strong>Expense Title:</strong> ${expenseTitle}</p>
                  <p style="margin: 5px 0;"><strong>Total Amount:</strong> ₹${amount.toFixed(2)}</p>
                  <p style="margin: 5px 0;"><strong>Your Share:</strong> ₹${shareAmount.toFixed(2)}</p>
              </div>

              <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
                  <h3 style="color: #333; margin-top: 0;">Expense Distribution</h3>
                  <p>This expense has been equally divided among ${team.members.length} team members.</p>
              </div>
              
              ${team.destination ? 
                  `<p style="color: #666;"><strong>Team Destination:</strong> ${team.destination}</p>` 
                  : ''}
              
              <p style="color: #666; font-size: 14px;">
                  You can view the full expense details and balances by logging into your account.
              </p>
              
              <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #eee;">
                  <p style="color: #888; font-size: 12px;">
                      This is an automated notification. Please do not reply to this email.
                  </p>
              </div>
          </div>
      `;

      const info = await transporter.sendMail({
          from: process.env.NODEMAILER_EMAIL_USER,
          to: emailAddresses,
          subject: `New Expense Added - ${team.name}`,
          html: emailContent,
      });

      console.log("Notification emails sent: %s", info.messageId);
      return true;
  } catch (error) {
      console.error("Error sending expense notification emails:", error);
      return false;
  }
}