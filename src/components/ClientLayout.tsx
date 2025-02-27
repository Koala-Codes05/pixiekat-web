"use client";

import { useState, useEffect, useRef } from "react";
import { Navbar, Footer, Loading } from "@/components/index";
import gsap from "gsap";

export default function ClientLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  const [loading, setLoading] = useState(true);
  const heroRef = useRef(null);
  const heroContainerRef = useRef(null);

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
    <>
      {/* Always render the main content, but hide it when loading */}
      <div 
        ref={heroContainerRef} 
        className={`${loading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
      >
        <Navbar />
        <main ref={heroRef}>
          {children}
        </main>
        <Footer />
      </div>

      {/* Loading overlay */}
      {loading && (
        <Loading 
          onComplete={handleLoadingComplete} 
          heroRef={heroRef} 
          heroContainerRef={heroContainerRef}
        />
      )}
    </>
  );
}
