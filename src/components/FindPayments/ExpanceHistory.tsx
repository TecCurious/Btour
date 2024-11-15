'use client'

import React, { useEffect, useState } from "react";
import { getTeamExpensesWithDetails } from "@/action/actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BeatLoader } from "react-spinners";

interface Expense {
  id: string;
  title: string;
  amount: number;
  createdAt: Date;
  team: {
    id: string;
    name: string;
  };
  creator: {
    id: string;
    user: {
      id: string;
      name: string;
      email: string;
    };
  };
}

const Findpayments = (params: any) => {
    const teamid = params.teamid.params.team;
    const [mememail, setMemEmail] = useState<string>("");
    const [payments, setPayments] = useState<Expense[]>([]);
    const [admin, setAdmin] = useState(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const email = localStorage.getItem('email') || "";
        setMemEmail(email);

        const fetchData = async () => {
            const response = await getTeamExpensesWithDetails(teamid);
            setPayments(response);
            // console.log(response);
            setIsLoading(false);
        };

        fetchData();
    }, [teamid, admin]);

    // Format date helper function
    const formatDate = (date: Date) => {
        return new Date(date).toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
    };

    
  if(isLoading){
    return <div className="h-screen flex items-center justify-center"><BeatLoader/></div>
  }


    return (
        <Card className="w-full max-w-6xl mx-auto my-6">
            <CardHeader>
                <CardTitle className="text-3xl font-bold text-center text-gray-800">
                    Expense Tracking & Settlements
                </CardTitle>
                <p className="text-center text-gray-600 mt-2">
                    Track and manage your shared expenses
                </p>
            </CardHeader>
            <CardContent>
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">Description</th>
                                <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">Paid By</th>
                                <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">Date</th>
                                <th className="py-3 px-6 text-right text-sm font-semibold text-gray-700">Amount</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {Array.isArray(payments) && payments.map((payment) => (
                                <tr 
                                    key={payment.id}
                                    className="hover:bg-gray-50 transition-colors duration-200"
                                >
                                    <td className="py-4 px-6 text-sm text-gray-800 font-medium">
                                        {payment.title}
                                    </td>
                                    <td className="py-4 px-6 text-sm text-gray-800">
                                        {payment.creator.user.name}
                                    </td>
                                    <td className="py-4 px-6 text-sm text-gray-600">
                                        {formatDate(payment.createdAt)}
                                    </td>
                                    <td className="py-4 px-6 text-sm text-right font-medium text-emerald-600">
                                        ₹ {payment.amount.toLocaleString('en-IN')}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>
    );
};

export default Findpayments;