import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Home from "./Pages/Home";
import About from "./Pages/About";
import AnimatedBackground from "./components/Background";
import Navbar from "./components/Navbar";
import Portofolio from "./Pages/Portofolio"; 
import ContactPage from "./Pages/Contact";
import ProjectDetails from "./components/ProjectDetail";
import WelcomeScreen from "./Pages/WelcomeScreen";
// import LoginPage from "./Pages/Login";
// import Pengalaman from "./components/Pengalaman";
// import Dashboard from "./Pages/Dashboard";
import { AnimatePresence, motion } from 'framer-motion';
import { Github, Linkedin, Code2 } from 'lucide-react';

const LandingPage = ({ showWelcome, setShowWelcome }) => {
  return (
    <>
      <AnimatePresence mode="wait">
        {showWelcome && (
          <WelcomeScreen onLoadingComplete={() => setShowWelcome(false)} />
        )}
      </AnimatePresence>

      {!showWelcome && (
        <div className="relative w-full min-h-screen bg-black overflow-x-hidden">
          {/* Background Particles */}
          <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
            <div className="particle particle-1"></div>
            <div className="particle particle-2"></div>
            <div className="particle particle-3"></div>
            <div className="particle particle-4"></div>
          </div>

          <Navbar />
          <AnimatedBackground />
          <main className="flex flex-col relative z-10">
            <Home />
            <About />
            {/* <Pengalaman /> */}
            <Portofolio />
            <ContactPage />
          </main>

          {/* Footer */}
          <footer className="border-t-4 border-green-600/30 mt-12 xs:mt-16 px-4 sm:px-8 lg:px-16 py-8 bg-transparent text-green-400/90 text-xs sm:text-sm font-medium">
            <div className="max-w-7xl mx-auto w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 bg-transparent rounded-xl border border-green-600/30 p-6 sm:p-8 shadow-[0_2px_8px_rgba(16,185,129,0.2)]">
              {/* Kolom 1 */}
              <div>
                <motion.h3
                  className="text-green-400 text-lg sm:text-xl font-bold mb-4 flex items-center gap-2"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <Code2 className="w-5 sm:w-6 h-5 sm:h-6" />
                  Motivasi Hari Ini
                </motion.h3>
                <p className="text-sm sm:text-base leading-relaxed">
                  "Hidup untuk memberi arti, bukan sekadar eksistensi."
                </p>
              </div>
              {/* Kolom 2 */}
              <div>
                <motion.h3
                  className="text-green-400 text-lg sm:text-xl font-bold mb-4 flex items-center gap-2"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <Code2 className="w-5 sm:w-6 h-5 sm:h-6" />
                  Sedang Kupelajari
                </motion.h3>
                <ul className="space-y-2">
                  {[
                    { text: "Cybersecurity", href: "/about" },
                    { text: "IoT dengan ESP32", href: "/about" },
                    { text: "React & Tailwind", href: "/portofolio" },
                  ].map((item, index) => (
                    <motion.li
                      key={index}
                      whileHover={{ scale: 1.05, x: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <a
                        href={item.href}
                        className="text-green-400/90 hover:text-green-400 transition-colors flex items-center gap-2 hover:shadow-[0_0_10px_rgba(16,185,129,0.3)]"
                      >
                        <span className="text-green-400">•</span> {item.text}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </div>
              {/* Kolom 3 */}
              <div>
                <motion.h3
                  className="text-green-400 text-lg sm:text-xl font-bold mb-4 flex items-center gap-2"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <Code2 className="w-5 sm:w-6 h-5 sm:h-6" />
                  Hubungi Saya
                </motion.h3>
                <ul className="space-y-2">
                  {[
                    { icon: Github, text: "github.com/rifki", href: "https://github.com/mrifkinuryasin" },
                    { icon: Linkedin, text: "linkedin.com/in/rifki", href: "https://www.linkedin.com/in/muhammad-rifki-nuryasin-75272a24a/" },
                  ].map((item, index) => (
                    <motion.li
                      key={index}
                      whileHover={{ scale: 1.05, x: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-400/90 hover:text-green-400 transition-colors flex items-center gap-2 hover:shadow-[0_0_10px_rgba(16,185,129,0.3)]"
                      >
                        <motion.div
                          className="bg-gradient-to-r from-green-500 to-teal-400 p-1 rounded-full"
                          animate={{ rotate: [0, 360] }}
                          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        >
                          <item.icon className="w-4 h-4 text-gray-900" />
                        </motion.div>
                        {item.text}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
            <motion.div
              className="text-center mt-6 text-green-400/70 text-xs sm:text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              © 2025 Rifki. All rights reserved.
            </motion.div>
          </footer>
        </div>
      )}
    </>
  );
};

const ProjectPageLayout = () => (
  <div className="relative w-full min-h-screen bg-black overflow-x-hidden">
    {/* Background Particles */}
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
      <div className="particle particle-1"></div>
      <div className="particle particle-2"></div>
      <div className="particle particle-3"></div>
      <div className="particle particle-4"></div>
    </div>

    <Navbar />
    <main className="flex flex-col relative z-10">
      <ProjectDetails />
    </main>
    <footer className="border-t-4 border-green-600/30 mt-12 xs:mt-16 px-4 sm:px-8 lg:px-16 py-8 bg-transparent text-green-400/90 text-xs sm:text-sm font-medium">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 bg-transparent rounded-xl border border-green-600/30 p-6 sm:p-8 shadow-[0_2px_8px_rgba(16,185,129,0.2)]">
        {/* Kolom 1 */}
        <div>
          <motion.h3
            className="text-green-400 text-lg sm:text-xl font-bold mb-4 flex items-center gap-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Code2 className="w-5 sm:w-6 h-5 sm:h-6" />
            Motivasi Hari Ini
          </motion.h3>
          <p className="text-sm sm:text-base leading-relaxed">
            "Hidup untuk memberi arti, bukan sekadar eksistensi."
          </p>
        </div>
        {/* Kolom 2 */}
        <div>
          <motion.h3
            className="text-green-400 text-lg sm:text-xl font-bold mb-4 flex items-center gap-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Code2 className="w-5 sm:w-6 h-5 sm:h-6" />
            Sedang Kupelajari
          </motion.h3>
          <ul className="space-y-2">
            {[
              { text: "Cybersecurity", href: "/about" },
              { text: "IoT dengan ESP32", href: "/about" },
              { text: "React & Tailwind", href: "/portofolio" },
            ].map((item, index) => (
              <motion.li
                key={index}
                whileHover={{ scale: 1.05, x: 5 }}
                transition={{ duration: 0.3 }}
              >
                <a
                  href={item.href}
                  className="text-green-400/90 hover:text-green-400 transition-colors flex items-center gap-2 hover:shadow-[0_0_10px_rgba(16,185,129,0.3)]"
                >
                  <span className="text-green-400">•</span> {item.text}
                </a>
              </motion.li>
            ))}
          </ul>
        </div>
        {/* Kolom 3 */}
        <div>
          <motion.h3
            className="text-green-400 text-lg sm:text-xl font-bold mb-4 flex items-center gap-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Code2 className="w-5 sm:w-6 h-5 sm:h-6" />
            Hubungi Saya
          </motion.h3>
          <ul className="space-y-2">
            {[
              { icon: Github, text: "github.com/rifki", href: "https://github.com/rifki" },
              { icon: Linkedin, text: "linkedin.com/in/rifki", href: "https://linkedin.com/in/rifki" },
            ].map((item, index) => (
              <motion.li
                key={index}
                whileHover={{ scale: 1.05, x: 5 }}
                transition={{ duration: 0.3 }}
              >
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-400/90 hover:text-green-400 transition-colors flex items-center gap-2 hover:shadow-[0_0_10px_rgba(16,185,129,0.3)]"
                >
                  <motion.div
                    className="bg-gradient-to-r from-green-500 to-teal-400 p-1 rounded-full"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  >
                    <item.icon className="w-4 h-4 text-gray-900" />
                  </motion.div>
                  {item.text}
                </a>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
      <motion.div
        className="text-center mt-6 text-green-400/70 text-xs sm:text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        © 2025 Rifki. All rights reserved.
      </motion.div>
    </footer>
  </div>
);

function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const moveCursor = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const addHoverEvents = () => {
      const interactiveElements = document.querySelectorAll('a, button, input, textarea, select, label, [role="button"]');

      const handleMouseEnter = () => setHovered(true);
      const handleMouseLeave = () => setHovered(false);

      interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', handleMouseEnter);
        el.addEventListener('mouseleave', handleMouseLeave);
      });

      return () => {
        interactiveElements.forEach(el => {
          el.removeEventListener('mouseenter', handleMouseEnter);
          el.removeEventListener('mouseleave', handleMouseLeave);
        });
      };
    };

    window.addEventListener("mousemove", moveCursor);
    const cleanupHover = addHoverEvents();

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      cleanupHover();
    };
  }, []);

  return (
    <div
      className={`custom-cursor ${hovered ? 'custom-cursor-hover' : ''} hidden sm:block`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        background: 'radial-gradient(circle, rgba(16, 185, 129, 0.7) 20%, transparent 70%)',
        boxShadow: '0 0 15px rgba(16, 185, 129, 0.5)',
      }}
    />
  );
}

function App() {
  const [showWelcome, setShowWelcome] = useState(true);

  return (
    <div className="w-full min-h-screen bg-black overflow-x-hidden">
      <CustomCursor />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage showWelcome={showWelcome} setShowWelcome={setShowWelcome} />} />
          {/* <Route path="/login" element={<LoginPage />} /> */}
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          <Route path="/project/:id" element={<ProjectPageLayout />} />
          {/* <Route path="/pengalaman" element={<Pengalaman />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

<style jsx>{`
  /* Particle Animations */
  .particle {
    position: absolute;
    background: rgba(16, 185, 129, 0.7);
    border-radius: 50%;
    animation: float 15s infinite linear;
    box-shadow: 0 0 10px rgba(16, 185, 129, 0.5);
  }
  .particle-1 { width: 8px; height: 8px; top: 10%; left: 20%; animation-duration: 12s; }
  .particle-2 { width: 6px; height: 6px; top: 60%; left: 80%; animation-duration: 18s; }
  .particle-3 { width: 10px; height: 10px; top: 40%; left: 50%; animation-duration: 15s; }
  .particle-4 { width: 7px; height: 7px; top: 80%; left: 30%; animation-duration: 20s; }
  @keyframes float {
    0% { transform: translate(0, 0); opacity: 0.8; }
    50% { opacity: 0.3; }
    100% { transform: translate(100px, -100px); opacity: 0.8; }
  }

  /* Glitch Animation */
  .animate-glitch {
    position: relative;
    animation: glitch 2s infinite;
  }
  @keyframes glitch {
    0% { transform: translate(0); }
    20% { transform: translate(-2px, 2px); }
    40% { transform: translate(2px, -2px); }
    60% { transform: translate(-2px, 2px); }
    80% { transform: translate(2px, -2px); }
    100% { transform: translate(0); }
  }

  /* Responsive Styles */
  @media (max-width: 640px) {
    .text-xs {
      font-size: 0.75rem;
    }
    .px-4 {
      padding-left: 1rem;
      padding-right: 1rem;
    }
    .py-8 {
      padding-top: 1.5rem;
      padding-bottom: 1.5rem;
    }
    .mt-12 {
      margin-top: 2rem;
    }
    .gap-6 {
      gap: 1.5rem;
    }
    .max-w-7xl {
      max-width: 90%;
    }
  }
  @media (max-width: 768px) {
    .text-sm {
      font-size: 0.875rem;
    }
    .text-lg {
      font-size: 1rem;
    }
  }
  @media (min-width: 1024px) {
    .text-xl {
      font-size: 1.25rem;
    }
  }
`}</style>