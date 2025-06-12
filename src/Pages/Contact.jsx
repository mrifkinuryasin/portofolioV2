import React, { useState, useEffect } from "react";
import {
  AiOutlineUser,
  AiOutlineMail,
  AiOutlineMessage,
  AiFillGithub,
  AiFillInstagram,
  AiFillLinkedin,
} from "react-icons/ai";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import { db, collection, addDoc, serverTimestamp } from "../firebase";

const ContactFooter = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    AOS.init({
      once: false,
      duration: window.innerWidth < 640 ? 600 : 800,
      easing: "ease-in-out",
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    Swal.fire({
      title: "Mengirim Pesan...",
      html: "Harap tunggu sebentar",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
      background: "linear-gradient(135deg, #111827, #1f2937)",
      color: "#d1d5db",
      customClass: {
        popup: "rounded-xl border-2 border-green-600/50 shadow-[0_0_15px_rgba(16,185,129,0.5)]",
        title: "font-bold text-green-400 text-xl",
      },
    });

    try {
      await addDoc(collection(db, "contacts"), {
        ...formData,
        createdAt: serverTimestamp(),
      });

      Swal.fire({
        title: "Berhasil!",
        text: "Pesan kamu sudah terkirim!",
        icon: "success",
        confirmButtonColor: "#10b981",
        background: "linear-gradient(135deg, #111827, #1f2937)",
        color: "#d1d5db",
        timer: 2000,
        customClass: {
          popup: "rounded-xl border-2 border-green-600/50 shadow-[0_0_15px_rgba(16,185,129,0.5)]",
          title: "font-bold text-green-400 text-xl",
          content: "text-green-300/90",
          confirmButton: "px-8 py-3 rounded-lg bg-gradient-to-r from-green-500 to-teal-400 text-gray-900 hover:shadow-[0_0_20px_#10b981] transition-all",
        },
      });

      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error submitting contact:", error);
      Swal.fire({
        title: "Gagal!",
        text: error.message,
        icon: "error",
        confirmButtonColor: "#10b981",
        background: "linear-gradient(135deg, #111827, #1f2937)",
        color: "#d1d5db",
        customClass: {
          popup: "rounded-xl border-2 border-green-600/50 shadow-[0_0_15px_rgba(16,185,129,0.5)]",
          title: "font-bold text-green-400 text-xl",
          content: "text-green-300/90",
        },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    { icon: <AiFillGithub size={28} />, name: "GitHub", href: "https://github.com/mrifkinuryasin" },
    { icon: <AiFillInstagram size={28} />, name: "Instagram", href: "https://www.instagram.com/kikokhatake02/" },
    { icon: <AiFillLinkedin size={28} />, name: "LinkedIn", href: "https://www.linkedin.com/in/muhammad-rifki-nuryasin-75272a24a/" },
  ];

  return (
    <>
      <Helmet>
        <title>Contact – Rifki.my.id</title>
        <meta
          name="description"
          content="Hubungi Muhammad Rifki Nuryasin untuk kolaborasi, pertanyaan, atau berbagi ide!"
        />
        <meta
          name="keywords"
          content="Rifki Nuryasin, Contact, Kontak, Web Developer, IoT, Cybersecurity"
        />
        <meta property="og:title" content="Contact – Rifki.my.id" />
        <meta
          property="og:description"
          content="Hubungi Muhammad Rifki Nuryasin untuk kolaborasi, pertanyaan, atau berbagi ide!"
        />
        <meta property="og:url" content="https://rifki.my.id/contact" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://rifki.my.id/contact" />
      </Helmet>

      <footer
        id="contact"
        className=" mt-16 sm:mt-20 px-4 sm:px-8 lg:px-16 py-12 sm:py-16 relative overflow-hidden"
      >
        {/* Background Particles */}
        <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
          <div className="particle particle-1"></div>
          <div className="particle particle-2"></div>
          <div className="particle particle-3"></div>
          <div className="particle particle-4"></div>
          <div className="particle particle-5"></div>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 relative z-10">
          {/* ABOUT SECTION */}
          <motion.div
            className="flex flex-col"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            data-aos="fade-right"
            data-aos-duration="1000"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-300 mb-4 sm:mb-6 tracking-tight">
              Hubungi Saya
            </h2>
            <p className="text-green-300/80 mb-6 sm:mb-8 text-base sm:text-lg md:text-xl leading-relaxed">
              Tertarik untuk berkolaborasi atau punya pertanyaan? Kirimkan pesan, dan saya akan segera merespons!
            </p>
            <div className="space-y-4 sm:space-y-5 text-green-300/90 text-sm sm:text-base font-medium">
              <motion.div
                className="flex items-center gap-3 group"
                whileHover={{ x: 10 }}
                transition={{ duration: 0.3 }}
              >
                <AiOutlineUser className="text-green-400 group-hover:scale-125 transition-transform duration-300" size={24} />
                Muhammad Rifki Nuryasin
              </motion.div>
              <motion.div
                className="flex items-center gap-3 group"
                whileHover={{ x: 10 }}
                transition={{ duration: 0.3 }}
              >
                <AiOutlineMail className="text-green-400 group-hover:scale-125 transition-transform duration-300" size={24} />
                muhammad.rifki@students.utdi.ac.id
              </motion.div>
              <motion.div
                className="flex items-center gap-3 group"
                whileHover={{ x: 10 }}
                transition={{ duration: 0.3 }}
              >
                <AiOutlineMessage className="text-green-400 group-hover:scale-125 transition-transform duration-300" size={24} />
                Sleman, Yogyakarta
              </motion.div>
            </div>

            <div className="mt-8 sm:mt-10">
              <h3 className="font-bold text-green-400 mb-4 text-lg sm:text-xl">Ikuti Saya:</h3>
              <div className="flex gap-4 sm:gap-6 flex-wrap">
                {socialLinks.map((link, idx) => (
                  <motion.a
                    key={idx}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-800/60 border-2 border-green-600/40 rounded-full p-3 text-green-400 hover:bg-gradient-to-r hover:from-green-500 hover:to-teal-400 hover:text-gray-900 transition-all duration-500"
                    aria-label={link.name}
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    data-aos="zoom-in"
                    data-aos-delay={idx * 100}
                  >
                    {link.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* CONTACT FORM */}
          <motion.div
            className="flex flex-col"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            data-aos="fade-left"
            data-aos-duration="1000"
          >
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-300 mb-4 sm:mb-6 tracking-tight">
              Kirim Pesan
            </h3>
            <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
              <motion.input
                type="text"
                name="name"
                placeholder="Nama Lengkap"
                value={formData.name}
                onChange={handleChange}
                disabled={isSubmitting}
                className="w-full px-5 py-4 bg-gray-800/60 border border-green-600/40 rounded-xl text-green-300 placeholder-green-400/50 focus:outline-none focus:border-green-500 focus:shadow-[0_0_15px_rgba(16,185,129,0.5)] transition-all duration-300"
                required
                whileFocus={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              />
              <motion.input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                disabled={isSubmitting}
                className="w-full px-5 py-4 bg-gray-800/60 border border-green-600/40 rounded-xl text-green-300 placeholder-green-400/50 focus:outline-none focus:border-green-500 focus:shadow-[0_0_15px_rgba(16,185,129,0.5)] transition-all duration-300"
                required
                whileFocus={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              />
              <motion.textarea
                name="message"
                placeholder="Pesan kamu..."
                value={formData.message}
                onChange={handleChange}
                disabled={isSubmitting}
                className="w-full px-5 py-4 h-32 sm:h-40 bg-gray-800/60 border border-green-600/40 rounded-xl text-green-300 placeholder-green-400/50 resize-none focus:outline-none focus:border-green-500 focus:shadow-[0_0_15px_rgba(16,185,129,0.5)] transition-all duration-300"
                required
                whileFocus={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              />
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-green-500 to-teal-400 text-gray-900 font-bold tracking-wide hover:shadow-[0_0_20px_rgba(16,185,129,0.5)] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                data-aos="fade-up"
                data-aos-duration="1200"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 mr-3 text-gray-900" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Mengirim...
                  </span>
                ) : (
                  "Kirim Pesan"
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>

        <style jsx>{`
          /* Particle Animations */
          .particle {
            position: absolute;
            background: rgba(16, 185, 129, 0.7);
            border-radius: 50%;
            animation: float linear infinite;
            box-shadow: 0 0 10px rgba(16, 185, 129, 0.5);
          }
          .particle-1 { width: 8px; height: 8px; top: 10%; left: 15%; animation-duration: 12s; }
          .particle-2 { width: 6px; height: 6px; top: 65%; left: 80%; animation-duration: 15s; }
          .particle-3 { width: 10px; height: 10px; top: 25%; left: 55%; animation-duration: 10s; }
          .particle-4 { width: 7px; height: 7px; top: 75%; left: 20%; animation-duration: 13s; }
          .particle-5 { width: 5px; height: 5px; top: 45%; left: 35%; animation-duration: 17s; }
          @keyframes float {
            0% { transform: translate(0, 0); opacity: 0.8; }
            50% { opacity: 0.3; }
            100% { transform: translate(80px, -80px); opacity: 0.8; }
          }

          /* Responsive Styles */
          @media (max-width: 640px) {
            .text-3xl { font-size: 1.75rem; }
            .text-sm { font-size: 0.75rem; }
            .px-4 { padding-left: 1rem; padding-right: 1rem; }
            .py-12 { padding-top: 2.5rem; padding-bottom: 2.5rem; }
            .gap-8 { gap: 1.5rem; }
            .max-w-7xl { max-width: 90%; }
            .h-32 { height: 8rem; }
          }
          @media (max-width: 768px) {
            .text-4xl { font-size: 2rem; }
            .text-base { font-size: 0.875rem; }
            .px-8 { padding-left: 1.5rem; padding-right: 1.5rem; }
          }
          @media (min-width: 1024px) {
            .text-5xl { font-size: 2.5rem; }
            .text-lg { font-size: 1.125rem; }
            .px-16 { padding-left: 3rem; padding-right: 3rem; }
          }
        `}</style>
      </footer>
    </>
  );
};

export default ContactFooter;