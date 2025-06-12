import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ExternalLink, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

const CardProject = ({ Img, Title, Description, Link: ProjectLink, id }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleLiveDemo = (e) => {
    e.stopPropagation();
    if (!ProjectLink) {
      e.preventDefault();
      Swal.fire({
        icon: "info",
        title: "Live Demo Tidak Tersedia",
        text: "Maaf, link live demo untuk proyek ini tidak tersedia.",
        confirmButtonText: "Mengerti",
        confirmButtonColor: "#10b981",
        background: "linear-gradient(135deg, #111827, #1f2937)",
        color: "#d1d5db",
        customClass: {
          popup: "rounded-xl border-2 border-green-600/50 shadow-[0_0_15px_rgba(16,185,129,0.5)]",
          title: "font-bold text-xl text-green-400",
          content: "text-sm text-green-300/90",
          confirmButton: "px-6 py-2 text-sm font-semibold rounded-lg bg-gradient-to-r from-green-500 to-teal-400 text-gray-900 hover:shadow-[0_0_20px_#10b981]",
        },
      });
    }
  };

  const handleDetails = (e) => {
    e.stopPropagation();
    if (!id) {
      e.preventDefault();
      Swal.fire({
        icon: "info",
        title: "Detail Tidak Tersedia",
        text: "Maaf, detail untuk proyek ini tidak tersedia.",
        confirmButtonText: "Mengerti",
        confirmButtonColor: "#10b981",
        background: "linear-gradient(135deg, #111827, #1f2937)",
        color: "#d1d5db",
        customClass: {
          popup: "rounded-xl border-2 border-green-600/50 shadow-[0_0_15px_rgba(16,185,129,0.5)]",
          title: "font-bold text-xl text-green-400",
          content: "text-sm text-green-300/90",
          confirmButton: "px-6 py-2 text-sm font-semibold rounded-lg bg-gradient-to-r from-green-500 to-teal-400 text-gray-900 hover:shadow-[0_0_20px_#10b981]",
        },
      });
    }
  };

  return (
    <motion.div
      className="relative w-full max-w-[320px] sm:max-w-[360px] mx-auto bg-gray-900/60 rounded-2xl border border-green-600/40 backdrop-blur-sm shadow-lg overflow-hidden"
      whileHover={{ scale: 1.05, rotateY: 3, boxShadow: "0 10px 24px rgba(16, 185, 129, 0.5)" }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      data-aos="fade-up"
      data-aos-duration="800"
      tabIndex={0}
      role="group"
      aria-label={`Proyek: ${Title}`}
    >
      {/* Image Section with Loading Effect */}
      <div className="relative overflow-hidden rounded-t-2xl">
        {!isImageLoaded && (
          <div className="w-full h-48 sm:h-56 bg-gray-800/50 animate-pulse rounded-t-2xl" />
        )}
        <img
          src={Img}
          alt={Title}
          className={`w-full h-48 sm:h-56 object-cover transition-all duration-500 ${isImageLoaded ? "opacity-100" : "opacity-0"}`}
          loading="lazy"
          onLoad={() => setIsImageLoaded(true)}
          onError={(e) => {
            console.error("Image failed to load, using fallback:", Img);
            e.currentTarget.src = "/fallback.png";
            setIsImageLoaded(true);
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </div>

      {/* Content Section */}
      <div className="p-5 sm:p-6 flex flex-col h-full">
        <h3 className="text-lg sm:text-xl font-bold text-green-300 mb-2 line-clamp-1">
          {Title}
        </h3>
        <p className="text-sm text-green-300/80 leading-relaxed line-clamp-3 flex-grow">
          {Description}
        </p>

        {/* Buttons */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 mt-auto">
          {ProjectLink ? (
            <motion.a
              href={ProjectLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleLiveDemo}
              className="relative flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-green-500 to-teal-400 text-gray-900 rounded-lg font-semibold text-sm hover:shadow-[0_8px_20px_rgba(16,185,129,0.5)] transition-all duration-300 w-full sm:w-auto"
              aria-label="Live Demo"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute -left-4 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-green-500 to-teal-400 p-1.5 rounded-full"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              >
                <ExternalLink className="w-4 h-4 text-gray-900" />
              </motion.div>
              Kunjungi
            </motion.a>
          ) : (
            <span className="text-green-300/70 font-medium text-sm bg-gray-800/50 px-5 py-2.5 rounded-lg w-full sm:w-auto text-center">
              Demo Tidak Tersedia
            </span>
          )}

          {id ? (
            <motion.div
              className="relative flex items-center gap-2 px-5 py-2.5 bg-gray-900/60 border border-green-600/40 text-green-300 rounded-lg font-semibold text-sm hover:bg-gradient-to-r hover:from-green-500 hover:to-teal-400 hover:text-gray-900 hover:shadow-[0_8px_20px_rgba(16,185,129,0.5)] transition-all duration-300 w-full sm:w-auto"
              aria-label="Project Details"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute -left-4 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-green-500 to-teal-400 p-1.5 rounded-full"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              >
                <ArrowRight className="w-4 h-4 text-gray-900" />
              </motion.div>
              <Link
                to={`/project/${id}`}
                onClick={handleDetails}
                className="w-full"
                aria-label="Project Details"
              >
                Details
              </Link>
            </motion.div>
          ) : (
            <span className="text-green-300/70 font-medium text-sm bg-gray-800/50 px-5 py-2.5 rounded-lg w-full sm:w-auto text-center">
              Detail Tidak Tersedia
            </span>
          )}
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
          .max-w-\[320px\] {
            max-width: 100%;
          }
          .text-lg {
            font-size: 1rem;
          }
          .text-sm {
            font-size: 0.75rem;
          }
          .p-5 {
            padding: 1rem;
          }
          .h-48 {
            height: 10rem;
          }
        }
      `}</style>
    </motion.div>
  );
};

export default CardProject;