'use client';

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createExpenseAndUpdateBalances } from "@/action/actions";
import { sendExpenseNotificationEmail } from "@/lib/mail";

interface TeamMember {
    id: string;
    teamid: string;
    teamname: string;
    memid: string;
    memname: string;
    mememail: string;
    memphone: string;
    memrole: string;
    isverfied: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const Createpayment = (params: any) => {
    const teamId = params.teamid.params.team;
    const creatorId = typeof window !== 'undefined' ? localStorage.getItem('id') || '' : '';

    const router = useRouter();
    const [amount, setAmount] = useState<number>(0);
    const [expenseTitle, setExpenseTitle] = useState<string>("");
    const [message, setMessage] = useState<string>('');
    const [isCreating, setIsCreating] = useState<boolean>(false);
    const [validationError, setValidationError] = useState<string>('');

    const handleExpenseTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setExpenseTitle(event.target.value);
        setValidationError('');
    };

    const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(parseInt(event.target.value) || 0);
        setValidationError('');
    };

    const validateInputs = (): boolean => {
        if (!expenseTitle.trim()) {
            setValidationError('Please enter an expense title');
            return false;
        }
        if (!amount || amount <= 0) {
            setValidationError('Please enter a valid amount');
            return false;
        }
        return true;
    };

    const handleSubmit = async () => {
        if (!validateInputs()) {
            return;
        }

        setIsCreating(true);
        try {
            const response = await createExpenseAndUpdateBalances(creatorId, teamId, expenseTitle, amount);
            if (response) {
                const notificationSent = await sendExpenseNotificationEmail(
                    teamId,
                    creatorId,
                    expenseTitle,
                    amount
                );
                
                setIsCreating(false);
                setAmount(0);
                setExpenseTitle('');
                setMessage(
                    notificationSent 
                        ? 'Expense successfully created and team notified!' 
                        : 'Expense created but there was an issue sending notifications.'
                );

                router.refresh();
            } else {
                setMessage("User not verified or there might be an issue. Please contact support at asrweb7@gmail.com.");
            }
        } catch (err) {
            console.log(err);
            setMessage("An error occurred. Please try again.");
        } finally {
            setIsCreating(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto mt-4 sm:mt-12 p-4 sm:p-6 bg-white shadow-md rounded-lg">
            <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center">Create a New Expense</h1>
            {true ? (
                <div className="flex flex-col items-center space-y-4 sm:space-y-6">
                    <input
                        type="text"
                        value={expenseTitle}
                        className="w-full sm:max-w-xs px-3 sm:px-4 py-2 text-sm sm:text-base border-2 border-gray-300 rounded-lg focus:outline-none focus:border-black"
                        placeholder="Enter Expense Title"
                        onChange={handleExpenseTitleChange}
                    />
                    <input
                        type="number"
                        value={amount || ''}
                        className="w-full sm:max-w-xs px-3 sm:px-4 py-2 text-sm sm:text-base border-2 border-gray-300 rounded-lg focus:outline-none focus:border-black"
                        placeholder="Enter Amount"
                        onChange={handleAmountChange}
                    />
                    {validationError && (
                        <p className="text-red-500 text-xs sm:text-sm">{validationError}</p>
                    )}
                    <button
                        className="w-full sm:max-w-xs px-4 sm:px-6 py-2 bg-blue-600 text-white text-sm sm:text-base font-semibold rounded-lg hover:bg-blue-500 disabled:bg-blue-300"
                        onClick={handleSubmit}
                        disabled={isCreating}
                    >
                        {isCreating ? "Creating..." : "Submit"}
                    </button>
                </div>
            ) : (
                <div className="text-center text-base sm:text-lg font-semibold text-red-600">
                    <p>You don't have access to add expenses</p>
                </div>
            )}
            {message && (
                <div className="mt-4 sm:mt-6 text-center text-base sm:text-lg font-semibold text-green-600">
                    {message}
                </div>
            )}
        </div>
    );
};

export default Createpayment;