'use client'

import React, { useState, useEffect } from "react";
import { joinTeam } from "@/action/actions";
import { X } from "lucide-react";

const JoinTeam = () => {
    const [email, setEmail] = useState('');
    const [teamid, setTeamid] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [formVisible, setFormVisible] = useState(false);
    
    const userId = typeof window !== 'undefined' ? localStorage.getItem('id') || '' : '';
    
    useEffect(() => {
        const storedEmail = localStorage.getItem('email');
        if (storedEmail) {
            setEmail(storedEmail);
        }
    }, []);

    const handleSubmit = async () => {
        if (!teamid) {
            setStatus('error');
            setMessage('Please fill in the team ID.');
            return;
        }

        setStatus('loading');
        setMessage('Joining Team...');

        try {
            const response = await joinTeam(userId, teamid);
            
            if (typeof response === "string") {
                setStatus('error');
                setMessage(response);
            } else {
                setStatus('success');
                setMessage('Successfully joined the team!');
                setTeamid('');
                // Auto-hide form after successful join after 2 seconds
                setTimeout(() => {
                    setFormVisible(false);
                    setMessage('');
                    setStatus('idle');
                }, 2000);
            }
        } catch (err) {
            console.log(err);
            setStatus('error');
            setMessage('Error joining team. Please try again.');
        }
    };

    const handleClose = () => {
        setFormVisible(false);
        setMessage('');
        setStatus('idle');
        setTeamid('');
    };

    const getMessageColor = () => {
        switch (status) {
            case 'error':
                return 'text-red-600';
            case 'success':
                return 'text-green-600';
            default:
                return 'text-blue-600';
        }
    };

    return (
        <div className="flex flex-col items-center justify-center rounded-lg">
            {!formVisible ? (
                <button
                    onClick={() => setFormVisible(true)}
                    className="px-6 bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition duration-200 mb-4 shadow-sm hover:shadow-md"
                >
                    Join a Team
                </button>
            ) : (
                <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md border border-gray-100 relative animate-fadeIn">
                    <button
                        onClick={handleClose}
                        className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <X size={20} />
                    </button>
                    
                    <h2 className="text-xl font-semibold mb-6 text-gray-800">Join a Team</h2>
                    
                    <div className="space-y-4">
                        <input
                            type="text"
                            value={teamid}
                            onChange={(e) => setTeamid(e.target.value)}
                            placeholder="Enter Team ID"
                            className="border border-gray-300 rounded-md p-3 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        />

                        <button
                            onClick={handleSubmit}
                            disabled={status === 'loading'}
                            className={`w-full bg-blue-600 text-white font-semibold py-3 rounded-md transition duration-200 ${
                                status === 'loading' 
                                    ? 'opacity-75 cursor-not-allowed' 
                                    : 'hover:bg-blue-700 hover:shadow-md'
                            }`}
                        >
                            {status === 'loading' ? 'Joining...' : 'Join Team'}
                        </button>

                        {message && (
                            <p className={`mt-4 text-center ${getMessageColor()} transition-colors`}>
                                {message}
                            </p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default JoinTeam;