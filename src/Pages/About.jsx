import React, { useEffect, memo, useState } from "react";
import { FileText, Code2, Shield, Layout, Cpu } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";

const Header = memo(() => (
  <motion.div
    className="text-center mb-6 xs:mb-8 sm:mb-10 px-2 xs:px-4 sm:px-6"
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
  >
    <div className="inline-block relative group">
      <h2
        className="text-3xl xs:text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-teal-400 tracking-wide"
        data-aos="fade-down"
        data-aos-duration="600"
      >
        About Me
      </h2>
      <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-green-500 to-teal-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
    </div>
    <p
      className="mt-3 xs:mt-4 text-green-400/90 max-w-3xl mx-auto text-base xs:text-lg sm:text-xl flex items-center justify-center gap-2 xs:gap-3 font-semibold"
      data-aos="fade-down"
      data-aos-duration="800"
      aria-hidden="true"
    >
      Tentang saya ..?
    </p>
  </motion.div>
));

const LoadingSkeleton = () => (
  <div className="animate-pulse bg-transparent rounded-xl w-full max-w-[280px] xs:max-w-[320px] h-[300px] xs:h-[340px] mx-auto">
    <div className="w-full h-full bg-gray-800/50 rounded-xl" />
  </div>
);

const ProfileImage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <LoadingSkeleton />;

  return (
    <motion.div
      className="relative w-full max-w-[280px] xs:max-w-[320px] sm:max-w-[360px] overflow-hidden rounded-xl border border-green-600/30 mx-auto"
      data-aos="fade-right"
      data-aos-duration="1000"
      aria-label="Profile Image of Rifki"
      whileHover={{ scale: 1.05, rotateY: 5 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <img
        src="rifki.jpg"
        alt="Rifki"
        className="w-full h-[300px] xs:h-[340px] object-cover transition-opacity duration-500 ease-in-out"
        loading="lazy"
        onError={(e) => {
          console.error("Failed to load image: rifki.jpg");
          e.currentTarget.src = "/rf.png";
        }}
      />
      <div className="absolute inset-0 bg-green-600/10 transition-all duration-500 hover:bg-green-600/20 pointer-events-none" />
    </motion.div>
  );
};

const Chip = ({ text }) => (
  <motion.span
    className="inline-block bg-gray-800/60 border border-green-600/30 text-green-400/90 text-[10px] xs:text-xs font-semibold px-2 xs:px-3 py-0.5 xs:py-1 rounded-full mr-1 xs:mr-2 mb-1 xs:mb-2 shadow-sm select-none"
    whileHover={{ scale: 1.1, backgroundColor: "rgba(20, 184, 166, 0.2)" }}
    transition={{ duration: 0.2 }}
  >
    {text}
  </motion.span>
);

const SkillCard = ({ icon: Icon, title, description, tools = [], delay }) => (
  <motion.div
    className="flex flex-col items-center text-center bg-transparent rounded-xl border border-green-600/30 p-4 xs:p-5 transition-all duration-300 hover:shadow-[0_8px_20px_rgba(16,185,129,0.5)]"
    data-aos="fade-up"
    data-aos-delay={delay}
    role="group"
    tabIndex={0}
    aria-label={`${title} skill`}
    whileHover={{ scale: 1.05, rotateY: 3 }}
    transition={{ duration: 0.3, ease: "easeOut" }}
  >
    <motion.div
      className="bg-gradient-to-r from-green-500 to-teal-400 text-gray-900 p-2 xs:p-3 rounded-full mb-2 xs:mb-3 flex items-center justify-center"
      animate={{ rotate: [0, 360] }}
      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
    >
      <Icon className="w-6 xs:w-8 sm:w-10 h-6 xs:h-8 sm:h-10" aria-hidden="true" />
    </motion.div>
    <h3 className="text-base xs:text-lg sm:text-xl font-bold text-green-400 mb-1 xs:mb-2">{title}</h3>
    <p className="text-xs xs:text-sm text-green-400/90 mb-2 xs:mb-3 max-w-xs leading-relaxed">{description}</p>
    <div className="flex flex-wrap justify-center gap-1 xs:gap-2 max-w-full">
      {tools.map((tool) => (
        <Chip key={tool} text={tool} />
      ))}
    </div>
  </motion.div>
);

const AboutPage = () => {
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
        <title>About – Rifki.my.id</title>
        <meta name="description" content="Tentang Rifki dan perjalanan profesionalnya." />
        <meta name="keywords" content="Rifki, Portfolio, Web Developer, Cybersecurity, Tent continuanceang Saya" />
        <meta property="og:title" content="About – Rifki.my.id" />
        <meta property="og:description" content="Tentang Rifki dan perjalanan profesionalnya." />
        <meta property="og:url" content="https://rifki.my.id/about" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://rifki.my.id/about" />
      </Helmet>

      <section
        className="min-h-screen text-green-400 bg-transparent overflow-hidden px-2 xs:px-4 sm:px-6 md:px-8 lg:px-12 pt-16 xs:pt-20 sm:pt-24 pb-10 sm:pb-12 relative"
        id="About"
      >
        <div className="max-w-7xl w-full mx-auto">
          <Header />

          <div className="pt-8 xs:pt-10 sm:pt-14">
            <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 xs:gap-8 sm:gap-12 md:gap-16 lg:gap-20 items-center">
              <ProfileImage />
              <motion.div
                className="space-y-4 xs:space-y-6 sm:space-y-8 text-left"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <h2
                  className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight"
                  data-aos="fade-left"
                  data-aos-duration="1000"
                >
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-teal-400">Hello, I'm</span>
                  <span className="block mt-1 xs:mt-2 text-green-400/90" data-aos="fade-left" data-aos-duration="1300">
                    Rifki
                  </span>
                </h2>
                <p
                  className="text-sm xs:text-base sm:text-lg md:text-xl text-green-400/90 leading-relaxed text-justify"
                  data-aos="fade-left"
                  data-aos-duration="1500"
                >
                  Halo, saya Muhammad Rifki Nuryasin — mahasiswa tingkat akhir Teknik Komputer di Universitas Teknologi Digital Indonesia (UTDI) <br />
                   memiliki ketertarikan kuat pada IoT, pengembangan aplikasi mobile, dan sistem data real-time.Saya juga memiliki minat yang besar <br />
                    di bidang cybersecurity, khususnya pada Digital Forensic, serta tertarik pada pengembangan frontend. Saya percaya bahwa teknologi <br />
                     harus mampu menyederhanakan sistem yang kompleks, aman digunakan, dan memberikan nilai nyata bagi penggunanya.
                </p>
                <div
                  className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 xs:gap-4 sm:gap-6 mt-3 xs:mt-4"
                  data-aos="fade-up"
                  data-aos-duration="800"
                >
                  <motion.a
                    href="rifki-resume.pdf"
                    className="w-full sm:w-auto"
                    target="_blank"
                    rel="noreferrer noopener"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                  >
                    <button
                      className="relative w-full sm:w-auto px-6 xs:px-8 py-2 xs:py-3 rounded-xl bg-gradient-to-r from-green-500 to-teal-400 text-gray-900 font-semibold transition-all duration-300 hover:shadow-[0_6px_16px_rgba(16,185,129,0.5)] flex items-center justify-center gap-2 xs:gap-3"
                    >
                      <motion.span
                        className="absolute -left-4 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-green-500 to-teal-400 p-1.5 rounded-full"
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                      >
                        <FileText className="w-3 h-3 text-gray-900" />
                      </motion.span>
                      Download CV
                    </button>
                  </motion.a>
                  <motion.a
                    href="#Portofolio"
                    className="w-full sm:w-auto"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                  >
                    <button
                      className="relative w-full sm:w-auto px-6 xs:px-8 py-2 xs:py-3 rounded-xl border border-green-600/30 text-green-400 font-semibold transition-all duration-300 hover:bg-gradient-to-r hover:from-green-500 hover:to-teal-400 hover:text-gray-900 hover:shadow-[0_6px_16px_rgba(16,185,129,0.5)] flex items-center justify-center gap-2 xs:gap-3"
                      data-aos="fade-up"
                      data-aos-duration="1000"
                    >
                      <motion.span
                        className="absolute -left-4 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-green-500 to-teal-400 p-1.5 rounded-full"
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                      >
                        <Code2 className="w-3 h-3 text-gray-900" />
                      </motion.span>
                      View Projects
                    </button>
                  </motion.a>
                </div>
              </motion.div>
            </div>

            <div id="Skils" className="mt-16 xs:mt-20 sm:mt-24">
              <div className="text-center mb-8 xs:mb-10 sm:mb-12">
                <h3
                  className="text-3xl xs:text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-teal-400"
                  data-aos="fade-up"
                  data-aos-duration="800"
                >
                  My Skills
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 xs:gap-8 sm:gap-10 px-2 xs:px-4 sm:px-8">
                <SkillCard
                  icon={Code2}
                  title="Programming"
                  description="Expertise in multiple programming languages and algorithms."
                  tools={["JavaScript", "Python", "C++", "HTML", "CSS"]}
                  delay={100}
                />
                <SkillCard
                  icon={Shield}
                  title="Cybersecurity"
                  description="Skilled in securing systems and analyzing digital threats."
                  tools={["Wireshark", "Metasploit", "Kali Linux", "Nmap"]}
                  delay={300}
                />
                <SkillCard
                  icon={Cpu}
                  title="IoT & Robotics"
                  description="Experience building and programming IoT devices and robots."
                  tools={["ESP32", "Arduino", "MQTT"]}
                  delay={700}
                />
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          .animate-pulse {
            animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          }
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
          @media (max-width: 640px) {
            .max-w-\[280px\] {
              max-width: 100%;
            }
            .text-3xl {
              font-size: 1.75rem;
            }
            .text-4xl {
              font-size: 2rem;
            }
            .text-5xl {
              font-size: 2.5rem;
            }
            .text-base {
              font-size: 0.875rem;
            }
            .text-xs {
              font-size: 0.75rem;
            }
            .px-2 {
              padding-left: 0.5rem;
              padding-right: 0.5rem;
            }
          }
        `}</style>
      </section>
    </>
  );
};

export default memo(AboutPage);