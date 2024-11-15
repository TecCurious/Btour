"use client"

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Joinedteam from "@/components/Jointeam/jointeam";
import Createteam from "@/components/Createteam/createteam";
import Createdteams from "@/components/Createteam/createdteams";
import Joinedteams from "@/components/Jointeam/joinedteams";
import Allteams from "@/components/Allmyteams/allteams";
import { 
    Users, 
    UserPlus, 
    LogOut,
    Layout,
    PlusCircle
} from "lucide-react";

export default function Home() {
    const [user, setUser] = useState<string | null>(null);
    const [teamType, setTeamType] = useState('create');
    const router = useRouter();

    useEffect(() => {
        const storedUser = localStorage.getItem("email");
        console.log(storedUser);
        setUser(storedUser);
    }, []);

    const logout = () => {
        localStorage.removeItem("email");
        localStorage.removeItem("id");
        localStorage.removeItem("teamId");
        setUser(null);
        router.push("/");
    };

    if (user === null) {
        return <></>;
    }

    return (
        <div className="flex min-h-[calc(100vh-64px)] bg-gray-50 z-0">
            {/* Left-side Dashboard - Fixed */}
            <div className="w-64 fixed left-0 bg-white  text-slate-700 h-[calc(100vh-64px)] p-5">
                <div className="flex items-center gap-3 mb-8">
                    <Layout className="w-6 h-6" />
                    <h2 className="text-xl font-bold">Team Management</h2>
                </div>
                
                <div className="space-y-3">
                    <button
                        className={`w-full flex items-center gap-3 p-3 rounded transition-colors
                            hover:bg-gray-50  ${teamType === 'create' ? "bg-blue-50 text-blue-600" : ""}`}
                        onClick={() => setTeamType('create')}
                    >
                        <PlusCircle className="w-5 h-5" />
                        <span>Create Team</span>
                    </button>

                    <button
                        className={`w-full flex items-center gap-3 p-3 rounded transition-colors
                            hover:bg-gray-50  ${teamType === 'join' ? "bg-blue-50 text-blue-600" : ""}`}
                        onClick={() => setTeamType('join')}
                    >
                        <UserPlus className="w-5 h-5" />
                        <span>Join Team</span>
                    </button>

                    <button
                        className={`w-full flex items-center gap-3 p-3 rounded transition-colors
                            hover:bg-gray-50 ${teamType === 'show' ? "bg-blue-50 text-blue-600" : ""}`}
                        onClick={() => setTeamType('show')}
                    >
                        <Users className="w-5 h-5" />
                        <span>All Teams</span>
                    </button>
                </div>

                <button 
                    onClick={logout} 
                    className="w-full mt-8 flex items-center justify-center gap-2 text-white bg-blue-600 
                        hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg 
                        text-sm px-5 py-2.5 transition-colors"
                >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                </button>
            </div>

            {/* Main Content Area - Scrollable with left margin */}
            <div className="flex-1 ml-64 min-h-[calc(100vh-64px)] overflow-y-auto p-6">
                {teamType === 'join' ? (
                    <>
                        <Joinedteam />
                        <Joinedteams />
                    </>
                ) : teamType === 'create' ? (
                    <>
                        <Createteam />
                        <Createdteams />
                    </>
                ) : teamType === 'show' ? (
                    <Allteams />
                ) : null}
            </div>
        </div>
    );
}