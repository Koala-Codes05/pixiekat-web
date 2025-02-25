import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { motion, AnimatePresence } from "framer-motion";

const Loading = ({ onComplete }: { onComplete: () => void }) => {
  const counterRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const [countComplete, setCountComplete] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  
  // Track window width for responsive animations
  useEffect(() => {
    // Set initial width on mount
    setWindowWidth(window.innerWidth);
    
    // Update width on resize
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Calculate exit distance based on screen size
  const getExitDistance = () => {
    if (windowWidth < 640) return "-60%"; // Mobile screens
    if (windowWidth < 1024) return "-110%"; // Tablet screens
    return "-200%"; // Desktop screens
  };
  
  useEffect(() => {
    const counter = counterRef.current;
    const background = backgroundRef.current;
    
    if (!counter || !background) return;
    
    // Use GSAP for the counting animation
    const countTl = gsap.timeline({ delay: 0.1 });
    
    countTl.to(counter, {
      duration: 2,
      innerText: 100,
      snap: { innerText: 1 },
      ease: "power2.inOut",
      onUpdate: () => {
        if (counter) {
          try {
            const currentValue = counter.innerText || "0";
            counter.innerText = String(parseInt(currentValue)).padStart(3, "0") + "%";
          } catch (error) {
            console.error("Error updating counter:", error);
          }
        }
      },
      onComplete: () => {
        // When counting is done, trigger the slide animation
        setCountComplete(true);
        
        // After the slide animation completes, fade out the background
        setTimeout(() => {
          gsap.to(background, {
            opacity: 0,
            duration: 0.9,
            onComplete: () => {
              // Ensure onComplete is called even if there's an error
              try {
                onComplete();
              } catch (error) {
                console.error("Error in onComplete callback:", error);
              }
            }
          });
        }, 800);
      }
    });
    
    return () => {
      countTl.kill();
    };
  }, [onComplete]);
  
  // Failsafe: If animation gets stuck, complete after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      if (backgroundRef.current) {
        onComplete();
      }
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [onComplete]);
  
  return (
    <div 
      ref={backgroundRef}
      className="fixed inset-0 z-50"
      style={{ backgroundColor: "#FCE802" }}
    >
      <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 lg:bottom-10 right-4 sm:right-6 md:right-8 lg:right-10">
        <AnimatePresence mode="wait">
          {!countComplete ? (
            <motion.div
              key="counter"
              exit={{
                x: getExitDistance(),
                transition: { duration: 0.9, ease: "easeInOut" }
              }}
            >
              <div 
                ref={counterRef} 
                className="text-[60px] sm:text-[80px] md:text-[100px] lg:text-[120px] xl:text-[150px] font-black text-black"
              >
                000%
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0 }}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Loading;
