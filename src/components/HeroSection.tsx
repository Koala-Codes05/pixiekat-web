/**
 * Hero section component for the homepage.
 * Features:
 * - Large welcome message
 * - Call-to-action buttons
 * - Background image or gradient
 * - Responsive design
 */

import React from 'react';
import Link from 'next/link';

export function HeroSection() {
  return (
    <div className="hero min-h-screen" style={{ 
      backgroundImage: "linear-gradient(rgba(16, 6, 30, 0.8), rgba(16, 6, 30, 0.9))" 
    }}>
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Welcome to PixieKat Store</h1>
          <p className="py-6">
            Discover amazing games and digital content. Join our gaming community today!
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/products" className="btn btn-primary">
              Browse Games
            </Link>
            <Link href="/sign-up" className="btn btn-outline">
              Join Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
