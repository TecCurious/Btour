"use client"
import React, { useState } from "react";
import Link from "next/link";
import { Users, Receipt, FileSpreadsheet, ArrowLeft, Menu, X } from "lucide-react";
import Findpayments from "@/components/FindPayments/ExpanceHistory";
import Seeteammembers from "@/components/Teamdetails/seeteammembers";
import Createpayment from "@/components/createpayment/CreateExpence";

const Teamdetail = (params: any) => {
  const [activePage, setActivePage] = useState('team-members');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  const handleNavigation = (id: string) => {
    setActivePage(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Container */}
      <div className="flex">
        {/* Sidebar */}
        <div className={`
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} 
          md:translate-x-0
          w-64 
          bg-white shadow-lg
          fixed 
          top-0
          left-0
          h-screen
          z-40
          transition-transform duration-300
        `}>
          <div className="p-4 flex flex-col gap-3">
            <div className="md:hidden flex justify-end">
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <Link href="/dashboard">
              <button className="w-full flex items-center justify-center gap-2 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Dashboard</span>
              </button>
            </Link>
          </div>

          <nav className="mt-4">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.id)}
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

        {/* Overlay for mobile */}
        {isMobileMenuOpen && (
          <div 
            className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        {/* Main Content Area */}
        <div className="flex-1 md:ml-64">
          {/* Top Navigation Bar */}
          <div className="bg-white shadow-sm h-14 fixed top-0 left-0 right-0 z-20 md:left-64">
            <div className="flex items-center h-full px-4">
              <button 
                onClick={() => setIsMobileMenuOpen(true)}
                className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                <Menu className="w-6 h-6" />
              </button>
              <div className="ml-4 flex items-center gap-2">
                {navigationItems.find(item => item.id === activePage)?.icon}
                <h1 className="text-xl font-semibold text-gray-800">
                  {navigationItems.find(item => item.id === activePage)?.label}
                </h1>
              </div>
            </div>
          </div>

          {/* Page Content */}
          <div className="p-4 mt-14">
            <div className="bg-white rounded-xl shadow-sm">
              <div className="p-4">
                <div className="mt-2">
                  {renderComponent()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Teamdetail;