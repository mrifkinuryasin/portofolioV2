import { memo, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";
import { Code2, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

const TypewriterEffect = ({ text }) => {
  const [displayText, setDisplayText] = useState('');
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i <= text.length) {
        setDisplayText(text.slice(0, i));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 80);
    return () => clearInterval(timer);
  }, [text]);

  return (
    <span className="font-mono text-green-300 text-lg sm:text-xl tracking-wide">
      {displayText}
      <span className="animate-pulse text-green-300">|</span>
    </span>
  );
};

const NotFound = () => {
  useEffect(() => {
    AOS.init({
      once: false,
      duration: window.innerWidth < 640 ? 600 : 800,
      easing: "ease-in-out",
    });
    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => AOS.refresh(), 250);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>404 - Halaman Tidak Ditemukan</title>
      </Helmet>

      <section className="min-h-screen flex items-center justify-center bg-gray-950 px-4 sm:px-6 md:px-8 font-mono overflow-hidden">
        {/* Background Particles */}
        <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
          <div className="particle particle-1"></div>
          <div className="particle particle-2"></div>
          <div className="particle particle-3"></div>
          <div className="particle particle-4"></div>
        </div>

        <motion.div
          className="relative z-10 max-w-2xl mx-auto text-center bg-gray-900/60 border border-green-600/40 rounded-2xl backdrop-blur-md p-6 sm:p-10 shadow-[0_6px_24px_rgba(16,185,129,0.5)]"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {/* Spinner Icon */}
          <div className="flex justify-center mb-6 sm:mb-8" data-aos="zoom-in" data-aos-duration="800">
            <motion.div
              className="relative w-20 h-20 sm:w-24 sm:h-24"
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            >
              <div className="absolute inset-0 border-4 border-green-400/30 rounded-full" />
              <motion.div
                className="absolute inset-0 border-t-4 border-teal-400 rounded-full"
                animate={{ rotate: -360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                className="absolute inset-3 bg-gradient-to-r from-green-500 to-teal-400 rounded-full flex items-center justify-center"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Code2 className="w-8 h-8 sm:w-10 sm:h-10 text-gray-900" />
              </motion.div>
            </motion.div>
          </div>

          {/* Title */}
          <h1
            className="text-4xl sm:text-5xl md:text-6xl text-green-300 mb-4 sm:mb-6 font-bold animate-glitch"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            404 - Halaman Tidak Ditemukan
          </h1>

          {/* Error Message */}
          <div
            className="text-lg sm:text-xl text-green-300/80 mb-6 sm:mb-8 min-h-[2.5rem]"
            data-aos="fade-up"
            data-aos-duration="1200"
          >
            <TypewriterEffect text="Halaman yang kamu cari tidak ada atau telah dipindahkan." />
          </div>

          {/* Contact Info */}
          <p
            className="text-sm sm:text-base text-green-300/70 mb-8 sm:mb-10"
            data-aos="fade-up"
            data-aos-duration="1300"
          >
            Jika ini kesalahan, hubungi{" "}
            <span className="font-semibold text-teal-400">Muhammad Rifki Nuryasin</span> via{" "}
            <a
              href="https://www.rifki.my.id"
              className="underline hover:text-teal-300 transition-colors duration-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              rifki.my.id
            </a>.
          </p>

          {/* Back Button */}
          <div className="flex justify-center" data-aos="fade-up" data-aos-duration="1400">
            <Link to="/">
              <motion.button
                className="px-6 py-3 sm:px-8 sm:py-4 rounded-xl bg-gradient-to-r from-green-500 to-teal-400 text-gray-900 font-semibold text-sm sm:text-base transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_4px_12px_rgba(16,185,129,0.4)] hover:shadow-[0_8px_20px_rgba(16,185,129,0.6)]"
                whileHover={{ scale: 1.15, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <motion.div
                  className="p-1.5 rounded-full bg-gray-900"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                >
                  <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-green-300" />
                </motion.div>
                Kembali ke Beranda
              </motion.button>
            </Link>
          </div>
        </motion.div>

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
            20% { transform: translate(-3px, 3px); }
            40% { transform: translate(3px, -3px); }
            60% { transform: translate(-3px, 3px); }
            80% { transform: translate(3px, -3px); }
            100% { transform: translate(0); }
          }

          /* Responsive Styles */
          @media (max-width: 640px) {
            .text-4xl { font-size: 2rem; }
            .text-lg { font-size: 1rem; }
            .text-sm { font-size: 0.875rem; }
            .p-6 { padding: 1.5rem; }
            .mb-6 { margin-bottom: 1.5rem; }
            .min-h-[2.5rem] { min-height: 2rem; }
          }
          @media (min-width: 768px) {
            .text-5xl { font-size: 3rem; }
            .text-xl { font-size: 1.25rem; }
          }
        `}</style>
      </section>
    </>
  );
};

export default memo(NotFound);