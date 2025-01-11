"use client";
import React, { useEffect, useState } from "react";
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
    <div className="w-full px-4 md:px-6">
      <h1 className="text-xl md:text-2xl font-semibold mb-4">{teamName}</h1>

      {/* Team Info Cards - Mobile Friendly */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4 text-sm">
        <div className="bg-white p-3 rounded shadow-sm">
          <p className="text-gray-500 text-xs">Creator</p>
          <p className="font-medium truncate">{creatorName}</p>
        </div>
        <div className="bg-white p-3 rounded shadow-sm">
          <p className="text-gray-500 text-xs">Date</p>
          <p className="font-medium">{createdAt}</p>
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Member Name</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Paid</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Payable</th>
              {userId === creatorId && (
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              )}
            </tr>
          </thead>
          <tbody>
            {Array.isArray(teammembers) && teammembers.map((teammem: TeamMember) => (
              <tr key={teammem.id} className="border-t border-gray-100">
                <td className="px-4 py-3 text-sm">{teammem.user.name}</td>
                <td className="px-4 py-3 text-sm">{teammem.user.email}</td>
                <td className="px-4 py-3 text-sm">{teammem.paidAmount}</td>
                <td className="px-4 py-3 text-sm text-red-500">{teammem.payableAmount}</td>
                {userId === creatorId && teammem.user.id !== creatorId && (
                  <td className="px-4 py-3 text-sm">
                    <button
                      onClick={() => handleRemoveClick(teammem.id, teammem.user.name)}
                      className="bg-red-700 text-white px-3 py-1 rounded-full text-xs hover:bg-red-800"
                    >
                      Remove
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-3">
        {Array.isArray(teammembers) && teammembers.map((teammem: TeamMember) => (
          <div key={teammem.id} className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-medium">{teammem.user.name}</h3>
                <p className="text-sm text-gray-500 truncate">{teammem.user.email}</p>
              </div>
              {userId === creatorId && teammem.user.id !== creatorId && (
                <button
                  onClick={() => handleRemoveClick(teammem.id, teammem.user.name)}
                  className="bg-red-700 text-white px-3 py-1 rounded-full text-xs hover:bg-red-800"
                >
                  Remove
                </button>
              )}
            </div>
            <div className="grid grid-cols-2 gap-2 mt-3">
              <div className="bg-gray-50 p-2 rounded">
                <p className="text-xs text-gray-500">Paid Amount</p>
                <p className="font-medium">{teammem.paidAmount}</p>
              </div>
              <div className="bg-gray-50 p-2 rounded">
                <p className="text-xs text-gray-500">Payable Amount</p>
                <p className="font-medium text-red-500">{teammem.payableAmount}</p>
              </div>
            </div>
          </div>
        ))}
        {!Array.isArray(teammembers) && (
          <div className="text-center py-4 text-sm text-gray-600">
            {teammembers}
          </div>
        )}
      </div>

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