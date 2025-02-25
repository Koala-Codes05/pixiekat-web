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
        ${isScrolled 
          ? 'bg-[#1D232A]/95 backdrop-blur-sm shadow-lg' // Using the dark purple color with 95% opacity
          : 'bg-transparent'} // When at top, be completely transparent
      `}
    >
      {/* Left side - Just the logo */}
      <div className="flex-none">
        <Link href="/" className="btn btn-ghost text-xl">
          PixieKat Store
        </Link>
      </div>

      {/* Right side - All our navigation links and buttons */}
      <div className="flex-1 justify-end">
        {/* Desktop menu - Only shows on big screens */}
        <ul className="hidden lg:flex menu menu-horizontal px-1 items-center">
          <li><Link href="/about-us">About us</Link></li>
          <li><Link href="/products">Games</Link></li>
          <li>
            <details>
              <summary>Events</summary>
              <ul className="p-2 bg-background rounded-lg">
                <li><Link href="/events/event1">Event1</Link></li>
                <li><Link href="/events/event2">Event2</Link></li>
              </ul>
            </details>
          </li>
          <li><Link href="/blogs">Blogs</Link></li>
          <li><Link href="/contact-us">Contact us</Link></li>
          
          {/* Auth buttons with nice backgrounds */}
          <li className="ml-4">
            <Link 
              href="/login" 
              className="btn btn-sm bg-base-200 hover:bg-base-300"
            >
              Login
            </Link>
          </li>
          <li>
            <Link 
              href="/sign-up" 
              className="btn btn-sm btn-primary"
            >
              Sign up
            </Link>
          </li>
        </ul>

        {/* Mobile menu - Only shows on small screens */}
        <div className="dropdown dropdown-end lg:hidden">
          {/* Hamburger button */}
          <div tabIndex={0} role="button" className="btn btn-ghost btn-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
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
          {/* Mobile menu items */}
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-200 rounded-box w-52">
            <li><Link href="/about-us">About us</Link></li>
            <li><Link href="/products">Games</Link></li>
            <li>
              <span>Events</span>
              <ul className="p-1">
                <li><Link href="/events/event1">Event1</Link></li>
                <li><Link href="/events/event2">Event2</Link></li>
              </ul>
            </li>
            <li><Link href="/blogs">Blogs</Link></li>
            <li><Link href="/contact-us">Contact us</Link></li>
            <li className="mt-2"><Link href="/login" className="btn btn-sm bg-base-300 w-full">Login</Link></li>
            <li className="mt-2"><Link href="/sign-up" className="btn btn-sm btn-primary w-full">Sign up</Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
