'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Header: React.FC = () => {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white';
  };

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-white font-bold text-xl">DEX Analytics</span>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link 
                  href="/"
                  className={`${isActive('/')} px-3 py-2 rounded-md text-sm font-medium`}
                >
                  Dashboard
                </Link>
                <Link 
                  href="/pools"
                  className={`${isActive('/pools')} px-3 py-2 rounded-md text-sm font-medium`}
                >
                  Pools
                </Link>
                <Link 
                  href="/tokens"
                  className={`${isActive('/tokens')} px-3 py-2 rounded-md text-sm font-medium`}
                >
                  Tokens
                </Link>
                <Link 
                  href="/analytics"
                  className={`${isActive('/analytics')} px-3 py-2 rounded-md text-sm font-medium`}
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
