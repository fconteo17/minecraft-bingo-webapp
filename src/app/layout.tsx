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
      <body className={`${inter.className} bg-gray-900 text-gray-100 min-h-screen`}>
        <div className="min-h-screen bg-gray-900 text-gray-100">
          <header className="bg-gray-800 border-b border-gray-700">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
              <h1 className="text-xl font-bold">
                <Link href="/" className="hover:text-blue-400">
                  Minecraft Bingo
                </Link>
              </h1>
              <nav>
                <ul className="flex space-x-4">
                  <li>
                    <Link href="/rankings" className="hover:text-blue-400">
                      Rankings
                    </Link>
                  </li>
                  <li>
                    <Link href="/api-docs" className="hover:text-blue-400">
                      API Docs
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </header>
          {children}
        </div>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
