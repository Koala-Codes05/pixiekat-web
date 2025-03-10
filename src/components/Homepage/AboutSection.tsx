"use client"; // Indicates this is a client-side component in Next.js

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap'; // Animation library
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'; // GSAP plugin for scroll-based animations

// Register ScrollTrigger plugin with GSAP
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
  // Refs to access DOM elements for animations
  const sectionRef = useRef<HTMLDivElement>(null); // Main section container
  const triggerRef = useRef<HTMLDivElement>(null); // Scroll trigger element
  const videoRef = useRef<HTMLVideoElement>(null); // Background video element
  const imagesRef = useRef<(HTMLDivElement | null)[]>([]); // Array of image containers
  const [progress, setProgress] = useState(0); // State to track scroll progress

  useEffect(() => {
    // Get references to DOM elements
    const section = sectionRef.current;
    const trigger = triggerRef.current;
    const video = videoRef.current;

    if (!section || !trigger || !video) return;

    // Create GSAP timeline with ScrollTrigger
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: trigger, // Element that triggers the animation
        start: "top+=30% top", // Animation starts when trigger is 30% from top
        end: "+=300%", // Animation ends after scrolling 300% of trigger height
        pin: section, // Pins the section while scrolling
        scrub: 0.5, // Smooth animation with 0.5s delay
        anticipatePin: 1, // Prevents page jump when pinning
        onUpdate: (self) => {
          // Calculate current section based on scroll progress
          const progress = self.progress; // Get scroll progress
          const sectionIndex = Math.min(2, Math.floor(progress * 3));
          setProgress(progress); // Update state with scroll progress

          // Animate text sections
          const textSections = section.querySelectorAll('.text-section');
          textSections.forEach((textSection, index) => {
            gsap.to(textSection, {
              opacity: index === sectionIndex ? 1 : 0.3, // Active section is fully visible
              scale: index === sectionIndex ? 1 : 0.95, // Active section is full size
              duration: 0.2,
              ease: "power1.out"
            });
          });

          // Animate images
          imagesRef.current.forEach((imageDiv, index) => {
            if (imageDiv) {
              if (index === sectionIndex) {
                // Animation for entering image
                gsap.to(imageDiv, {
                  opacity: 1,
                  scale: 1,
                  filter: 'blur(0px)',
                  clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', // Reveal animation
                  duration: 0.5,
                  ease: "power2.out",
                });
                
                // Parallax effect for active image
                gsap.to(imageDiv, {
                  y: `${(progress % (1/3)) * 100}px`, // Smooth vertical movement
                  duration: 0.5,
                  ease: "none"
                });
              } else {
                // Animation for exiting image
                gsap.to(imageDiv, {
                  opacity: 0,
                  scale: 1.1,
                  filter: 'blur(10px)',
                  // Clip path animation based on scroll direction
                  clipPath: index < sectionIndex 
                    ? 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)'
                    : 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
                  duration: 0.5,
                  ease: "power2.in"
                });
              }
            }
          });

          // Animate background video
          gsap.to(video, {
            opacity: 0.8 + (progress * 0.2), // Increase opacity as user scrolls
            scale: 1 + progress * 0.05, // Slight zoom effect
            duration: 0.2,
            ease: "none"
          });
        }
      }
    });

    // Cleanup function to remove animations when component unmounts
    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
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
  );
};

export default AboutSection;
