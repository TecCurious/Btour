"use client"
import React, { useState } from "react";
import Link from "next/link";
import { Users, Receipt, FileSpreadsheet, ArrowLeft } from "lucide-react";
import Findpayments from "@/components/FindPayments/ExpanceHistory";
import Seeteammembers from "@/components/Teamdetails/seeteammembers";
import Createpayment from "@/components/createpayment/CreateExpence";

const Teamdetail = (params: any) => {
  const [activePage, setActivePage] = useState('team-members');

  const renderComponent = () => {
    switch(activePage) {
      case 'team-members':
        return <Seeteammembers teamid={params} />;
      case 'create-payment':
        return <Createpayment teamid={params} />;
      case 'find-payments':
        return <Findpayments teamid={params} />;
      default:
        return <Seeteammembers teamid={params} />;
    }
  };

  const navigationItems = [
    {
      id: 'team-members',
      label: 'Team Members',
      icon: <Users className="w-5 h-5" />
    },
    {
      id: 'create-payment',
      label: 'Create Expense',
      icon: <Receipt className="w-5 h-5" />
    },
    {
      id: 'find-payments',
      label: 'Expenses History',
      icon: <FileSpreadsheet className="w-5 h-5" />
    }
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-4">
          <Link href="/dashboard">
            <button className="flex items-center gap-2 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="mt-6">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors
                ${activePage === item.id 
                  ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600' 
                  : 'text-gray-600 hover:bg-gray-50'}`}
            >
              {item.icon}
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-6">
            {/* Page Title */}
            <div className="mb-6 flex items-center gap-3">
              {navigationItems.find(item => item.id === activePage)?.icon}
              <h1 className="text-2xl font-semibold text-gray-800">
                {navigationItems.find(item => item.id === activePage)?.label}
              </h1>
            </div>
            
            {/* Component Render Area */}
            <div className="mt-4">
              {renderComponent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Teamdetail;