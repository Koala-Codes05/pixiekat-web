/**
 * Hero section component for the homepage.
 * Features:
 * - Large welcome message
 * - Call-to-action buttons
 * - Responsive design
 * - Uses DaisyUI hero component classes
 */

import React from 'react';
import Link from 'next/link';

const HeroSection = () => {
  return (
    <div className="hero min-h-[70vh] bg-color-#10061E">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Welcome to PixieKat Store</h1>
          <p className="py-6">
            Discover amazing games and digital content. Join our gaming community today!
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/products">
              <button className="btn btn-primary">Browse Games</button>
            </Link>
            <Link href="/sign-up">
              <button className="btn btn-outline">Join Now</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection
