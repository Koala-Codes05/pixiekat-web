/**
 * Footer component that appears at the bottom of every page.
 * Contains:
 * - Navigation links organized in categories
 * - Social media links
 * - Legal information
 * - Uses DaisyUI footer classes for styling
 */

import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="footer p-10 bg-base-200 text-base-content">
      {/* Store Links Section */}
      <div>
        <span className="footer-title">Store</span>
        <Link href="/products" className="link link-hover">Games</Link>
        <Link href="/blogs" className="link link-hover">Blog</Link>
        <Link href="/about-us" className="link link-hover">About us</Link>
        <Link href="/contact-us" className="link link-hover">Contact</Link>
      </div>

      {/* Legal Links Section */}
      <div>
        <span className="footer-title">Legal</span>
        <Link href="/terms" className="link link-hover">Terms of use</Link>
        <Link href="/privacy" className="link link-hover">Privacy policy</Link>
        <Link href="/cookie" className="link link-hover">Cookie policy</Link>
      </div>

      {/* Social Media Links */}
      <div>
        <span className="footer-title">Social</span>
        <div className="grid grid-flow-col gap-4">
          {/* ... social media icons ... */}
        </div>
      </div>
    </footer>
  );
};

export default Footer
