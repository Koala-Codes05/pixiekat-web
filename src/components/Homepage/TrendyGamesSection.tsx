"use client";

import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Mousewheel } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// Sample data - replace with your actual data
const trendyGames = [
  {
    id: 1,
    title: "Valorant Premium Pack",
    image: "/img/games/valorant-card.jpg",
    minPrice: 29.99,
    maxPrice: 149.99,
    saleTag: "20% OFF",
    link: "/products/valorant-premium"
  },
  {
    id: 2,
    title: "CS2 Ultimate Bundle",
    image: "/img/games/cs2-card.jpg",
    minPrice: 19.99,
    maxPrice: 99.99,
    saleTag: "15% OFF",
    link: "/products/cs2-bundle"
  },
  {
    id: 3,
    title: "League of Legends RP Pack",
    image: "/img/games/lol-card.jpg",
    minPrice: 9.99,
    maxPrice: 199.99,
    saleTag: "25% OFF",
    link: "/products/lol-rp"
  },
  {
    id: 4,
    title: "Dota 2 Battle Pass",
    image: "/img/games/dota2-card.jpg",
    minPrice: 14.99,
    maxPrice: 129.99,
    saleTag: "10% OFF",
    link: "/products/dota-pass"
  },
  {
    id: 5,
    title: "Overwatch 2 Season Pass",
    image: "/img/games/ow2-card.jpg",
    minPrice: 24.99,
    maxPrice: 79.99,
    saleTag: "30% OFF",
    link: "/products/ow2-pass"
  },
  {
    id: 6,
    title: "PUBG Elite Pass",
    image: "/img/games/pubg-card.jpg",
    minPrice: 19.99,
    maxPrice: 89.99,
    saleTag: "40% OFF",
    link: "/products/pubg-elite"
  }
];

const GameCard = ({ game }: { game: typeof trendyGames[0] }) => {
  return (
    <div className="relative w-[280px] h-[380px] rounded-2xl overflow-hidden 
                    bg-gradient-to-b from-gray-800 to-gray-900 shadow-xl
                    transform transition-transform duration-300 hover:scale-105">
      {/* Sale Tag */}
      <div className="absolute top-4 right-4 z-10 bg-red-500 text-white px-3 py-1 rounded-full
                    text-sm font-semibold shadow-lg">
        {game.saleTag}
      </div>

      {/* Image */}
      <div className="relative w-full h-[200px]">
        <Image
          src={game.image}
          alt={game.title}
          fill
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-xl font-bold text-white mb-2">{game.title}</h3>
        <div className="text-gray-300 text-sm mb-4">
          ${game.minPrice} - ${game.maxPrice}
        </div>
        <div className="flex justify-between items-center">
          <Link 
            href={game.link} 
            className="valorant-btn text-sm"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default function TrendyGamesSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  
  const swiperRef = useRef<SwiperType>();

  const handlePrevClick = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };

  const handleNextClick = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  return (
    <section className="py-20 bg-[#10061E] relative overflow-hidden" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto trendy-games-container"
      >
        {/* Section Header */}
        <div className="mb-12 flex justify-between items-start">
          <div className="text-left">
            <h2 className="text-4xl font-bold text-white mb-4">Trendy Games</h2>
            <p className="text-gray-400 max-w-2xl">
              Discover our most popular game packages with exclusive offers and limited-time deals
            </p>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={handlePrevClick}
              className="trendy-nav-btn flex items-center justify-center"
              aria-label="Previous slide"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth={2} 
                stroke="currentColor" 
                className="w-6 h-6 text-white"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
            <button 
              onClick={handleNextClick}
              className="trendy-nav-btn flex items-center justify-center"
              aria-label="Next slide"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth={2} 
                stroke="currentColor" 
                className="w-6 h-6 text-white"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
        </div>

        {/* Swiper Component */}
        <div className="relative overflow-hidden">
          <Swiper
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper;
            }}
            modules={[Navigation, Mousewheel]}
            spaceBetween={24}
            slidesPerView="auto"
            className="trendy-games-swiper"
            centeredSlides={false}
            direction="horizontal"
            mousewheel={{
              forceToAxis: true,
              sensitivity: 3,
              thresholdDelta: 10
            }}
            resistance={false}
            touchRatio={2}
            speed={400}
            breakpoints={{
              320: {
                slidesPerView: 'auto',
                spaceBetween: 16
              },
              768: {
                slidesPerView: 'auto',
                spaceBetween: 24
              }
            }}
          >
            {trendyGames.map((game) => (
              <SwiperSlide 
                key={game.id} 
                className="!w-[280px] !h-[400px] flex flex-col justify-center items-center transition-all duration-500"
              >
                <GameCard game={game} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </motion.div>
    </section>
  );
}
