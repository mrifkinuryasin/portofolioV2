import React, { useState, useEffect, useCallback, memo } from "react";
import { Github, Linkedin, Instagram } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

// Komponen kecil
const MainTitle = memo(() => (
  <div className="space-y-3" data-aos="fade-up" data-aos-delay="400">
    <h1 className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-teal-400 drop-shadow-[0_2px_4px_rgba(16,185,129,0.5)]">
      RIFKI
    </h1>
  </div>
));

const CTAButton = memo(({ href, text }) => (
  <a
    href={href}
    className="relative inline-block focus:outline-none focus:ring-2 focus:ring-green-500 rounded-lg"
    target="_blank"
    rel="noopener noreferrer"
  >
    <button className="w-36 xs:w-40 sm:w-44 h-10 rounded-xl bg-gradient-to-r from-green-900 to-gray-900 text-green-400 font-semibold text-sm transition-all duration-300 hover:scale-105 hover:from-green-800 hover:to-gray-800 hover:shadow-[0_4px_12px_rgba(16,185,129,0.4)] flex items-center justify-center">
      {text}
    </button>
  </a>
));

const SocialLink = memo(({ icon: Icon, link }) => (
  <a
    href={link}
    target="_blank"
    rel="noopener noreferrer"
    className="relative p-2 rounded-full bg-gray-800 hover:bg-green-900 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-green-500"
  >
    <Icon className="w-5 h-5 text-green-400 hover:text-green-300 transition-colors duration-300" />
  </a>
));

// Data
const WORDS = [
  "Data Analyst",
  "Forensic Specialist",
  "Problem Solver",
  "Tech Innovator",
  "Analytical Thinker",
  "Data Visualizer",
  "Cybersecurity Analyst",
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
      duration: 600,
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
      <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
        {/* Text Content on the left */}
        <div className="space-y-4 sm:space-y-6 text-center lg:text-left order-2 lg:order-1">
          <MainTitle />
          <div
            className="h-6 sm:h-8 flex items-center justify-center lg:justify-start font-semibold text-green-300 text-base sm:text-lg lg:text-xl tracking-wide"
            data-aos="fade-up"
            data-aos-delay="600"
          >
            <span>{text}</span>
            <span className="w-[2px] h-5 sm:h-6 bg-green-300 ml-1 animate-blink rounded"></span>
          </div>
          <p
            className="text-xs sm:text-sm lg:text-base text-green-400 leading-relaxed font-light max-w-sm mx-auto lg:mx-0"
            data-aos="fade-up"
            data-aos-delay="800"
          >
             A dedicated and analytical thinker with a passion for uncovering insights from data, solving complex problems, and driving innovation through technology.
          </p>
          <div
            className="flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-4"
            data-aos="fade-up"
            data-aos-delay="1000"
          >
            <CTAButton href="#" text="Download CV" />
            <CTAButton href="#" text="View Projects" />
          </div>
          <div
            className="flex gap-3 sm:gap-4 justify-center lg:justify-start mt-4"
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
          <img
            src="/rf.png"
            alt="Rifki"
            className="w-[280px] h-[158px] xs:w-[320px] xs:h-[180px] sm:w-[360px] sm:h-[203px] lg:w-[400px] lg:h-[225px] object-cover rounded-lg shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_4px_12px_rgba(16,185,129,0.4)]"
          />
        </div>
      </div>
    </section>
  );
};

export default memo(Home);
