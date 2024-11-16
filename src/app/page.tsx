import Image from "next/image"
import Link from "next/link"
import React from "react"

export default async function Home() {
  return (
    <>
      <div className="flex flex-col md:flex-row-reverse justify-between py-[6%] px-[10%]">
        <div className="px-3">
          <Image
            src="/image/bt.jpg"
            alt="Logo"
            height={500}
            width={500}
            className="rounded-3xl mt-3"
          />
        </div>
        <div className="text-[#1B3A60] my-3 w-full md:w-[40%]">
          <h1 className="font-bold text-[30px] py-3">
            <div className="text-xl font-bold uppercase tracking-wider relative group cursor-pointer">
              <span className="text-gray-800">B</span>
              <span className="text-blue-500">Tour</span>
              <span className="ml-2">Travel Expense Splitting</span>
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></div>
            </div>
          </h1>
          <p className="py-3">
            Effortlessly manage travel expenses with our money-splitting tool. Keep
            track of shared costs, divide expenses fairly among friends, and enjoy
            stress-free trips without worrying about who owes what.
          </p>
          <div className="flex items-center w-[100%] my-2">
            <Link href={"/auth/register"}>
              <button className="py-2 px-5 bg-blue-500 text-white border rounded-full hover:bg-blue-600 transition-colors duration-300">
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Simplified Feature Cards */}
      <div className="px-[10%] py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="group p-6 bg-white rounded-xl border border-gray-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer">
            <h3 className="text-[#1B3A60] font-semibold text-lg mb-2 group-hover:text-blue-500 transition-colors duration-300">
              Split Expenses
            </h3>
            <p className="text-gray-600">
              Fairly divide costs among friends with just a few taps
            </p>
          </div>

          <div className="group p-6 bg-white rounded-xl border border-gray-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer">
            <h3 className="text-[#1B3A60] font-semibold text-lg mb-2 group-hover:text-blue-500 transition-colors duration-300">
              Track Real-time
            </h3>
            <p className="text-gray-600">
              Keep everyone updated with instant expense tracking
            </p>
          </div>

          <div className="group p-6 bg-white rounded-xl border border-gray-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer">
            <h3 className="text-[#1B3A60] font-semibold text-lg mb-2 group-hover:text-blue-500 transition-colors duration-300">
              Multi-currency
            </h3>
            <p className="text-gray-600">
              Handle expenses in any currency with automatic conversion
            </p>
          </div>
        </div>
      </div>

      <div className="flex bg-[#1B3A60] h-[30px] justify-between px-4"></div>
    </>
  )
}