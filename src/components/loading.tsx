import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { motion, AnimatePresence } from "framer-motion";

const Loading = ({ 
  onComplete, 
  heroRef,
  heroContainerRef
}: { 
  onComplete: () => void,
  heroRef: React.RefObject<HTMLElement>,
  heroContainerRef: React.RefObject<HTMLDivElement>
}) => {
  const counterRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const circleTopRef = useRef<HTMLDivElement>(null);
  const circleBottomRef = useRef<HTMLDivElement>(null);
  const centerImageRef = useRef<HTMLDivElement>(null);
  const pixiekatRef = useRef<HTMLDivElement>(null); // NEW - Pixiekat Text

  const [countComplete, setCountComplete] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);

  // Define the images array
  const images = [
    "/img/loading/1.jpg",  // Eye/face close-up
    "/img/loading/2.jpg",  // Black and white architectural
    "/img/loading/3.jpg",  // Person walking
    "/img/loading/4.jpg",  // Green leaf/glass
    "/img/loading/5.jpg",  // Red abstract
    "/img/loading/6.jpg",  // Blue/teal abstract
    "/img/loading/7.jpg",  // Purple crystals/stones
    "/img/loading/8.jpg",  // Bottle/product shot
    "/img/loading/9.jpg"   // Green abstract
  ];

  useEffect(() => {
    setWindowWidth(window.innerWidth || 1024);
    
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getExitDistance = () => {
    if (windowWidth < 640) return "-50vw"; 
    if (windowWidth < 1024) return "-70vw"; 
    return "-120vw"; 
  };

  useEffect(() => {
    if (heroRef.current && heroContainerRef.current) {
      gsap.set(heroContainerRef.current, { opacity: 0 });
    }
  }, [heroRef, heroContainerRef]);

  useEffect(() => {
    const counter = counterRef.current;
    const background = backgroundRef.current;
    
    if (!counter || !background) return;

    if (galleryRef.current) {
      gsap.set(galleryRef.current, { scale: 0.75 });
    }
    
    if (circleTopRef.current && circleBottomRef.current) {
      gsap.set([circleTopRef.current, circleBottomRef.current], { yPercent: 0 });
    }

    // Counter Animation
    const countTl = gsap.timeline({ delay: 0.1 });
    
    countTl.to(counter, {
      duration: 1.5,
      innerText: 100,
      snap: { innerText: 1 },
      ease: "power2.inOut",
      onUpdate: () => {
        if (counter) {
          const currentValue = counter.innerText || "0";
          counter.innerText = String(parseInt(currentValue)).padStart(3, "0") + "%";
        }
      },
      onComplete: () => {
        setCountComplete(true);

        const timeline = gsap.timeline({
          defaults: { duration: 1.8, ease: "expo.inOut" }
        });

        if (galleryRef.current && circleTopRef.current && circleBottomRef.current) {
          const centerImage = galleryRef.current.children[4];

          timeline
            .to(galleryRef.current, {
              scale: 1,
              duration: 1.5
            })
            .to(centerImage, {
              width: '100vw',
              height: '100vh',
              duration: 1.5
            }, 0)
            .to(circleTopRef.current, {
              yPercent: -100,
              duration: 1.2
            }, 0)
            .to(circleBottomRef.current, {
              yPercent: 100,
              duration: 1.2
            }, 0)
            .to(pixiekatRef.current, { // NEW - Pixiekat Text Scaling
              scale: 10,
              opacity: 0,
              duration: 1.2
            }, "-=1.2") 
            .then(() => {
              if (heroContainerRef.current) {
                gsap.to(heroContainerRef.current, {
                  opacity: 1,
                  duration: 0.5,
                  onComplete: () => {
                    onComplete();
                  }
                });
              } else {
                onComplete();
              }
            });
        } else {
          setTimeout(onComplete, 1000);
        }
      }
    });

    return () => {
      countTl.kill();
    };
  }, [onComplete, heroRef, heroContainerRef]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (backgroundRef.current) {
        onComplete();
      }
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div ref={backgroundRef} className="fixed inset-0 z-50 bg-[#10061E]">
      {/* Gallery Structure */}
      <div className="loader_wrapper">
        {/* Circles positioned first in DOM but with lower z-index */}
        <div ref={circleTopRef} className="loader_circle loader_circle-top" />
        <div ref={circleBottomRef} className="loader_circle loader_circle-bottom" />

        {/* Pixiekat Text - NEW */}
        <div 
          ref={pixiekatRef} 
          className="absolute inset-0 flex items-center justify-center text-yellow-200 text-[50px] md:text-[80px] font-bold pixiekat-text"
          style={{ 
            zIndex: 50,
            textShadow: '0 4px 8px rgba(0, 0, 0, 0.5), 0 8px 24px rgba(0, 0, 0, 0.3)'
          }}
        >
          PIXIEKAT
        </div>

        {/* Gallery with higher z-index */}
        <div ref={galleryRef} className="loader_gallery">
          {images.map((src, index) => (
            <div 
              key={index} 
              className={`loader_gallery_figure ${index === 4 ? 'center-image' : ''}`}
              ref={index === 4 ? centerImageRef : null}
              style={{
                boxShadow: '0 4px 30px rgba(0, 0, 0, 0.4)'
              }}
            >
              <img
                src={src}
                alt=""
                className="loader_gallery_image"
                style={{
                  filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.5))'
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Counter */}
      <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12 z-[100]">
        <AnimatePresence mode="wait">
          {!countComplete ? (
            <motion.div
              key="counter"
              exit={{
                x: getExitDistance(),
                opacity: 0,
                transition: { 
                  duration: 1.2,
                  ease: "easeInOut"
                }
              }}
              className="counter-container"
            >
              <div 
                ref={counterRef}
                className="text-[60px] md:text-[80px] font-black text-white"
                style={{
                  textShadow: "0 0 10px rgba(255,255,255,0.5)",
                  position: "relative",
                  zIndex: 100
                }}
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
