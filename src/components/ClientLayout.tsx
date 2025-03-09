"use client";

import { useState, useEffect, useRef } from "react";
import { Navbar, Footer, Loading } from "@/components/index";
import { Providers } from "@/app/providers";
import gsap from "gsap";

export default function ClientLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  const [loading, setLoading] = useState(true);
  const heroRef = useRef<HTMLElement>(null);
  const heroContainerRef = useRef<HTMLDivElement>(null);

  // Prevent scrolling when loading
  useEffect(() => {
    if (loading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      // Ensure we reset any inline styles
      document.body.style.width = '';
      document.body.style.height = '';
      document.documentElement.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.width = '';
      document.body.style.height = '';
      document.documentElement.style.overflow = '';
    };
  }, [loading]);

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Providers>
        <Navbar />
        <main className="relative overflow-x-hidden">
          {children}
        </main>
        <Footer />
      </Providers>
    </div>
  );
}
