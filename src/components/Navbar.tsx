"use client";

import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/context/AuthContext';
import LogoutButton from './LogoutButton';
import Image from 'next/image';

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const lastScrollY = useRef(0);
  const { user, isLoading } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show/hide navbar based on scroll direction and position
      if (currentScrollY > 250) { // Only apply effects after 250px
        if (currentScrollY < lastScrollY.current) {
          // Scrolling UP
          setIsVisible(true);
          setIsScrolled(true);
        } else {
          // Scrolling DOWN
          setIsVisible(false);
        }
      } else {
        // Reset when near top
        setIsVisible(true);
        setIsScrolled(false);
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
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
        ${isVisible ? 'translate-y-0' : '-translate-y-full'}
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
          
          {/* Auth buttons - conditionally rendered based on auth state */}
          <div className="flex items-center gap-2 ml-4">
            {isLoading ? (
              // Show loading spinner when checking auth state
              <div className="w-[80px] h-10 flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : user ? (
              // User is logged in - show profile and logout buttons
              <>
                <div className="dropdown dropdown-end">
                  <div tabIndex={0} role="button" className="flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-base-200">
                    <div className="avatar">
                      <div className="w-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        {/* Use first letter of name as avatar fallback */}
                        <div className="w-full h-full bg-primary flex items-center justify-center text-white">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                      </div>
                    </div>
                    <span>{user.name}</span>
                  </div>
                  <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow-lg bg-base-200 rounded-box w-52 mt-2">
                    <li><Link href="/profile" className="px-4 py-2">Profile</Link></li>
                    <li><Link href="/dashboard" className="px-4 py-2">Dashboard</Link></li>
                    <li><Link href="/settings" className="px-4 py-2">Settings</Link></li>
                    <li>
                      <LogoutButton className="w-full text-left px-4 py-2 hover:bg-base-300 text-error">
                        Logout
                      </LogoutButton>
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              // User is not logged in - show login and signup buttons
              <>
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
              </>
            )}
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
            
            {/* Mobile auth buttons - conditionally rendered */}
            {isLoading ? (
              // Show loading spinner when checking auth state
              <div className="py-4 flex justify-center">
                <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : user ? (
              // User is logged in
              <>
                <div className="pt-2 border-t border-base-300 mt-2">
                  <div className="flex items-center gap-2 px-4 py-2">
                    <div className="avatar">
                      <div className="w-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        <div className="w-full h-full bg-primary flex items-center justify-center text-white">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                      </div>
                    </div>
                    <span className="font-medium">{user.name}</span>
                  </div>
                  <li><Link href="/profile" className="py-2">Profile</Link></li>
                  <li><Link href="/dashboard" className="py-2">Dashboard</Link></li>
                  <li><Link href="/settings" className="py-2">Settings</Link></li>
                  <li>
                    <LogoutButton className="w-full text-left py-2 text-error">
                      Logout
                    </LogoutButton>
                  </li>
                </div>
              </>
            ) : (
              // User is not logged in
              <div className="pt-2 space-y-2 border-t border-base-300 mt-2">
                <Link href="/login" className="btn btn-sm bg-base-300 w-full">Login</Link>
                <Link href="/sign-up" className="btn btn-sm btn-primary w-full">Sign up</Link>
              </div>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
