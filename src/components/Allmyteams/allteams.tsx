'use client'
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getAllTeamsForUser } from "@/action/actions";

interface Team {
    id: string;
    name: string;
    destination: string | null;
    createdAt: Date;
}

const Allteams = () => {
    const [email, setEmail] = useState<string>('');
    const [teams, setTeams] = useState<Team[]>([]);
    const userId = typeof window !== 'undefined' ? localStorage.getItem('id') || '' : '';

    useEffect(() => {
        const storedEmail = localStorage.getItem('email');
        if (storedEmail) {
            setEmail(storedEmail);
        }
    }, []);

    useEffect(() => {
        const fetchTeams = async () => {
            if (email) {
                try {
                    const teamsData = await getAllTeamsForUser(userId);
                    setTeams(teamsData);
                } catch (error) {
                    console.error('Error fetching teams:', error);
                }
            }
        };

        fetchTeams();
    }, [email]);

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">All Your Teams</h1>

            <div className="overflow-hidden rounded-lg shadow-lg border border-gray-200">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-sky-50">
                            <tr>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600 tracking-wider">
                                    Team ID
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600 tracking-wider">
                                    Team Name
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600 tracking-wider">
                                    Destination
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600 tracking-wider">
                                    Link
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {teams.map((team) => (
                                <tr key={team.id} className="hover:bg-gray-50 transition-colors duration-200">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                        {team.id}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                        {team.name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                        {team.destination}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                                        <Link href={`/${team.id}/details`}>
                                            <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200">
                                                View Details
                                            </button>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Allteams;