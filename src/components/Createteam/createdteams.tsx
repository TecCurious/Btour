'use client'

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { createdTeam } from "@/action/actions";
import { Users, MapPin, Crown } from "lucide-react";

interface Team {
    id: string;
    name: string;
    destination: string | null;
    createdAt: Date;
}

const Createdteams = () => {
    const [email, setEmail] = useState<string>('');
    const [teams, setTeams] = useState<Team[]>([]);
    const creatorId = typeof window !== 'undefined' ? localStorage.getItem('id') || '' : '';

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
                    const createdteams = await createdTeam(creatorId);
                    setTeams(createdteams);
                } catch (error) {
                    console.error('Error fetching teams:', error);
                }
            }
        };

        fetchTeams();
    }, [email]);

    return (
        <div className="p-6 bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-center gap-3 mb-8">
                    <Crown className="w-8 h-8 text-blue-600" />
                    <h1 className="text-4xl font-bold text-gray-800">Teams Created By You</h1>
                </div>

                <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                                <tr className="bg-gradient-to-r from-blue-50 to-gray-50">
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        <div className="flex items-center gap-2">
                                            <span className="text-blue-600">#</span> Team ID
                                        </div>
                                    </th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        <div className="flex items-center gap-2">
                                            <Users className="w-4 h-4 text-blue-600" />
                                            Team Name
                                        </div>
                                    </th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        <div className="flex items-center gap-2">
                                            <MapPin className="w-4 h-4 text-blue-600" />
                                            Destination
                                        </div>
                                    </th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {teams.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                                            <div className="flex flex-col items-center gap-2">
                                                <Users className="w-6 h-6 text-gray-400" />
                                                No teams created yet
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    teams.map((team) => (
                                        <tr 
                                            key={team.id} 
                                            className="hover:bg-blue-50 transition-colors duration-200"
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {team.id}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-800">
                                                    {team.name}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-700">
                                                    {team.destination || '—'}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                <Link href={`/${team.id}/details`}>
                                                    <button className="inline-flex items-center gap-2 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200">
                                                        View Details
                                                    </button>
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Createdteams;