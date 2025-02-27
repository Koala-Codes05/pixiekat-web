"use client";

import Link from 'next/link';
import React, { useState, useEffect } from 'react';

const Navbar = () => {
  // This is like a light switch - it remembers if we've scrolled or not
  const [isScrolled, setIsScrolled] = useState(false);

  // This is our scroll detector - it watches how far we've scrolled down the page
  useEffect(() => {
    const handleScroll = () => {
      // If we scroll more than 150 pixels down, turn on our "switch"
      if (window.scrollY > 150) {
        setIsScrolled(true);
      } else {
        // If we're at the top, turn off our "switch"
        setIsScrolled(false);
      }
    };

    // Start watching for scrolling
    window.addEventListener('scroll', handleScroll);
    // Clean up when we're done (like picking up your toys when you're finished)
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    // This is our main navbar container
    // It stays at the top of the page (fixed) and changes color when we scroll
    <div 
      className={`
        navbar 
        fixed top-0 
        w-full 
        z-50 
        transition-all duration-300
        px-4 h-16
        ${isScrolled 
          ? 'bg-[#1D232A]/95 backdrop-blur-sm shadow-lg' // Using the dark purple color with 95% opacity
          : 'bg-transparent'} // When at top, be completely transparent
      `}
    >
      {/* Left side - Logo */}
      <div className="flex-none">
        <Link href="/" className="btn btn-ghost text-xl px-4">
          PixieKat Store
        </Link>
      </div>

      {/* Right side - Navigation */}
      <div className="flex-1 justify-end">
        {/* Desktop menu */}
        <ul className="hidden lg:flex menu menu-horizontal items-center gap-2">
          <li><Link href="/about-us" className="px-4 py-2 hover:bg-base-200 rounded-lg">About us</Link></li>
          <li><Link href="/products" className="px-4 py-2 hover:bg-base-200 rounded-lg">Games</Link></li>
          <li>
            <details className="dropdown">
              <summary className="px-4 py-2 hover:bg-base-200 rounded-lg">Events</summary>
              <ul className="p-2 bg-base-200 rounded-lg shadow-lg mt-2 w-48">
                <li><Link href="/events/event1" className="px-4 py-2 hover:bg-base-300 rounded-lg block">Event1</Link></li>
                <li><Link href="/events/event2" className="px-4 py-2 hover:bg-base-300 rounded-lg block">Event2</Link></li>
              </ul>
            </details>
          </li>
          <li><Link href="/blogs" className="px-4 py-2 hover:bg-base-200 rounded-lg">News</Link></li>
          <li><Link href="/contact-us" className="px-4 py-2 hover:bg-base-200 rounded-lg">Contact us</Link></li>
          
          {/* Auth buttons */}
          <div className="flex items-center gap-2 ml-4">
            <Link 
              href="/login" 
              className="btn btn-sm bg-base-200 hover:bg-base-300 min-w-[80px]"
            >
              Login
            </Link>
            <Link 
              href="/sign-up" 
              className="btn btn-sm btn-primary min-w-[80px]"
            >
              Sign up
            </Link>
          </div>
        </ul>

        {/* Mobile menu */}
        <div className="dropdown dropdown-end lg:hidden">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-sm px-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-lg bg-base-200 rounded-box w-52">
            <li><Link href="/about-us" className="py-2">About us</Link></li>
            <li><Link href="/products" className="py-2">Games</Link></li>
            <li>
              <details>
                <summary className="py-2">Events</summary>
                <ul className="p-2 bg-base-300 rounded-lg">
                  <li><Link href="/events/event1">Event1</Link></li>
                  <li><Link href="/events/event2">Event2</Link></li>
                </ul>
              </details>
            </li>
            <li><Link href="/blogs" className="py-2">News</Link></li>
            <li><Link href="/contact-us" className="py-2">Contact us</Link></li>
            <div className="pt-2 space-y-2">
              <Link href="/login" className="btn btn-sm bg-base-300 w-full">Login</Link>
              <Link href="/sign-up" className="btn btn-sm btn-primary w-full">Sign up</Link>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
