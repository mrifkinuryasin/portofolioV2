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
        title: "Live Demo Not Available",
        text: "Maaf, link live demo untuk proyek ini tidak tersedia.",
        confirmButtonText: "Mengerti",
        confirmButtonColor: "#10b981",
        background: "#1f2937",
        color: "#d1d5db",
        customClass: {
          popup: "rounded-xl shadow-2xl",
          title: "font-bold text-xl text-green-400",
          content: "text-sm text-green-400/90",
          confirmButton: "px-6 py-2 text-sm font-semibold rounded-lg bg-gradient-to-r from-green-500 to-teal-400 text-gray-900",
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
        title: "Details Not Available",
        text: "Maaf, detail untuk proyek ini tidak tersedia.",
        confirmButtonText: "Mengerti",
        confirmButtonColor: "#10b981",
        background: "#1f2937",
        color: "#d1d5db",
        customClass: {
          popup: "rounded-xl shadow-2xl",
          title: "font-bold text-xl text-green-400",
          content: "text-sm text-green-400/90",
          confirmButton: "px-6 py-2 text-sm font-semibold rounded-lg bg-gradient-to-r from-green-500 to-teal-400 text-gray-900",
        },
      });
    }
  };

  return (
    <motion.div
      className="relative w-full max-w-[300px] sm:max-w-[340px] mx-auto bg-gray-900/60 rounded-xl border border-green-600/30"
      whileHover={{ scale: 1.05, rotateY: 5 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      data-aos="fade-up"
      tabIndex={0}
      role="group"
      aria-label={`Proyek: ${Title}`}
    >
      {/* Image Section with Loading Effect */}
      <div className="relative overflow-hidden rounded-t-xl">
        {!isImageLoaded && (
          <div className="w-full h-40 sm:h-48 bg-gray-700/50 animate-pulse" />
        )}
        <img
          src={Img}
          alt={Title}
          className={`w-full h-40 sm:h-48 object-cover transition-all duration-500 ${isImageLoaded ? "opacity-100" : "opacity-0"}`}
          loading="lazy"
          onLoad={() => setIsImageLoaded(true)}
          onError={(e) => {
            console.error("Image failed to load, using fallback:", Img);
            e.currentTarget.src = "/fallback.png";
            setIsImageLoaded(true);
          }}
        />
        <div className="absolute inset-0 bg-green-600/10 transition-all duration-500 hover:bg-green-600/20 pointer-events-none" />
      </div>

      {/* Content Section */}
      <div className="p-4 sm:p-5 flex flex-col h-full">
        <h3 className="text-lg font-bold text-green-400 mb-1 line-clamp-1">
          {Title}
        </h3>
        <p className="text-xs text-green-400/90 leading-relaxed line-clamp-3 flex-grow">
          {Description}
        </p>

        {/* Buttons */}
        <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-3 mt-auto">
          {ProjectLink ? (
            <a
              href={ProjectLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleLiveDemo}
              className="relative flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-green-500 to-teal-400 text-gray-900 rounded-lg font-semibold text-xs hover:shadow-lg hover:shadow-green-500/50 transition-all duration-300 active:scale-95 w-full sm:w-auto"
              aria-label="Live Demo"
            >
              <motion.div
                className="absolute -left-4 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-green-500 to-teal-400 p-1.5 rounded-full"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              >
                <ExternalLink className="w-3 h-3 text-gray-900" />
              </motion.div>
              <span>Kunjungi</span>
            </a>
          ) : (
            <span className="text-green-400/70 font-medium text-xs bg-gray-800/50 px-4 py-2 rounded-lg w-full sm:w-auto text-center">
              Demo Not Available
            </span>
          )}

          {id ? (
            <Link
              to={`/project/${id}`}
              onClick={handleDetails}
              className="relative flex items-center gap-1.5 px-4 py-2 bg-gray-900/60 border border-green-600/30 text-green-400 rounded-lg font-semibold text-xs hover:bg-gradient-to-r hover:from-green-500 hover:to-teal-400 hover:text-gray-900 hover:shadow-lg hover:shadow-green-500/50 transition-all duration-300 active:scale-95 w-full sm:w-auto"
              aria-label="Project Details"
            >
              <motion.div
                className="absolute -left-4 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-green-500 to-teal-400 p-1.5 rounded-full"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              >
                <ArrowRight className="w-3 h-3 text-gray-900" />
              </motion.div>
              <span>Details</span>
            </Link>
          ) : (
            <span className="text-green-400/70 font-medium text-xs bg-gray-800/50 px-4 py-2 rounded-lg w-full sm:w-auto text-center">
              Details Not Available
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
          .max-w-\[300px\] {
            max-width: 100%;
          }
          .text-lg {
            font-size: 1rem;
          }
          .text-xs {
            font-size: 0.75rem;
          }
          .p-4 {
            padding: 1rem;
          }
          .h-40 {
            height: 8rem;
          }
        }
      `}</style>
    </motion.div>
  );
};

export default CardProject;