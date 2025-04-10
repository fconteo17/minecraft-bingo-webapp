import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import './globals.css';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import React from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Minecraft Bingo',
  description: 'Multiplayer Minecraft Bingo game for teams or free-for-all',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-cursor-gray-950 text-cursor-gray-100 min-h-screen`}>
        <div className="min-h-screen flex flex-col">
          <header className="bg-gradient-to-r from-blue-900/80 to-indigo-900/80 border-b border-blue-800/50 backdrop-blur-sm sticky top-0 z-10">
            <div className="container mx-auto px-6 py-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-1">
                  <Link href="/" className="flex items-center space-x-2 group">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded flex items-center justify-center group-hover:from-blue-400 group-hover:to-indigo-400 transition-all duration-300">
                      <span className="text-white font-bold">MB</span>
                    </div>
                    <span className="text-xl font-semibold text-white group-hover:text-blue-300 transition-colors duration-300">Minecraft Bingo</span>
                  </Link>
                </div>
                <div className="flex items-center space-x-4">
                  <Link href="/wiki" className="text-blue-200 hover:text-white transition-colors duration-200 relative group" aria-label="Wiki documentation">
                    Wiki
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-indigo-400 group-hover:w-full transition-all duration-300"></span>
                  </Link>
                  <Link href="/rankings" className="text-blue-200 hover:text-white transition-colors duration-200 relative group" aria-label="Player rankings">
                    Rankings
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-indigo-400 group-hover:w-full transition-all duration-300"></span>
                  </Link>
                  <Link href="/api-docs" className="text-blue-200 hover:text-white transition-colors duration-200 relative group" aria-label="API documentation">
                    API Docs
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-indigo-400 group-hover:w-full transition-all duration-300"></span>
                  </Link>
                  <Link href="/live" className="text-blue-200 hover:text-white transition-colors duration-200 relative group" aria-label="Live games">
                    Live
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-indigo-400 group-hover:w-full transition-all duration-300"></span>
                  </Link>
                  
                  <a href="https://github.com/fconteo17/minecraft-bingo-webapp" 
                     target="_blank"
                     rel="noopener noreferrer"
                     aria-label="View project on GitHub"
                     className="px-4 py-2 rounded-md bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white transition-all duration-300 shadow-md hover:shadow-lg flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16" className="mr-1" aria-hidden="true">
                      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                    </svg>
                    GitHub
                  </a>
                </div>
                <div className="md:hidden flex items-center">
                  {/* Mobile menu button */}
                  <button className="text-blue-200 hover:text-white transition-colors duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </header>
          <main className="flex-grow">
            {children}
          </main>
          <footer className="bg-gradient-to-r from-blue-900/80 to-indigo-900/80 border-t border-blue-800/50 py-8">
            <div className="container mx-auto px-6">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="mb-4 md:mb-0">
                  <p className="text-blue-200 text-sm">
                    &copy; {new Date().getFullYear()} Minecraft Bingo. All rights reserved.
                  </p>
                </div>
                <div className="flex space-x-6">
                  <Link href="/" className="text-blue-200 hover:text-white transition-colors duration-200 relative group">
                    Home
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-indigo-400 group-hover:w-full transition-all duration-300"></span>
                  </Link>
                  <Link href="/rankings" className="text-blue-200 hover:text-white transition-colors duration-200 relative group">
                    Rankings
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-indigo-400 group-hover:w-full transition-all duration-300"></span>
                  </Link>
                  <Link href="/wiki" className="text-blue-200 hover:text-white transition-colors duration-200 relative group">
                    Wiki
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-indigo-400 group-hover:w-full transition-all duration-300"></span>
                  </Link>
                </div>
              </div>
            </div>
          </footer>
        </div>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
