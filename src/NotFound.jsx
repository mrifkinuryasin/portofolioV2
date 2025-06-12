import { memo, useEffect } from "react";
import { Helmet } from "react-helmet";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";
import { AlertTriangle, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

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
        <title>404 - Halaman Tidak Ditemukan | Nugra.my.id</title>
        <meta name="description" content="Oops! Halaman yang Anda cari tidak ada." />
        <meta name="keywords" content="404, Tidak Ditemukan, Nugra.my.id, Halaman Error" />
        <meta property="og:title" content="404 - Halaman Tidak Ditemukan | Nugra.my.id" />
        <meta property="og:description" content="Oops! Halaman yang Anda cari tidak ada." />
        <meta property="og:url" content="https://nugra.my.id/404" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://nugra.my.id/404" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;500;700&display=swap" rel="stylesheet" />
      </Helmet>

      <section className="min-h-screen flex items-center justify-center bg-gray-950 px-4 sm:px-6 md:px-8 font-mono">
        <motion.div
          className="max-w-3xl mx-auto text-center bg-gray-900/60 border border-green-600/40 rounded-3xl backdrop-blur-md p-8 sm:p-12 shadow-[0_6px_24px_rgba(16,185,129,0.4)]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <div className="flex justify-center mb-6 sm:mb-8" data-aos="zoom-in" data-aos-duration="800">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <AlertTriangle className="w-20 h-20 sm:w-24 sm:h-24 text-green-300" />
            </motion.div>
          </div>
          <h1
            className="text-5xl sm:text-6xl md:text-7xl text-green-300 mb-4 sm:mb-6 font-bold animate-glitch"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            404 - Halaman Tidak Ditemukan
          </h1>
          <p
            className="text-lg sm:text-xl text-green-300/80 mb-6 sm:mb-8"
            data-aos="fade-up"
            data-aos-duration="1200"
          >
            Oops! Sepertinya halaman yang kamu cari tidak ada atau telah dipindahkan.
          </p>
          <p
            className="text-sm sm:text-base text-green-300/70 italic mb-10"
            data-aos="fade-up"
            data-aos-duration="1300"
          >
            Jika kamu merasa ini adalah kesalahan, silakan hubungi{" "}
            <span className="font-semibold text-teal-400">Muhammad Rifki Nuryasin</span> melalui halaman kontak di{" "}
            <a
              href="https://nugra.my.id"
              className="underline hover:text-teal-300 transition-colors duration-300"
            >
              nugra.my.id
            </a>.
          </p>
          <div className="flex justify-center" data-aos="fade-up" data-aos-duration="1400">
            <Link to="/">
              <motion.button
                className="px-6 py-3 sm:px-8 sm:py-4 rounded-xl bg-gradient-to-r from-green-500 to-teal-400 text-gray-900 font-semibold text-sm sm:text-base transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 shadow-[0_4px_12px_rgba(16,185,129,0.3)] hover:shadow-[0_6px_16px_rgba(16,185,129,0.5)]"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
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
          @media (max-width: 640px) {
            .text-5xl { font-size: 2.5rem; }
            .text-lg { font-size: 1rem; }
            .text-sm { font-size: 0.875rem; }
            .p-8 { padding: 1.5rem; }
            .mb-6 { margin-bottom: 1.5rem; }
          }
          @media (min-width: 768px) {
            .text-6xl { font-size: 3.75rem; }
            .text-xl { font-size: 1.25rem; }
          }
        `}</style>
      </section>
    </>
  );
};

export default memo(NotFound);