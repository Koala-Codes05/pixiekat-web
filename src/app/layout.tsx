/**
 * Root layout component that wraps all pages in the application.
 * Handles the basic HTML structure, font loading, and common layout elements.
 * Includes:
 * - Geist font configuration for both sans and mono variants
 * - Global metadata for SEO
 * - Common layout elements (Navbar and Footer)
 */

import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import "./globals.css";

import { Navbar, Footer } from "@/components/export";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <Navbar />
        <div className="pt-16"> {/* Added padding-top */}
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
