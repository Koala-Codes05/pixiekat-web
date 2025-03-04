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
      document.body.style.height = '100vh';
      document.body.style.width = '100vw';
    } else {
      document.body.style.overflow = '';
      document.body.style.height = '';
      document.body.style.width = '';
    }
  }, [loading]);

  // Failsafe: If loading gets stuck, force complete after 6 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 6000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleLoadingComplete = () => {
    setLoading(false);
  };

  return (
    <Providers>
      {loading && (
        <Loading 
          onComplete={handleLoadingComplete} 
          heroRef={heroRef as React.RefObject<HTMLElement>} 
          heroContainerRef={heroContainerRef as React.RefObject<HTMLDivElement>}
        />
      )}
      
      <div 
        ref={heroContainerRef} 
        className={`${loading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        style={{ 
          visibility: loading ? 'hidden' : 'visible',
          position: 'relative'
        }}
      >
        <Navbar />
        <main ref={heroRef}>
          {children}
        </main>
        <Footer />
      </div>
    </Providers>
  );
}
