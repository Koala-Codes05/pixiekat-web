"use client";

import { useState, useEffect } from "react";
import { Navbar, Footer, Loading } from "@/components/index";

export default function ClientLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  const [loading, setLoading] = useState(true);

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
      {loading ? (
        <Loading onComplete={handleLoadingComplete} />
      ) : (
        <>
          <Navbar />
          <div className="pt-16">
            {children}
          </div>
          <Footer />
        </>
      )}
    </>
  );
}
