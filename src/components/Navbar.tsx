'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import logo from '@/assets/logo.png';
import { usePlan } from '@/context/PlanContext';

const Navbar = () => {
  const pathname = usePathname();
  
  
  const { planList, savedList } = usePlan();

 
  const isActive = (path: string) => pathname === path;

  return (
    <header className="w-full bg-[#0C0D10] border-b border-[#1C1F26] px-6 md:px-12 py-3">
      <div className="navbar p-0 min-h-0 w-full flex justify-between items-center">
        
       
        <div className="navbar-start gap-2">
         
          <div className="dropdown">
            <div 
              tabIndex={0} 
              role="button" 
              className="btn btn-ghost p-1 min-h-0 h-auto lg:hidden text-white"
            >
              <svg 
                aria-label="Toggle Navigation" 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              > 
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> 
              </svg>
            </div>
            
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-[#1C1F26] rounded-box z-50 mt-3 w-52 p-2 shadow text-white border border-[#2D313B]"
            >
              <li>
                <Link 
                  href="/" 
                  className={isActive('/') ? 'text-[#CCFF00] font-bold' : 'text-gray-300'}
                >
                  Workouts
                </Link>
              </li>
              <li>
                <Link 
                  href="/my-plan" 
                  className={isActive('/my-plan') ? 'text-[#CCFF00] font-bold' : 'text-gray-300'}
                >
                  My Plan
                </Link>
              </li>
            </ul>
          </div>

          
          <Link href="/" className="flex items-center gap-2">
            <Image 
              src={logo} 
              alt="FITLOG Logo" 
              width={28} 
              height={28} 
              className="object-contain" 
              priority
            />
            <span className="text-white font-extrabold text-xl tracking-wider">FITLOG</span>
          </Link>
        </div>

        
        <div className="navbar-center hidden lg:flex">
          <nav className="flex items-center gap-1 bg-[#000000] p-1 rounded-full border border-[#1C1F26]">
            <Link
              href="/"
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                isActive('/')
                  ? 'bg-[#1A2312] text-[#CCFF00] border border-[#2D313B]'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Workouts
            </Link>
            <Link
              href="/my-plan"
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                isActive('/my-plan')
                  ? 'bg-[#1A2312] text-[#CCFF00] border border-[#2D313B]'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              My Plan
            </Link>
          </nav>
        </div>

       
        <div className="navbar-end flex items-center gap-4 justify-end">
          
          <Link 
            href="/my-plan" 
            className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors"
          >
            <span>Plan</span>
         
            <span className="bg-[#CCFF00] text-black font-bold px-2 py-0.5 rounded-full text-xs min-w-5 text-center">
              {planList.length}
            </span>
          </Link>

         
          <Link 
            href="/my-plan" 
            className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors"
          >
            <span>Saved</span>
            
            <span className="border border-gray-600 text-white font-semibold px-2 py-0.5 rounded-full text-xs min-w-5 text-center">
              {savedList.length}
            </span>
          </Link>
        </div>

      </div>
    </header>
  );
};

export default Navbar;