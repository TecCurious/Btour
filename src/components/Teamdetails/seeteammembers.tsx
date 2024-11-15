"use client";
import React, { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
import { getAllTeamMembers } from "@/action/actions";
import { getTeamById } from "@/data/team";
import { removeTeamMember } from "@/data/teamMenber";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { BeatLoader } from "react-spinners";

interface TeamMember {
  id: string;
  paidAmount: number;
  payableAmount: number;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

const Seeteammembers = (params: any) => {
  // const router = useRouter();
  const teamid = params.teamid.params.team;
  const [teammembers, setTeammembers] = useState<TeamMember[] | string>([]);
  const [creatorId, setCreatorId] = useState<string | undefined>(undefined);
  const [teamName, setTeamName] = useState<string | undefined>(undefined);
  const [creatorName, setCreatorName] = useState<string | undefined>(undefined);
  const [createdAt, setCreatedAt] = useState<string | undefined>(undefined);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [memberToRemove, setMemberToRemove] = useState<{ id: string; name: string } | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    getAllmembers();
    getTeamDetails();
    setIsLoading(false);
  }, []);

  const userId = typeof window !== 'undefined' ? localStorage.getItem('id') || '' : '';
  
  const getAllmembers = async () => {
    const members = await getAllTeamMembers(teamid);
    setTeammembers(members);
  };

  const getTeamDetails = async () => {
    const team = await getTeamById(teamid);
    setCreatorId(team?.creatorId);
    setTeamName(team?.name.toUpperCase());
    setCreatorName(team?.creator.name);
    const date = team?.createdAt.toDateString();
    setCreatedAt(date);
    
  };

  const handleRemoveClick = (id: string, name: string) => {
    setMemberToRemove({ id, name });
    setIsDialogOpen(true);
  };

  const handleConfirmRemove = async () => {
    if (memberToRemove) {
      await removeTeamMember(memberToRemove.id);
      await getAllmembers();
    }
    setIsDialogOpen(false);
    setMemberToRemove(null);
  };

  if(isLoading){
    return <div className="h-screen flex items-center justify-center"><BeatLoader/></div>
  }

  return (
    <div className="max-w-7xl mx-auto mt-10">
      <h1 className="text-2xl font-semibold mb-6">{teamName}</h1>

      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 bg-gray-50 border-b text-left text-sm font-semibold text-gray-500 uppercase tracking-wider">
              Team ID: {teamid}
            </th>
            <th className="px-6 py-3 bg-gray-50 border-b text-left text-sm font-semibold text-gray-500 uppercase tracking-wider">
              Team Name: {teamName}
            </th>
            <th className="px-6 py-3 bg-gray-50 border-b text-left text-sm font-semibold text-gray-500 uppercase tracking-wider">
              Creator: {creatorName}
            </th>
            <th className="px-6 py-3 bg-gray-50 border-b text-left text-sm font-semibold text-gray-500 uppercase tracking-wider">
              Date: {createdAt}
            </th>
          </tr>
        </thead>
        <thead className="bg-gray-100">
          <tr>
            <th className="py-3 px-6 border-b text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              Member Name
            </th>
            <th className="py-3 px-6 border-b text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              Member Email
            </th>
            <th className="py-3 px-6 border-b text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              Paid Amount
            </th>
            <th className="py-3 px-6 border-b text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              Payble Amount
            </th>
            {userId === creatorId && (
              <th className="py-3 px-6 border-b text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {Array.isArray(teammembers) ? (
            teammembers.map((teammem: TeamMember) => (
              <tr key={teammem.id} className="hover:bg-gray-50">
                <td className="py-4 px-6 border-b text-sm text-gray-700">{teammem.user.name}</td>
                <td className="py-4 px-6 border-b text-sm text-gray-700">{teammem.user.email}</td>
                <td className="py-4 px-6 border-b text-sm text-gray-700">{teammem.paidAmount}</td>
                <td className="py-4 px-6 border-b text-sm text-red-500">{teammem.payableAmount}</td>
                {userId === creatorId && teammem.user.id != creatorId && (
                  <td className="py-4 px-6 border-b text-sm text-gray-700">
                    <button
                      className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                      onClick={() => handleRemoveClick(teammem.id, teammem.user.name)}
                    >
                      Remove
                    </button>
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="text-center py-4 text-sm text-gray-600">
                {teammembers}
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove Team Member</AlertDialogTitle>
            <AlertDialogDescription className="text-red-700">
              Are you sure you want to remove {memberToRemove?.name} from the team? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmRemove}>Remove</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Seeteammembers;