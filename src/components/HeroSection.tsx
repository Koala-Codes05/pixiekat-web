"use client";

import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { HiArrowRight } from 'react-icons/hi';

export default function HeroSection() {
  const [isMobile, setIsMobile] = useState(false);
  const { scrollY } = useScroll();
  
  const backgroundY = useTransform(scrollY, [0, 500], [0, 200]);
  const textY = useTransform(scrollY, [0, 500], [0, -50]);
  const fadeOut = useTransform(scrollY, [0, 200], [1, 0]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section className="relative h-[85vh] md:h-screen flex items-center justify-center px-4 overflow-hidden">
      {/* Black rectangle with blue button on top */}
      <div className="absolute top-[10vw] right-[5%] z-30 group">
        {/* Black rectangle */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-[15vw] h-[4vw] bg-black/100 backdrop-blur-sm shadow-lg relative"
        > 
          {/* Arrow */}
          <div className="absolute top-1/2 right-6 -translate-y-1/2">
            <HiArrowRight className="text-white text-xl transform transition-transform duration-300 group-hover:translate-x-2" />
          </div>
        </motion.div>
        {/* Blue button */}
        <motion.div
          className="absolute top-1.5 left-[5%] w-[9vw] h-[3vw] bg-blue-500 rounded-full shadow-lg grid place-items-center text-white hover:bg-white hover:text-black transition-colors duration-300"
        >
          Get Started
        </motion.div>
      </div>

      {/* Background with abstract lines */}
      <div className="absolute inset-0 bg-[#10061E]">
        {/* Abstract Lines Container */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute -rotate-45 w-[1px] h-[120%] bg-gradient-to-b from-transparent via-white to-transparent left-[15%] transform -translate-y-1/4" />
          <div className="absolute -rotate-45 w-[1px] h-[120%] bg-gradient-to-b from-transparent via-white to-transparent left-[45%] transform -translate-y-1/2" />
          <div className="absolute -rotate-45 w-[1px] h-[120%] bg-gradient-to-b from-transparent via-white to-transparent left-[75%] transform -translate-y-1/3" />
          
          {/* Thinner intersecting lines */}
          <div className="absolute rotate-45 w-[0.5px] h-[100%] bg-gradient-to-b from-transparent via-white to-transparent left-[30%]" />
          <div className="absolute rotate-45 w-[0.5px] h-[100%] bg-gradient-to-b from-transparent via-white to-transparent left-[60%]" />
          <div className="absolute rotate-45 w-[0.5px] h-[100%] bg-gradient-to-b from-transparent via-white to-transparent left-[90%]" />
        </div>
      </div>

      {/* PIXIEKAT Text (behind everything) */}
      <motion.div 
        style={{ y: textY, opacity: fadeOut }}
        className="absolute z-[1] w-full text-center"
      >
        <h1 
          className="text-[20vw] md:text-[20vw] lg:text-[20vw] font-bold transition-all duration-300"
          style={{
            WebkitTextStroke: isMobile ? '1px white' : '2px white',
            color: 'transparent',
            letterSpacing: '0.05em',
            lineHeight: '1',
          }}
        >
          PIXIEKAT
        </h1>
      </motion.div>

      {/* Valorant Logo */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="absolute top-10 left-5 z-30"
      >
        <Image
          src="/img/hero/Valorant-Logo.webp"
          alt="Valorant Logo"
          width={160}
          height={80}
          priority
          className="w-20 md:w-28 lg:w-32 h-auto"
        />
      </motion.div>

      {/* BlurShadow behind Faze Image */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute z-[2] w-full max-w-[120vw] h-auto flex items-center justify-center"
      >
        <Image
          src="/img/hero/BlurShadow.svg"
          alt=""
          width={903}
          height={903}
          priority
          className="w-[120%] h-auto object-contain opacity-100"
        />
      </motion.div>

      {/* Faze Image Container (Ground) */}
      <div className="absolute z-[3] w-full h-full flex items-center justify-center scale-[0.65] sm:scale-[0.7] md:scale-[0.75] lg:scale-[0.8] xl:scale-[0.85] 2xl:scale-[0.9]">
        {/* Faze Image (Cardbox) */}
        <motion.div
          style={{ y: backgroundY }}
          className="relative w-full h-full flex items-center justify-center mt-16 md:mt-20"
        >
          <Image
            src="/img/hero/Faze.png"
            alt="Faze"
            width={1920}
            height={1080}
            priority
            className="w-full h-full object-contain box-border"
            style={{
              maxWidth: '100%',
              maxHeight: '100%'
            }}
          />
        </motion.div>
      </div>

      {/* Gradient overlay */}
      <motion.div 
        className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#10061E] via-[#10061E]/80 to-transparent z-[4]"
        style={{ opacity: fadeOut }}
      />

      {/* Buttons Container */}
      <div className="absolute bottom-[25%] w-full px-6 md:px-10 z-30 flex justify-start items-center">
        {/* Left Button - Valorant */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="ml-[10%] scale-75 sm:scale-90 md:scale-100"
        >
          <Link 
            href="/products/valorant" 
            className="bg-[#FF4654] text-white px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-lg font-medium text-sm sm:text-base md:text-lg"
          >
            Valorant
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
