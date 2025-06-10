'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Header: React.FC = () => {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path 
      ? 'bg-white/80 text-indigo-600 border-b-2 border-indigo-500 shadow-sm' 
      : 'text-gray-600 hover:bg-white/50 hover:text-indigo-600';
  };

  return (
    <nav className="bg-white/70 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 font-bold text-xl">
                DEX Analytics
              </span>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link 
                  href="/"
                  className={`${isActive('/')} px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200`}
                >
                  Dashboard
                </Link>
                <Link 
                  href="/pools"
                  className={`${isActive('/pools')} px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200`}
                >
                  Pools
                </Link>
                <Link 
                  href="/tokens"
                  className={`${isActive('/tokens')} px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200`}
                >
                  Tokens
                </Link>
                <Link 
                  href="/analytics"
                  className={`${isActive('/analytics')} px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200`}
                >
                  Analytics
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
