import React, { useState } from "react";
import {
  AiOutlineUser,
  AiOutlineMail,
  AiOutlineMessage,
  AiFillGithub,
  AiFillInstagram,
  AiFillLinkedin,
  AiFillYoutube,
} from "react-icons/ai";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";
import { db, collection, addDoc, serverTimestamp } from "../firebase";

const ContactFooter = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      background: "linear-gradient(135deg, #000000, #1a2a2a)",
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
        background: "linear-gradient(135deg, #000000, #1a2a2a)",
        color: "#d1d5db",
        timer: 2000,
        customClass: {
          popup: "rounded-xl border-2 border-green-600/50 shadow-[0_0_15px_rgba(16,185,129,0.5)]",
          title: "font-bold text-green-400 text-xl",
          content: "text-green-400/90",
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
        background: "linear-gradient(135deg, #000000, #1a2a2a)",
        color: "#d1d5db",
        customClass: {
          popup: "rounded-xl border-2 border-green-600/50 shadow-[0_0_15px_rgba(16,185,129,0.5)]",
          title: "font-bold text-green-400 text-xl",
          content: "text-green-400/90",
        },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    { icon: <AiFillGithub size={28} />, name: "GitHub", href: "https://github.com/mrifkinuryasin" },
    { icon: <AiFillInstagram size={28} />, name: "Instagram", href: "https://www.instagram.com/kikokhatake/" },
    { icon: <AiFillLinkedin size={28} />, name: "LinkedIn", href: "https://www.linkedin.com/in/muhammad-rifki-nuryasin-75272a24a/" },
    // { icon: <AiFillYoutube size={28} />, name: "YouTube", href: "https://youtube.com/@nugra21" },
  ];

  return (
    <>
      <Helmet>
        <title>Home M Rifki | Portfolio | By " RF "  </title>
        <meta name="description" content="Hubungi Ludang Prasetyo Nugroho untuk kolaborasi, pertanyaan, atau sekadar berbagi ide!" />
        <meta name="keywords" content="Ludang Prasetyo, Rifki, Contact, Kontak, Web Developer, IoT, UI/UX" />
        <meta property="og:title" content="Contact – Rifki" />
        <meta property="og:description" content="Hubungi Ludang Prasetyo Nugroho untuk kolaborasi, pertanyaan, atau sekadar berbagi ide!" />
        <meta property="og:url" content="https://rifki.my.id/contact" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://rifki.my.id/contact" />
      </Helmet>

      <footer
        id="contact"
        className="bg-black mt-16 sm:mt-20 px-4 sm:px-8 lg:px-16 py-12 sm:py-16 relative overflow-hidden"
      >
        {/* Background Particles */}
        <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
          <div className="particle particle-1"></div>
          <div className="particle particle-2"></div>
          <div className="particle particle-3"></div>
          <div className="particle particle-4"></div>
          <div className="particle particle-5"></div>
          <div className="particle particle-6"></div>
          <div className="particle particle-7"></div>
          <div className="particle particle-8"></div>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 relative z-10">
          {/* ABOUT SECTION */}
          <div className="flex flex-col animate-fade-in">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-green-400 mb-4 sm:mb-6 tracking-tight" style={{ textShadow: "0 0 20px rgba(16, 185, 129, 0.6)" }}>
              Hubungi Rifki
            </h2>
            <p className="text-gray-200 mb-6 sm:mb-8 text-sm sm:text-base md:text-lg leading-relaxed font-futuristic" style={{ textShadow: "0 0 8px rgba(16, 185, 129, 0.3)" }}>

            </p>
            <div className="space-y-3 sm:space-y-4 text-gray-200 text-sm sm:text-base font-medium">
              <div className="flex items-center gap-3 group animate-fade-in">
                <AiOutlineUser className="text-green-400 group-hover:scale-125 transition-transform duration-300 animate-pulse-subtle" size={20} />
                Muhammad Rifki nuryasin
              </div>
              <div className="flex items-center gap-3 group animate-fade-in">
                <AiOutlineMail className="text-green-400 group-hover:scale-125 transition-transform duration-300 animate-pulse-subtle" size={20} />
                muhammad.rifki@students.utdi.ac.id
              </div>
              <div className="flex items-center gap-3 group animate-fade-in">
                <AiOutlineMessage className="text-green-400 group-hover:scale-125 transition-transform duration-300 animate-pulse-subtle" size={20} />
                Sleman, Yogyakarta
              </div>
            </div>

            <div className="mt-6 sm:mt-8 animate-fade-in">
              <h3 className="font-bold text-green-400 mb-3 sm:mb-4 text-base sm:text-lg" style={{ textShadow: "0 0 15px rgba(16, 185, 129, 0.5)" }}>
                Ikuti Saya:
              </h3>
              <div className="flex gap-3 sm:gap-4 flex-wrap">
                {socialLinks.map((link, idx) => (
                  <a
                    key={idx}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon bg-black border-2 border-green-600/50 rounded-full p-2 sm:p-3 text-green-400 hover:text-teal-400 hover:rotate-360 transition-all duration-500"
                    aria-label={link.name}
                    style={{ boxShadow: "0 0 12px rgba(16, 185, 129, 0.4)" }}
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* CONTACT FORM */}
          <div className="flex flex-col animate-fade-in">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-400 mb-4 sm:mb-6 tracking-tight" style={{ textShadow: "0 0 20px rgba(16, 185, 129, 0.6)" }}>
              Kirim Pesan
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              <input
                type="text"
                name="name"
                placeholder="Nama Lengkap"
                value={formData.name}
                onChange={handleChange}
                disabled={isSubmitting}
                className="w-full px-4 sm:px-5 py-3 sm:py-4 bg-black border-2 border-gradient-to-r from-green-500 to-teal-400 rounded-xl text-gray-200 placeholder-gray-400 focus:outline-none focus:shadow-[0_0_15px_#10b981] hover:scale-102 transition-all duration-300"
                style={{ boxShadow: "0 0 10px rgba(16, 185, 129, 0.5)" }}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                disabled={isSubmitting}
                className="w-full px-4 sm:px-5 py-3 sm:py-4 bg-black border-2 border-gradient-to-r from-green-500 to-teal-400 rounded-xl text-gray-200 placeholder-gray-400 focus:outline-none focus:shadow-[0_0_15px_#10b981] hover:scale-102 transition-all duration-300"
                style={{ boxShadow: "0 0 10px rgba(16, 185, 129, 0.5)" }}
                required
              />
              <textarea
                name="message"
                placeholder="Pesan kamu..."
                value={formData.message}
                onChange={handleChange}
                disabled={isSubmitting}
                className="w-full px-4 sm:px-5 py-3 sm:py-4 h-28 sm:h-32 bg-black border-2 border-gradient-to-r from-green-500 to-teal-400 rounded-xl text-gray-200 placeholder-gray-400 resize-none focus:outline-none focus:shadow-[0_0_15px_#10b981] hover:scale-102 transition-all duration-300"
                style={{ boxShadow: "0 0 10px rgba(16, 185, 129, 0.5)" }}
                required
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 sm:py-4 rounded-xl bg-gradient-to-r from-green-500 to-teal-400 text-gray-900 font-bold tracking-wide hover:shadow-[0_0_20px_#10b981] hover:scale-105 active:scale-95 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 animate-pulse-subtle"
                style={{ boxShadow: "0 0 15px rgba(16, 185, 129, 0.6)" }}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 mr-2 text-gray-900" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Mengirim...
                  </span>
                ) : (
                  "Kirim Pesan"
                )}
              </button>
            </form>
          </div>
        </div>

        <style jsx>{`
          /* Font Futuristic */
          .font-futuristic {
            font-family: 'Orbitron', 'Roboto', sans-serif;
            letter-spacing: 0.05em;
          }

          /* Particle Animations */
          .particle {
            position: absolute;
            background: rgba(16, 185, 129, 0.7);
            border-radius: 50%;
            animation: float linear infinite;
            box-shadow: 0 0 10px rgba(16, 185, 129, 0.5);
          }
          .particle-1 { width: 8px; height: 8px; top: 10%; left: 15%; animation-duration: 9s; }
          .particle-2 { width: 6px; height: 6px; top: 65%; left: 80%; animation-duration: 13s; }
          .particle-3 { width: 10px; height: 10px; top: 25%; left: 55%; animation-duration: 11s; }
          .particle-4 { width: 7px; height: 7px; top: 75%; left: 20%; animation-duration: 15s; }
          .particle-5 { width: 5px; height: 5px; top: 45%; left: 35%; animation-duration: 17s; }
          .particle-6 { width: 9px; height: 9px; top: 15%; left: 70%; animation-duration: 10s; }
          .particle-7 { width: 6px; height: 6px; top: 85%; left: 45%; animation-duration: 14s; }
          .particle-8 { width: 8px; height: 8px; top: 35%; left: 90%; animation-duration: 12s; }
          @keyframes float {
            0% { transform: translate(0, 0); opacity: 0.8; }
            50% { opacity: 0.3; }
            100% { transform: translate(100px, -100px); opacity: 0.8; }
          }

          /* Fade-In Animation */
          .animate-fade-in {
            animation: fadeIn 1s ease-out forwards;
          }
          @keyframes fadeIn {
            0% { opacity: 0; }
            100% { opacity: 1; }
          }

          /* Subtle Pulse Animation */
          .animate-pulse-subtle {
            animation: pulse-subtle 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          }
          @keyframes pulse-subtle {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.7; }
          }

          /* Gradient Border */
          .border-gradient-to-r {
            border-image: linear-gradient(to right, #10b981, #2dd4bf) 1;
            border-image-slice: 1;
          }

          /* Responsive Styles */
          @media (max-width: 640px) {
            .text-2xl {
              font-size: 1.5rem;
            }
            .text-sm {
              font-size: 0.75rem;
            }
            .px-4 {
              padding-left: 1rem;
              padding-right: 1rem;
            }
            .py-3 {
              padding-top: 0.75rem;
              padding-bottom: 0.75rem;
            }
            .gap-8 {
              gap: 1.5rem;
            }
            .max-w-7xl {
              max-width: 90%;
            }
            .h-28 {
              height: 6rem;
            }
          }
          @media (max-width: 768px) {
            .text-3xl {
              font-size: 2rem;
            }
            .text-base {
              font-size: 0.875rem;
            }
            .px-8 {
              padding-left: 2rem;
              padding-right: 2rem;
            }
          }
          @media (min-width: 1024px) {
            .text-4xl {
              font-size: 2.25rem;
            }
            .text-lg {
              font-size: 1.125rem;
            }
            .px-16 {
              padding-left: 4rem;
              padding-right: 4rem;
            }
          }
        `}</style>
      </footer>
    </>
  );
};

export default ContactFooter;