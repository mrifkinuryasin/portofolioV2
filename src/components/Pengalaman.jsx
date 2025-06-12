import React, { useEffect, useRef, useState } from "react";
import { Briefcase, School, Activity, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import { experienceData } from "../data/data";

// Map icon strings to actual icon components
const iconMap = {
  School: School,
  Activity: Activity,
  Briefcase: Briefcase,
};

const ExperienceCard = ({ icon, title, place, time, description, delay }) => {
  const Icon = iconMap[icon];
  return (
    <motion.div
      className="relative p-4 sm:p-5 bg-gray-900/60 rounded-xl border border-green-600/30 max-w-[300px] sm:max-w-[340px] mx-4 flex-shrink-0 snap-center shadow-[0_4px_12px_rgba(16,185,129,0.2)] cursor-grab active:cursor-grabbing z-10"
      whileHover={{ scale: 1.05, rotateY: 5, boxShadow: "0 8px 20px rgba(16,185,129,0.4)" }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      data-aos="fade-up"
      data-aos-delay={delay}
      tabIndex={0}
      role="group"
      aria-label={`Pengalaman: ${title} di ${place}`}
    >
      <motion.div
        className="absolute -left-6 top-4 bg-gradient-to-r from-green-500 to-teal-400 p-2 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.5)]"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      >
        <Icon className="w-4 h-4 text-gray-900" aria-hidden="true" />
      </motion.div>
      <h4 className="text-lg font-bold text-green-400 mb-1 pl-8">{title}</h4>
      <p className="text-xs font-semibold text-green-300 pl-8">{place}</p>
      <p className="text-xs text-green-400/70 italic mb-2 pl-8">{time}</p>
      <p className="text-xs text-green-400/90 leading-relaxed pl-8">{description}</p>
      <div className="absolute inset-0 bg-green-600/5 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </motion.div>
  );
};

const Pengalaman = () => {
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    AOS.init({ once: false, duration: 600, easing: "ease-in-out" });

    const container = scrollRef.current;
    if (!container) return;

    const updateScrollIndicators = () => {
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(
        container.scrollLeft < container.scrollWidth - container.clientWidth - 1
      );
    };

    const handleMouseDown = (e) => {
      setIsDragging(true);
      setStartX(e.pageX - container.offsetLeft);
      setScrollLeft(container.scrollLeft);
      container.style.cursor = "grabbing";
    };

    const handleMouseMove = (e) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX) * 2; // Scroll speed
      container.scrollLeft = scrollLeft - walk;
      updateScrollIndicators();
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      container.style.cursor = "grab";
      updateScrollIndicators();
    };

    const handleTouchStart = (e) => {
      setIsDragging(true);
      setStartX(e.touches[0].pageX - container.offsetLeft);
      setScrollLeft(container.scrollLeft);
    };

    const handleTouchMove = (e) => {
      if (!isDragging) return;
      const x = e.touches[0].pageX - container.offsetLeft;
      const walk = (x - startX) * 2;
      container.scrollLeft = scrollLeft - walk;
      updateScrollIndicators();
    };

    const handleTouchEnd = () => {
      setIsDragging(false);
      updateScrollIndicators();
    };

    container.addEventListener("mousedown", handleMouseDown);
    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseup", handleMouseUp);
    container.addEventListener("mouseleave", handleMouseUp);
    container.addEventListener("touchstart", handleTouchStart);
    container.addEventListener("touchmove", handleTouchMove);
    container.addEventListener("touchend", handleTouchEnd);
    container.addEventListener("scroll", updateScrollIndicators);

    updateScrollIndicators();

    return () => {
      container.removeEventListener("mousedown", handleMouseDown);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseup", handleMouseUp);
      container.removeEventListener("mouseleave", handleMouseUp);
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
      container.removeEventListener("touchend", handleTouchEnd);
      container.removeEventListener("scroll", updateScrollIndicators);
    };
  }, [isDragging, startX, scrollLeft]);

  const scrollBy = (direction) => {
    const container = scrollRef.current;
    if (!container) return;
    const scrollAmount = container.clientWidth * 0.8;
    container.scrollBy({ left: direction * scrollAmount, behavior: "smooth" });
  };

  return (
    <section
      className="px-4 sm:px-6 lg:px-8 py-16 bg-transparent scroll-mt-24 relative overflow-hidden"
      id="Experience"
    >
      {/* Particle & Radial Gradient Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.15),transparent_70%)] pointer-events-none z-0">
        <div className="particle particle-1"></div>
        <div className="particle particle-2"></div>
        <div className="particle particle-3"></div>
        <div className="particle particle-4"></div>
      </div>

      {/* Header Section */}
      <div className="text-center mb-12 relative z-10">
        <motion.h2
          className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-teal-400 tracking-tight"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          data-aos="zoom-in-up"
        >
          My Experience
        </motion.h2>
        <motion.div
          className="mt-3 mx-auto w-20 h-1 bg-gradient-to-r from-green-500 to-teal-400 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        />
        <motion.p
          className="mt-3 text-green-400/80 text-lg sm:text-xl font-semibold max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          data-aos="zoom-in-up"
          data-aos-delay="200"
        >
          Milestones in my professional journey
        </motion.p>
      </div>

      {/* Carousel Container */}
      <div className="relative max-w-7xl mx-auto">
        {/* Navigation Arrows */}
        <motion.button
          className={`absolute left-0 top-1/2 -translate-y-1/2 bg-gradient-to-r from-green-500 to-teal-400 p-2.5 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)] z-20 ${!canScrollLeft ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'}`}
          onClick={() => scrollBy(-1)}
          disabled={!canScrollLeft}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-5 h-5 text-gray-900" />
        </motion.button>
        <motion.button
          className={`absolute right-0 top-1/2 -translate-y-1/2 bg-gradient-to-r from-green-500 to-teal-400 p-2.5 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)] z-20 ${!canScrollRight ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'}`}
          onClick={() => scrollBy(1)}
          disabled={!canScrollRight}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Scroll right"
        >
          <ChevronRight className="w-5 h-5 text-gray-900" />
        </motion.button>

        {/* Cards Carousel */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto snap-x snap-mandatory space-x-4 py-6 scrollbar-hidden select-none"
          style={{ perspective: "800px" }}
        >
          {experienceData.map((item, index) => (
            <motion.div
              key={index}
              className="flex-shrink-0"
              style={{
                transform: `rotateY(${index % 2 === 0 ? 3 : -3}deg)`,
                marginLeft: index === 0 ? "calc(50% - 170px)" : "",
                marginRight: index === experienceData.length - 1 ? "calc(50% - 170px)" : "",
              }}
            >
              <ExperienceCard {...item} delay={200 + index * 200} />
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hidden::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hidden {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .particle {
          position: absolute;
          background: rgba(16, 185, 129, 0.7);
          border-radius: 50%;
          animation: float 15s infinite linear;
          box-shadow: 0 0 8px rgba(16, 185, 129, 0.4);
        }
        .particle-1 { width: 8px; height: 8px; top: 20%; left: 30%; animation-duration: 12s; }
        .particle-2 { width: 6px; height: 6px; top: 60%; left: 80%; animation-duration: 15s; }
        .particle-3 { width: 10px; height: 10px; top: 40%; left: 50%; animation-duration: 10s; }
        .particle-4 { width: 7px; height: 7px; top: 75%; left: 25%; animation-duration: 18s; }
        @keyframes float {
          0% { transform: translate(0, 0); opacity: 0.7; }
          50% { opacity: 0.3; }
          100% { transform: translate(100px, -100px); opacity: 0.7; }
        }
        @media (max-width: 640px) {
          .text-4xl { font-size: 2.25rem; }
          .text-lg { font-size: 1rem; }
          .max-w-[300px] { max-width: 280px; }
        }
        @media (max-width: 768px) {
          .flex { flex-direction: column; align-items: center; }
          .snap-x { scroll-snap-type: none; }
          .space-x-4 { gap: 1rem; }
          .mx-4 { margin-left: 0; margin-right: 0; }
          [style*="margin-left"], [style*="margin-right"] { margin-left: 0 !important; margin-right: 0 !important; }
        }
      `}</style>
    </section>
  );
};

export default Pengalaman;