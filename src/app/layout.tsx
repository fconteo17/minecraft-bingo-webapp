import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from '@vercel/analytics/next';

export const metadata: Metadata = {
  title: "Minecraft Bingo",
  description: "Track and display Minecraft Bingo game matches",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-gray-900 text-gray-100 min-h-screen`}>
        <nav className="bg-gray-800 shadow-lg border-b border-gray-700">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <Link href="/" className="text-xl font-bold text-gray-100 hover:text-gray-300 transition-colors">
              Minecraft Bingo
            </Link>
          </div>
        </nav>
        {children}
      <SpeedInsights />
      <Analytics />
      </body>
    </html>
  );
}
