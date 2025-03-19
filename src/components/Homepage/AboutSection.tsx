"use client"; // Indicates this is a client-side component in Next.js

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap'; // Animation library
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'; // GSAP plugin for scroll-based animations

gsap.registerPlugin(ScrollTrigger);

// Define the content sections with their respective data
const sections = [
  {
    id: 1,
    heading: "Who We Are",
    description: "PixieKat is your premier destination for gaming excellence...",
    image: "/img/about/gaming-setup-1.jpg" // Image path for first section
  },
  {
    id: 2,
    heading: "Our Mission",
    description: "To revolutionize the gaming marketplace by providing secure, seamless, and exceptional service for gamers worldwide. We strive to create a platform where gaming dreams become reality.",
    image: "/img/about/gaming-setup-2.jpg" // Add image for second section
  },
  {
    id: 3,
    heading: "Our Vision",
    description: "Building the future of gaming commerce, where every transaction is secure, every interaction is meaningful, and every gamer finds their perfect match.",
    image: "/img/about/gaming-setup-3.jpg" // Add image for third section
  }
];

const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const imagesRef = useRef<(HTMLDivElement | null)[]>([]);
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const mobileContainerRef = useRef<HTMLDivElement>(null);
  const [mobileActiveIndex, setMobileActiveIndex] = useState(0);

  // Add mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Your existing desktop animation useEffect...
  useEffect(() => {
    if (isMobile || !sectionRef.current || !triggerRef.current || !videoRef.current) return;
    
    // Your existing desktop GSAP animation code...
  }, [isMobile]);

  // New mobile animation
  useEffect(() => {
    if (!isMobile || !mobileContainerRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: mobileContainerRef.current,
        start: "top top",
        end: "+=300%",
        pin: true,
        scrub: 1,
        onUpdate: (self) => {
          const newIndex = Math.floor(self.progress * 3);
          setMobileActiveIndex(Math.min(2, newIndex));
        }
      }
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [isMobile]);

  return (
    <>
      {isMobile ? (
        // Mobile Layout
        <div ref={mobileContainerRef} className="bg-[#10061E]">
          <div className="text-center py-8">
            <h1 className="text-4xl font-bold animate-gradient-text">
              About Us
            </h1>
          </div>

          <div className="h-[85vh] relative">
            <div className="container mx-auto px-4 h-full">
              <div className="flex flex-col items-center justify-start h-full pt-8">
                <div className="w-full space-y-6">
                  {/* Image */}
                  <div className="relative aspect-[4/3] w-full">
                    {sections.map((section, index) => (
                      <div
                        key={section.id}
                        className="absolute inset-0 rounded-2xl overflow-hidden transition-all duration-700"
                        style={{
                          opacity: index === mobileActiveIndex ? 1 : 0,
                          transform: `scale(${index === mobileActiveIndex ? 1 : 0.9})`,
                        }}
                      >
                        <Image
                          src={section.image}
                          alt={section.heading}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Content */}
                  <div className="text-center">
                    {sections.map((section, index) => (
                      <div
                        key={section.id}
                        className="transition-all duration-700"
                        style={{
                          opacity: index === mobileActiveIndex ? 1 : 0,
                          transform: `translateY(${(index - mobileActiveIndex) * 20}px)`,
                          position: index === mobileActiveIndex ? 'relative' : 'absolute',
                        }}
                      >
                        <h2 className="text-2xl font-bold text-white mb-3">
                          {section.heading}
                        </h2>
                        <p className="text-gray-300 text-base">
                          {section.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Progress Dots */}
            <div className="absolute bottom-12 left-0 right-0 flex justify-center gap-4">
              {sections.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === mobileActiveIndex ? 'bg-white w-4' : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        // Keep your existing desktop layout
        <div ref={triggerRef} className="relative">
          {/* Static header section with gradient text */}
          <div className="text-center py-16 bg-[#10061E]">
            <h1 className="text-6xl font-bold mb-6 animate-gradient-text inline-block">
              About Us
            </h1>
            <p className="text-gray-300 text-xl max-w-3xl mx-auto px-4">
              Welcome to PixieKat...
            </p>
          </div>

          {/* Main scrolling section with images and text */}
          <div ref={sectionRef} className="h-screen flex items-center bg-[#10061E] overflow-hidden">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Left side with layered images and video */}
                <div className="relative aspect-[3/4] w-full">
                  {/* Blur shadow effect */}
                  <div className="absolute -inset-10 z-10">
                    <Image
                      src="/img/hero/BlurShadow.svg"
                      alt=""
                      width={903}
                      height={903}
                      className="w-full h-full object-contain opacity-50"
                    />
                  </div>

                  {/* Background video layer */}
                  <div className="absolute inset-0 z-20 rounded-2xl overflow-hidden">
                    <video
                      ref={videoRef}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full h-full object-cover"
                      style={{ opacity: 0.8 }}
                    >
                      <source src="/video/about-video.mp4" type="video/mp4" />
                    </video>
                  </div>

                  {/* Multiple image layers that change with scroll */}
                  {sections.map((section, index) => (
                    <div
                      key={section.id}
                      ref={el => { imagesRef.current[index] = el }}
                      className="absolute inset-0 z-30 rounded-2xl overflow-hidden shadow-2xl"
                      style={{
                        opacity: index === 0 ? 1 : 0,
                        clipPath: index === 0 
                          ? 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'
                          : 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)'
                      }}
                    >
                      <Image
                        src={section.image}
                        alt={section.heading}
                        fill
                        className="object-cover transition-transform duration-200"
                        style={{ opacity: 0.4 }}
                      />
                    </div>
                  ))}
                </div>

                {/* Right side with animated text sections and progress bar */}
                <div className="relative flex gap-8">
                  {/* Text sections */}
                  <div className="space-y-24 flex-1">
                    {sections.map((section, index) => (
                      <div
                        key={section.id}
                        className="text-section transition-all duration-200"
                        style={{ opacity: index === 0 ? 1 : 0.3 }}
                      >
                        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                          {section.heading}
                        </h2>
                        <p className="text-lg leading-relaxed text-gray-200">
                          {section.description}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Progress bar */}
                  <div className="hidden lg:flex flex-col items-center h-[300px] pr-4">
                    {/* Progress sections container */}
                    <div className="relative h-full flex flex-col gap-8">
                      {/* Three sections */}
                      {sections.map((_, index) => (
                        <div 
                          key={index} 
                          className="relative flex-1"
                        >
                          {/* Background line */}
                          <div className="absolute inset-0 w-[2px] bg-gray-600/30" />
                          
                          {/* White fill line */}
                          <div 
                            className="absolute top-0 w-[2px] bg-white transition-all duration-300"
                            style={{
                              height: index === Math.min(2, Math.floor(progress * 3)) 
                                ? index === 2  // If it's the last section
                                  ? progress >= 0.67 ? '100%' : `${((progress * 3) % 1) * 100}%` // Stay filled if progress > 67%
                                  : `${((progress * 3) % 1) * 100}%`
                                : index < Math.min(2, Math.floor(progress * 3))
                                  ? '100%'
                                  : '0%'
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AboutSection;



