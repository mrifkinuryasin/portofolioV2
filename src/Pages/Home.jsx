import React, { useState, useEffect, useCallback, memo } from "react";
import { Github, Linkedin, Instagram } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

// Komponen kecil
const MainTitle = memo(() => (
  <div className="space-y-4" data-aos="fade-up" data-aos-delay="400">
    <h1 className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-300 drop-shadow-[0_3px_6px_rgba(16,185,129,0.6)]">
      RIFKI NURYASIN
    </h1>
  </div>
));

const CTAButton = memo(({ href, text }) => (
  <a
    href={href}
    className="relative inline-block focus:outline-none focus:ring-2 focus:ring-green-400 rounded-xl"
    target="_blank"
    rel="noopener noreferrer"
  >
    <button className="w-40 xs:w-44 sm:w-48 h-12 rounded-xl bg-gradient-to-r from-green-800 to-teal-900 text-green-300 font-semibold text-sm tracking-wide transition-all duration-300 hover:scale-105 hover:from-green-700 hover:to-teal-800 hover:shadow-[0_6px_16px_rgba(16,185,129,0.5)] flex items-center justify-center group">
      {text}
      <span className="ml-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">→</span>
    </button>
  </a>
));

const SocialLink = memo(({ icon: Icon, link }) => (
  <a
    href={link}
    target="_blank"
    rel="noopener noreferrer"
    className="relative p-3 rounded-full bg-gray-900/80 backdrop-blur-sm hover:bg-green-800/80 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-green-400 hover:shadow-[0_4px_12px_rgba(16,185,129,0.3)]"
  >
    <Icon className="w-6 h-6 text-green-300 hover:text-green-200 transition-colors duration-300" />
  </a>
));

// Data
const WORDS = [
  "Data Analyst",
  "Digital Forensic",
  "Problem Solver",
  "Web Developer",
  "Analytical Thinker",
  "Data Visualizer",
  "Cybersecurity",
  "Passionate Learner",
  "Rifki — Insights",
];
const TYPING_SPEED = 80;
const ERASING_SPEED = 40;
const PAUSE_DURATION = 1500;

const SOCIAL_LINKS = [
  { icon: Github, link: "https://github.com/mrifkinuryasin" },
  { icon: Linkedin, link: "https://www.linkedin.com/in/muhammad-rifki-nuryasin-75272a24a/" },
  { icon: Instagram, link: "https://www.instagram.com/kikokhatake02" },
];

// Komponen utama
const Home = () => {
  const [text, setText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    AOS.init({
      once: true,
      duration: 800,
      easing: "ease-in-out",
    });
  }, []);

  const handleTyping = useCallback(() => {
    if (isTyping) {
      if (charIndex < WORDS[wordIndex].length) {
        setText((prev) => prev + WORDS[wordIndex][charIndex]);
        setCharIndex((prev) => prev + 1);
      } else {
        setTimeout(() => setIsTyping(false), PAUSE_DURATION);
      }
    } else {
      if (charIndex > 0) {
        setText((prev) => prev.slice(0, -1));
        setCharIndex((prev) => prev - 1);
      } else {
        setWordIndex((prev) => (prev + 1) % WORDS.length);
        setIsTyping(true);
      }
    }
  }, [charIndex, isTyping, wordIndex]);

  useEffect(() => {
    const timeout = setTimeout(handleTyping, isTyping ? TYPING_SPEED : ERASING_SPEED);
    return () => clearTimeout(timeout);
  }, [handleTyping]);

  return (
    <section
      className="min-h-screen text-green-400 flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 py-10 bg-gradient-to-b from-gray-900 via-green-900/50 to-transparent"
      id="Home"
    >
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-16 lg:gap-20 items-center relative z-10">
        {/* Text Content on the left */}
        <div className="space-y-6 sm:space-y-8 text-center lg:text-left order-2 lg:order-1">
          <MainTitle />
          <div
            className="h-8 sm:h-10 flex items-center justify-center lg:justify-start font-semibold text-green-200 text-lg sm:text-xl lg:text-2xl tracking-wider"
            data-aos="fade-up"
            data-aos-delay="600"
          >
            <span>{text}</span>
            <span className="w-[2px] h-6 sm:h-7 bg-green-200 ml-1.5 animate-blink rounded"></span>
          </div>
          <p
            className="text-sm sm:text-base lg:text-lg text-green-300/80 leading-relaxed font-light max-w-md mx-auto lg:mx-0"
            data-aos="fade-up"
            data-aos-delay="800"
          >
            A dedicated and analytical thinker with a passion for uncovering insights from data, solving complex problems, and driving innovation through technology.
          </p>
          <div
            className="flex gap-4 sm:gap-6 justify-center lg:justify-start mt-6"
            data-aos="fade-up"
            data-aos-delay="1200"
          >
            {SOCIAL_LINKS.map((social, index) => (
              <SocialLink key={index} {...social} />
            ))}
          </div>
        </div>

        {/* Photo on the right */}
        <div className="flex justify-center lg:justify-start order-1 lg:order-2" data-aos="fade-left" data-aos-delay="600">
          <div className="relative">
            <img
              src="/rf.png"
              alt="Rifki"
              className="w-[300px] h-[169px] xs:w-[340px] xs:h-[191px] sm:w-[380px] sm:h-[214px] lg:w-[420px] lg:h-[236px] object-cover rounded-2xl shadow-xl transition-all duration-500 hover:scale-105 hover:shadow-[0_8px_20px_rgba(16,185,129,0.5)]"
            />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-green-500/20 to-teal-400/20 opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(Home);