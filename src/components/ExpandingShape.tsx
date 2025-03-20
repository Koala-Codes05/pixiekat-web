"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import gsap from 'gsap';

interface ExpandingShapeProps {
  className?: string;
  children?: React.ReactNode;
  expandedScale?: number;
  color?: string;
  disabled?: boolean;
}

const ExpandingShape: React.FC<ExpandingShapeProps> = ({
  className = '',
  children,
  expandedScale = 1.5,
  color = '#ffffff',
  disabled = false
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const rippleRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Disable animations if user prefers reduced motion
  if (prefersReducedMotion || disabled) {
    return (
      <div className={className}>
        <div className="relative z-10">{children}</div>
      </div>
    );
  }

  const handleHoverStart = () => {
    try {
      setIsExpanded(true);
      if (rippleRef.current) {
        gsap.killTweensOf('.ripple');
        gsap.to('.ripple', {
          scale: 1.2,
          opacity: 0,
          duration: 0.8,
          ease: 'power2.out',
          stagger: 0.1,
          overwrite: true,
        });
      }
    } catch (error) {
      console.error('Animation error:', error);
      // Fallback to basic state
      setIsExpanded(true);
    }
  };

  const handleHoverEnd = () => {
    setIsExpanded(false);
    try {
      if (rippleRef.current) {
        gsap.killTweensOf('.ripple');
      }
    } catch (error) {
      console.error('Error cleaning up animations:', error);
    }
  };

  return (
    <motion.div
      className={`relative hoverable ${className}`}
      animate={{
        scale: isExpanded ? expandedScale : 1,
      }}
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 20,
      }}
    >
      <div ref={rippleRef} className="absolute inset-0 pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="ripple absolute inset-0 rounded-full"
            style={{
              border: `2px solid ${color}`,
              opacity: 0,
              transform: 'scale(0.8)',
            }}
          />
        ))}
      </div>
      
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};

export default ExpandingShape;
