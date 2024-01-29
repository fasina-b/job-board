import Link from 'next/link';
import React, { useState } from 'react';
import { signOut, useSession } from "next-auth/react";


const NavBar: React.FC = () => {
  const [navOpen, setNavOpen] = useState(false);
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <nav className="px-5 sm:pt-5 sm:px-10 md:px-10 md:py-0 lg:px-20 flex items-center justify-between">
      <div>
        <img src="/logo5.png" className="w-48" alt="Logo" width={100} height={100} />
      </div>
      <div>
        <button onClick={() => setNavOpen(true)}>
          <svg className="cursor-pointer text-gray-700 hover:text-gray-900 w-6 md:hidden" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
        <div className={`md:block fixed top-0 inset-x-0 bg-white p-8 m-4 z-30 rounded-lg shadow md:rounded-none md:shadow-none md:p-0 md:m-0 md:relative md:bg-transparent ${navOpen ? '' : 'hidden'}`}>
          <button onClick={() => setNavOpen(false)} className="absolute top-0 right-0 mr-5 mt-5 md:hidden">
            <svg fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 feather feather-x">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
          <div className="flex lg:pb-5 md:pb-5 flex-col items-center justify-center md:block">
            <Link href={"/"} className="transition-all duration-100 ease-in-out pb-1 border-b-2 text-indigo-500 border-transparent hover:border-indigo-300 hover:text-indigo-600 md:mr-8 text-lg md:text-sm font-bold tracking-wide my-4 md:my-0">
            Home
            </Link>
            <Link href={"/pages/explore-jobs"} className="transition-all duration-100 ease-in-out pb-1 border-b-2 text-indigo-500 border-transparent hover:border-indigo-300 hover:text-indigo-600 md:mr-8 text-lg md:text-sm font-bold tracking-wide my-4 md:my-0">
            Explore Jobs
            </Link>
            <Link href={"/pages/post-job"} className="transition-all duration-100 ease-in-out pb-1 border-b-2 text-indigo-500 border-transparent hover:border-indigo-300 hover:text-indigo-600 md:mr-8 text-lg md:text-sm font-bold tracking-wide my-4 md:my-0">
            Post Job
            </Link>
            {!user && (
                <>
                  <Link href={"/sign-in"} className="transition-all duration-100 ease-in-out pb-1 border-b-2 text-indigo-500 border-transparent hover:border-indigo-300 hover:text-indigo-600 md:mr-8 text-lg md:text-sm font-bold tracking-wide my-4 md:my-0">
                    Login
                  </Link>
                  <Link href={"/sign-up"} className="border border-transparent rounded font-semibold tracking-wide text-lg md:text-sm px-5 py-3 md:py-2
                    focus:outline-none focus:shadow-outline bg-btn-orange text-gray-100 hover:bg-btn-orange-hover
                    hover:text-gray-200 transition-all duration-300 ease-in-out my-4 md:my-0 w-full md:w-auto">
                    Sign Up
                  </Link>
                  </>
            )}
            {user && (
                <>
                  <Link href={"/pages/dashboard"} className="transition-all duration-100 ease-in-out pb-1 border-b-2 text-indigo-500 border-transparent hover:border-indigo-300 hover:text-indigo-600 md:mr-8 text-lg md:text-sm font-bold tracking-wide my-4 md:my-0">
                    Dashboard
                  </Link>
                  <a onClick={() => signOut()} className="border border-transparent rounded font-semibold tracking-wide text-lg md:text-sm px-5 py-3 md:py-2
                    focus:outline-none focus:shadow-outline bg-btn-orange text-gray-100 hover:bg-btn-orange-hover
                    hover:text-gray-200 transition-all duration-300 ease-in-out my-4 md:my-0 w-full md:w-auto">
                    Sign Out
                  </a>
                </>
            )}
            
          </div>
        </div>
      </div>
    </nav>



    
  );
};

export default NavBar;
