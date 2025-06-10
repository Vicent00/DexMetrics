'use client';

import Link from 'next/link';
import Header from '@/components/Header';
import { useEffect, useState } from 'react';

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center">
          <h1 className={`text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
            <span className="block">Welcome to</span>
            <span className="block text-blue-600 mt-3">GraphDexStreams Analytics</span>
          </h1>
          <p className={`mt-6 max-w-2xl mx-auto text-xl text-gray-500 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
            Your real-time data analysis platform. Visualize, analyze, and make data-driven decisions.
          </p>
          <div className={`mt-10 flex justify-center gap-4 ${isVisible ? 'animate-scale-in' : 'opacity-0'}`} style={{ animationDelay: '0.4s' }}>
            <Link
              href="/register"
              className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10 transition-all duration-300 hover-lift"
            >
              Get Started
            </Link>
            <Link
              href="/login"
              className="px-8 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10 transition-all duration-300 hover-lift"
            >
              Login
            </Link>
          </div>
        </div>

        {/* Feature Section */}
        <div className="mt-24">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <div className={`pt-6 ${isVisible ? 'animate-slide-in-right' : 'opacity-0'}`} style={{ animationDelay: '0.6s' }}>
              <div className="flow-root bg-white rounded-lg px-6 pb-8 shadow-lg hover-lift">
                <div className="-mt-6">
                  <div>
                    <span className="inline-flex items-center justify-center p-3 bg-blue-500 rounded-md shadow-lg">
                      <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" suppressHydrationWarning>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </span>
                  </div>
                  <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Real-Time Analysis</h3>
                  <p className="mt-5 text-base text-gray-500">
                    Visualize your data in real-time with interactive charts and automatic updates.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className={`pt-6 ${isVisible ? 'animate-slide-in-right' : 'opacity-0'}`} style={{ animationDelay: '0.8s' }}>
              <div className="flow-root bg-white rounded-lg px-6 pb-8 shadow-lg hover-lift">
                <div className="-mt-6">
                  <div>
                    <span className="inline-flex items-center justify-center p-3 bg-blue-500 rounded-md shadow-lg">
                      <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" suppressHydrationWarning>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </span>
                  </div>
                  <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Accurate Data</h3>
                  <p className="mt-5 text-base text-gray-500">
                    Our system ensures the accuracy and reliability of your data with automatic validation.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 3 */}
            <div className={`pt-6 ${isVisible ? 'animate-slide-in-right' : 'opacity-0'}`} style={{ animationDelay: '1s' }}>
              <div className="flow-root bg-white rounded-lg px-6 pb-8 shadow-lg hover-lift">
                <div className="-mt-6">
                  <div>
                    <span className="inline-flex items-center justify-center p-3 bg-blue-500 rounded-md shadow-lg">
                      <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" suppressHydrationWarning>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                      </svg>
                    </span>
                  </div>
                  <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Full Customization</h3>
                  <p className="mt-5 text-base text-gray-500">
                    Adapt your dashboard to your specific needs with customizable widgets and metrics.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
