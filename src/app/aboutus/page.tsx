import React from "react"
import Link from "next/link"

const AboutPage = () => {
  return (
    <>
      <div className="flex flex-col md:flex-row justify-between py-[6%] px-[10%]">
        <div className="px-3 w-full md:w-[500px]">
          <svg viewBox="0 0 800 600" className="w-full h-auto rounded-3xl mt-3">
            <rect x="0" y="0" width="800" height="600" fill="#f8fafc"/>
            <circle cx="400" cy="300" r="250" fill="#f0f9ff" opacity="0.5"/>
            
            {/* Main Screen */}
            <rect x="250" y="150" width="300" height="200" rx="10" fill="#1B3A60"/>
            <rect x="270" y="170" width="260" height="140" rx="5" fill="white"/>
            
            {/* Graph */}
            <path d="M290 270 L330 240 L370 260 L410 220 L450 230 L490 200" 
                  stroke="#3b82f6" 
                  fill="none" 
                  stroke-width="3"/>
            <circle cx="330" cy="240" r="4" fill="#3b82f6"/>
            <circle cx="370" cy="260" r="4" fill="#3b82f6"/>
            <circle cx="410" cy="220" r="4" fill="#3b82f6"/>
            <circle cx="450" cy="230" r="4" fill="#3b82f6"/>
            
            {/* Single Person Icon - Centered */}
            <circle cx="400" cy="400" r="35" fill="#1B3A60"/>
            <circle cx="400" cy="385" r="14" fill="#3b82f6"/>
            <path d="M375 420 Q400 440 425 420" fill="#3b82f6"/>
            
            {/* Currency Symbols */}
            <text x="280" y="200" fill="#1B3A60" font-size="20">₹</text>
            <text x="480" y="200" fill="#1B3A60" font-size="20">$</text>
            <text x="380" y="200" fill="#1B3A60" font-size="20">€</text>
          </svg>
        </div>
        
        <div className="text-[#1B3A60] my-3 w-full md:w-[50%]">
          <div className="text-xl font-bold uppercase tracking-wider relative group cursor-pointer mb-6">
            <span className="text-gray-800">About</span>
            <span className="text-blue-500 ml-2">BTour</span>
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></div>
          </div>

          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-semibold mb-3">Our Mission</h2>
              <p className="text-gray-700">
                We make group travel expenses simple. Split costs, track spending, and focus on creating memories instead of managing money.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-semibold text-blue-500 mb-2">Easy Splitting</h3>
                <p className="text-gray-600">Automatically divide expenses fairly among your group</p>
              </div>

              <div className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-semibold text-blue-500 mb-2">Real-time Tracking</h3>
                <p className="text-gray-600">Keep everyone updated with instant expense updates</p>
              </div>
            </div>

            <div>
              <Link href="/auth/register">
                <button className="py-2 px-6 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-300">
                  Start Your Journey
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Simplified Stats */}
      {/* <div className="bg-gray-50 px-[10%] py-8">
        <div className="bg-white rounded-lg p-6 text-center">
          <div className="text-3xl font-bold text-blue-500 mb-2">10K+ Trips Managed</div>
          <p className="text-[#1B3A60]">Helping travelers focus on experiences, not expenses</p>
        </div>
      </div> */}

      <div className="flex bg-[#1B3A60] h-[30px] justify-between px-4"></div>
    </>
  )
}

export default AboutPage