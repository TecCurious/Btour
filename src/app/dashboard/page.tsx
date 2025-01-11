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
    PlusCircle,
    Menu,
    X
} from "lucide-react";

export default function Home() {
    const [user, setUser] = useState<string | null>(null);
    const [teamType, setTeamType] = useState('create');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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

    const handleNavClick = (type: string) => {
        setTeamType(type);
        setIsSidebarOpen(false);
    };

    if (user === null) {
        return <></>;
    }

    return (
        <div className="relative min-h-[calc(100vh-64px)] bg-gray-50">
            {/* Mobile Menu Toggle - Adjusted position */}
            <button
                className="md:hidden fixed top-20 left-2 z-50 p-2 bg-white rounded-lg shadow-lg"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
                {isSidebarOpen ? (
                    <X className="w-6 h-6 text-gray-600" />
                ) : (
                    <Menu className="w-6 h-6 text-gray-600" />
                )}
            </button>

            {/* Rest of the component remains the same */}
            <div className={`
                fixed left-0 bg-white text-slate-700 h-[calc(100vh-64px)] w-64 p-5
                transition-transform duration-300 ease-in-out z-40
                md:translate-x-0
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <div className="flex items-center gap-3 mb-8">
                    <Layout className="w-6 h-6" />
                    <h2 className="text-xl font-bold">Team Management</h2>
                </div>
                
                <div className="space-y-3">
                    <button
                        className={`w-full flex items-center gap-3 p-3 rounded transition-colors
                            hover:bg-gray-50 ${teamType === 'create' ? "bg-blue-50 text-blue-600" : ""}`}
                        onClick={() => handleNavClick('create')}
                    >
                        <PlusCircle className="w-5 h-5" />
                        <span>Create Team</span>
                    </button>

                    <button
                        className={`w-full flex items-center gap-3 p-3 rounded transition-colors
                            hover:bg-gray-50 ${teamType === 'join' ? "bg-blue-50 text-blue-600" : ""}`}
                        onClick={() => handleNavClick('join')}
                    >
                        <UserPlus className="w-5 h-5" />
                        <span>Join Team</span>
                    </button>

                    <button
                        className={`w-full flex items-center gap-3 p-3 rounded transition-colors
                            hover:bg-gray-50 ${teamType === 'show' ? "bg-blue-50 text-blue-600" : ""}`}
                        onClick={() => handleNavClick('show')}
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

            {/* Overlay for mobile */}
            {isSidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Main Content Area */}
            <div className={`
                min-h-[calc(100vh-64px)] overflow-y-auto transition-all duration-300
                md:ml-64 p-4 md:p-6
                ${isSidebarOpen ? 'ml-64' : 'ml-0'}
            `}>
                <div className="mt-14 md:mt-0">
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
        </div>
    );
}