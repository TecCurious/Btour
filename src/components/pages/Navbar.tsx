"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

 const Navbar = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const email = typeof window !== 'undefined' ? localStorage.getItem('email') || '' : '';
    if (email) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, []); // This will only run once after the component mounts

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <nav className="relative bg-white shadow-md">
        <div className="flex justify-between items-center px-4 py-4">
          {/* Logo */}
          <div>
            <Link href={"/"}>
              <div className="text-xl font-bold uppercase tracking-wider relative group cursor-pointer">
                <span className="text-gray-800">B</span>
                <span className="text-blue-500">Tour</span>
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></div>
              </div>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex">
            <ul className="flex font-bold cursor-pointer text-[#1B3A60]">
              <li className="px-4 hover:text-[#2d517d] transition-colors">
                <Link href={"/"}>Home</Link>
              </li>
              <li className="px-4 hover:text-[#2d517d] transition-colors">
                <Link href={"/aboutus"}>About us</Link>
              </li>
              {isLogin && (
                <li className="px-4 hover:text-[#2d517d] transition-colors">
                  <Link href={"/dashboard"}>Dashboard</Link>
                </li>
              )}
            </ul>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 text-gray-600 hover:text-gray-800 focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg z-50">
            <ul className="flex flex-col font-bold text-[#1B3A60] py-2">
              <li className="px-4 py-2 hover:bg-gray-50">
                <Link href={"/"} onClick={toggleMenu}>Home</Link>
              </li>
              <li className="px-4 py-2 hover:bg-gray-50">
                <Link href={"/aboutus"} onClick={toggleMenu}>About us</Link>
              </li>
              {isLogin && (
                <li className="px-4 py-2 hover:bg-gray-50">
                  <Link href={"/dashboard"} onClick={toggleMenu}>Dashboard</Link>
                </li>
              )}
            </ul>
          </div>
        )}
      </nav>
    </div>
  )
}

export default Navbar