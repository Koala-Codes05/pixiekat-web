"use client";

import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { HiArrowRight } from 'react-icons/hi';
import { useAuth } from '@/context/AuthContext';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, EffectCoverflow, Keyboard, Mousewheel, Navigation, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Game slides data
const gameSlides = [
  {
    id: 1,
    title: "Valorant",
    description: "A 5v5 character-based tactical shooter where precise gunplay meets unique agent abilities.",
    image: "/img/games/valorant-bg.jpg",
    link: "/games/valorant"
  },
  {
    id: 2,
    title: "CS2",
    description: "The next evolution of Counter-Strike, featuring revolutionary graphics and upgraded gameplay mechanics.",
    image: "/img/games/cs2-bg.jpg",
    link: "/games/cs2"
  },
  {
    id: 3,
    title: "League of Legends",
    description: "A fast-paced, competitive online game that blends the speed and intensity of an RTS with RPG elements.",
    image: "/img/games/lol-bg.jpg",
    link: "/games/lol"
  },
  {
    id: 4,
    title: "Dota 2",
    description: "A deeply complex, team-based strategy game with endless possibilities for hero combinations.",
    image: "/img/games/dota2-bg.jpg",
    link: "/games/dota2"
  },
  {
    id: 5,
    title: "Overwatch 2",
    description: "Team-based action game set in an optimistic future, where every match is an intense multiplayer showdown.",
    image: "/img/games/overwatch2-bg.jpg",
    link: "/games/overwatch2"
  }
];

