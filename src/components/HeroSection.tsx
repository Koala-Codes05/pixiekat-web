"use client";

import React from 'react';
import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <section className="relative h-[85vh] flex items-center justify-center px-4 overflow-hidden z-0">
      {/* Solid background color */}
      <div className="absolute inset-0 bg-[#10061E] z-0" />
      
      {/* Outlined PIXIEKAT Text */}
      <div className="absolute z-10 w-full text-center">
        <h1 
          className="text-[280px] font-bold"
          style={{
            WebkitTextStroke: '2px white',
            color: 'transparent',
            letterSpacing: '0.05em'
          }}
        >
          PIXIEKAT
        </h1>
      </div>
      
      {/* Valorant Logo - Top Left */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="absolute top-8 left-8 z-20"
      >
        <img 
          src="/img/hero/Valorant-Logo.webp" 
          alt="Valorant Logo" 
          className="w-32 md:w-40 h-auto z-20"
        />
      </motion.div>

      {/* Faze Image - Center */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="absolute z-20 bottom-[-20%] left-0 right-0 mx-auto flex items-center justify-center"
      >
        <img 
          src="/img/hero/Faze.png" 
          alt="Faze" 
          className="max-h-[80vh] w-auto object-contain opacity-100 z-20"
        />
      </motion.div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#10061E] to-transparent z-10" />
    </section>
  );
}