export default function HeroSection() {
  const { user, isLoading } = useAuth();
  const [isMobile, setIsMobile] = useState(false);
  const { scrollY } = useScroll();
  
  // Enhanced parallax effect
  const backgroundY = useTransform(
    scrollY,
    [0, 650],
    [0, isMobile ? 50 : 200]
  );

  const fadeOut = useTransform(
    scrollY,
    [0, 300],
    [1, 0]
  );

  // Even longer fade for SVG (increased by 200px)
  const fadeOutSlow = useTransform(
    scrollY,
    [0, 550], // Increased from 400 to 550
    [1, 0]
  );

  // Hero slides data
  const heroSlides = [
    {
      image: "/img/hero/Faze.png",
      title: "PIXIEKAT",
      subtitle: "Gaming Store",
      buttonText: "Valorant",
      buttonLink: "/products/valorant"
    },
    // Add more slides as needed
  ];

  useEffect(() => {
    // Improved mobile detection
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Prevent horizontal scroll
    document.body.style.overflowX = 'hidden';
    document.documentElement.style.overflowX = 'hidden';
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Dynamic button config based on auth state
  const getButtonConfig = () => {
    if (isLoading) {
      return {
        text: "Loading...",
        href: "#",
        disabled: true
      };
    }
    return user ? {
      text: "Dashboard",
      href: "/dashboard",
      disabled: false
    } : {
      text: "Get Started",
      href: "/login",
      disabled: false
    };
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative w-screen h-screen overflow-hidden">
        {/* Background with abstract lines - lower z-index */}
        <div className="absolute inset-0 bg-[#10061E] z-[1]">
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

        {/* Swiper Component - adjusted for better scaling */}
        <Swiper
          modules={[Autoplay, EffectFade, Navigation, Pagination]}
          effect="fade"
          speed={1000}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation
          loop
          className="w-full h-full absolute inset-0 z-[2]"
        >
          {heroSlides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-full">
                {/* PIXIEKAT Text - adjusted for better scaling */}
                <motion.div 
                  style={{ opacity: fadeOut }}
                  className="absolute z-[2] w-full text-center top-[40%] transform -translate-y-1/2"
                >
                  <h1 
                    className="text-[15vw] md:text-[12vw] lg:text-[10vw] font-bold transition-all duration-300"
                    style={{
                      WebkitTextStroke: isMobile ? '1px white' : '2px white',
                      color: 'transparent',
                      letterSpacing: '0.05em',
                      lineHeight: '1',
                    }}
                  >
                    {slide.title}
                  </h1>
                </motion.div>

                {/* Main Image with parallax - adjusted container */}
                <motion.div
                  style={{ y: backgroundY }}
                  className="relative w-full h-full flex items-center justify-center 
                           mt-16 md:mt-20 z-[3] max-w-[1920px] mx-auto"
                >
                  {/* BlurShadow - with slower fade effect */}
                  <motion.div 
                    style={{ opacity: fadeOutSlow }}
                    className="absolute z-[4] w-full max-w-[100vw] h-auto 
                             flex items-center justify-center overflow-visible"
                  >
                    <Image
                      src="/img/hero/BlurShadow.svg"
                      alt=""
                      width={903}
                      height={903}
                      priority
                      className="w-full md:w-[120%] h-auto object-contain opacity-100"
                      style={{ pointerEvents: 'none' }}
                    />
                  </motion.div>

                  {/* Main hero image - adjusted sizing */}
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    width={1920}
                    height={1080}
                    priority
                    className="w-full h-full object-contain box-border z-[5]"
                    style={{
                      maxWidth: '100%',
                      maxHeight: '90vh',
                      pointerEvents: 'none'
                    }}
                  />
                </motion.div>

                {/* Layered Buttons */}
                <div className="absolute top-[10vw] right-[5%] z-[6] group 
                              flex flex-col items-end scale-75 md:scale-100">
                  {/* Black Base Layer */}
                  <motion.div
                    className="w-[90px] sm:w-[200px] md:w-[220px] lg:w-[240px] 
                               h-[24px] sm:h-[52px] md:h-[56px] lg:h-[60px] 
                               bg-black/100 backdrop-blur-sm shadow-lg relative"
                  >
                    <div className="absolute inset-0 flex items-center justify-end pr-3 sm:pr-6">
                      <motion.div>
                        <HiArrowRight className="text-white text-[8px] sm:text-[18px] md:text-[20px] lg:text-[24px] 
                                                  transform transition-transform duration-300 group-hover:translate-x-2" />
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* Blue Interactive Button */}
                  <Link 
                    href={getButtonConfig().href}
                    className={getButtonConfig().disabled ? 'pointer-events-none' : ''}
                  >
                    <motion.div
                      className={`
                        absolute top-[2px] sm:top-[6px] md:top-[8px] lg:top-[10px]
                        left-[2px] sm:left-[6px] md:left-[8px] lg:left-[10px]
                        w-[60px] sm:w-[140px] md:w-[160px] lg:w-[180px]
                        h-[20px] sm:h-[42px] md:h-[44px] lg:h-[46px]
                        bg-blue-500 rounded-full shadow-lg 
                        grid place-items-center text-white 
                        transition-all duration-300 cursor-pointer
                        ${getButtonConfig().disabled 
                          ? 'opacity-70' 
                          : 'hover:bg-white hover:text-black'
                        }
                      `}
                    >
                      <span className="text-[7px] sm:text-[15px] md:text-[16px] lg:text-[18px] whitespace-nowrap">
                        {getButtonConfig().text}
                      </span>
                    </motion.div>
                  </Link>
                </div>

                {/* Bottom Button - removed initial animation */}
                <Link href="/products/valorant">
                  <motion.div 
                    className="absolute top-[55%] left-[10vw] z-[6]"
                  >
                    <button className="valorant-btn">
                      <span>Valorant</span>
                    </button>
                  </motion.div>
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>



        {/* Valorant Logo - removed initial animation */}
        <motion.div 
          className="absolute top-10 left-5 z-[6]"
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

        {/* Gradient overlay - highest z-index */}
        <motion.div 
          className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#10061E] via-[#10061E]/80 to-transparent z-[7]"
          style={{ opacity: fadeOut }}
        />
      </section>

      {/* Game Carousel section */}
      <section 
        className="relative w-[90%] md:w-[80%] lg:w-[70%] mx-auto 
                   -mt-[5vw] md:-mt-[15vw]
                   z-[8]"
        style={{ background: 'transparent' }}  // Explicitly set transparent background
      >
        <Swiper
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          initialSlide={2}
          loop={true}
          slidesPerView={'auto'}
          coverflowEffect={{
            rotate: 35,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: false
          }}
          keyboard={{
            enabled: true
          }}
          noSwiping={false}
          allowTouchMove={true}
          preventInteractionOnTransition={false}
          pagination={{
            clickable: true
          }}
          modules={[EffectCoverflow, Keyboard, Pagination]}
          className="w-full !overflow-visible !touch-pan-y pointer-events-auto"
        >
          {gameSlides.map((slide) => (
            <SwiperSlide 
              key={slide.id}
              className="!w-[280px] !h-[400px] flex flex-col justify-center items-center transition-all duration-500 touch-pan-y"
            >
              {({ isActive }) => (
                <div 
                  className={`relative w-full h-full rounded-xl overflow-hidden shadow-lg transition-all duration-500
                    ${isActive ? 'transform rotate-0 scale-105 !perspective-none' : 'perspective-1000'}`}
                  style={{
                    transform: isActive ? 'rotate(0deg) translateZ(0)' : undefined
                  }}
                >
                  {/* Background Image with Gradient Overlay */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                      backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.2)),
                        url(${slide.image})`,
                      backgroundPosition: 'center',
                      backgroundSize: 'cover'
                    }}
                  />
                  
                  {/* Content */}
                  <div className={`absolute bottom-0 left-0 right-0 p-6 
                                bg-gradient-to-t from-black/90 via-black/50 to-transparent
                                ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                    <h2 className="text-white font-roboto text-xl uppercase mb-3">
                      {slide.title}
                    </h2>
                    <p className="text-[#dadada] font-roboto font-light text-sm line-clamp-3">
                      {slide.description}
                    </p>
                    <Link 
                      href={slide.link}
                      className="inline-block mt-4 px-6 py-2 text-sm uppercase 
                               bg-white text-[#717171] rounded-full hover:text-[#005baa] 
                               transition-colors duration-300"
                    >
                      explore
                    </Link>
                  </div>
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </>
  );
}
