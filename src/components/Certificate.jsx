import React, { useState } from "react";
import { Modal, IconButton, Box, Typography, Backdrop } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import { motion } from "framer-motion";

const Certificate = ({ ImgSertif, title, description, issuer, date }) => {
  const [open, setOpen] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box component="div" className="w-full max-w-[300px] sm:max-w-[340px] mx-auto">
      {/* Thumbnail Container */}
      <motion.div
        className="relative w-full bg-gray-900/60 rounded-xl border border-green-600/30"
        whileHover={{ scale: 1.05, rotateY: 5 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        data-aos="fade-up"
        tabIndex={0}
        role="group"
        aria-label={`Sertifikat: ${title}`}
      >
        {/* Certificate Image with Loading Effect */}
        <div className="relative overflow-hidden rounded-t-xl">
          {!isImageLoaded && (
            <div className="w-full h-40 sm:h-48 bg-gray-700/50 animate-pulse" />
          )}
          <img
            src={ImgSertif}
            alt={title || "Certificate"}
            className={`w-full h-40 sm:h-48 object-cover transition-all duration-500 ${
              isImageLoaded ? "opacity-100" : "opacity-0"
            }`}
            loading="lazy"
            onLoad={() => setIsImageLoaded(true)}
            onError={(e) => {
              console.error(`Failed to load image: ${ImgSertif}`);
              e.target.src = "/fallback.png";
              setIsImageLoaded(true);
            }}
          />
          <div
            className="absolute inset-0 bg-green-600/10 transition-all duration-500 hover:bg-green-600/20 cursor-pointer"
            onClick={handleOpen}
          >
            <motion.div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center opacity-0 transition-all duration-300 hover:opacity-100"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
            >
              <FullscreenIcon className="w-6 h-6 sm:w-9 sm:h-9 text-green-400 mb-1" />
              <span className="text-green-400 font-semibold text-xs sm:text-sm">
                Lihat Sertifikat
              </span>
            </motion.div>
          </div>
        </div>

        {/* Certificate Information */}
        <div className="p-4 sm:p-5 flex flex-col h-full">
          <Typography
            variant="h6"
            className="text-lg font-bold text-green-400 mb-1 line-clamp-1"
          >
            {title || "Certificate"}
          </Typography>
          <Typography
            variant="body2"
            className="text-xs text-green-400/90 leading-relaxed line-clamp-3 flex-grow"
          >
            {description || "No description available"}
          </Typography>
          <Typography
            variant="caption"
            className="text-xs text-green-400/70 mt-2"
          >
            Issuer: {issuer || "Unknown"} | Date: {date || "Unknown"}
          </Typography>

          {/* View Button */}
          <div className="pt-3 flex justify-center mt-auto">
            <button
              onClick={handleOpen}
              className="relative flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-green-500 to-teal-400 text-gray-900 rounded-lg font-semibold text-xs hover:shadow-lg hover:shadow-green-500/50 transition-all duration-300 active:scale-95 w-full sm:w-auto"
              aria-label="View Certificate"
            >
              <motion.div
                className="absolute -left-4 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-green-500 to-teal-400 p-1.5 rounded-full"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              >
                <FullscreenIcon className="w-3 h-3 text-gray-900" />
              </motion.div>
              <span>Lihat</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 300,
          sx: {
            backgroundColor: "rgba(0,0,0,0.8)",
            backdropFilter: "blur(5px)",
          },
        }}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: { xs: 1, sm: 2 },
        }}
      >
        <Box
          className="relative bg-gray-900/80 rounded-xl border border-green-600/30"
          sx={{
            width: { xs: "90vw", sm: "80vw", md: "70vw", lg: "60vw" },
            maxWidth: 800,
            maxHeight: "90vh",
            overflowY: "auto",
            p: { xs: 1.5, sm: 2, md: 3 },
          }}
        >
          {/* Close Button */}
          <IconButton
            onClick={handleClose}
            aria-label="Close certificate modal"
            sx={{
              position: "absolute",
              right: { xs: 8, sm: 12 },
              top: { xs: 8, sm: 12 },
              color: "text-green-400",
              bgcolor: "rgba(0,0,0,0.1)",
              p: { xs: 0.5, sm: 0.75 },
              "&:hover": {
                bgcolor: "rgba(0,0,0,0.2)",
              },
            }}
          >
            <CloseIcon sx={{ fontSize: { xs: 18, sm: 22 }, color: "#10b981" }} />
          </IconButton>

          {/* Certificate Image */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mb: { xs: 1.5, sm: 2 },
              maxHeight: { xs: "50vh", sm: "55vh", md: "60vh" },
              overflow: "hidden",
            }}
          >
            <img
              src={ImgSertif}
              alt={title || "Certificate Full View"}
              className="w-full h-auto max-h-full object-contain"
              onError={(e) => {
                console.error(`Failed to load modal image: ${ImgSertif}`);
                e.target.src = "/fallback.png";
              }}
            />
          </Box>

          {/* Certificate Details */}
          <Box className="text-center">
            <Typography
              variant="h6"
              className="text-lg sm:text-xl font-bold text-green-400 mb-1"
            >
              {title || "Certificate"}
            </Typography>
            <Typography
              variant="body2"
              className="text-xs sm:text-sm text-green-400/90 mb-1"
            >
              {description || "No description available"}
            </Typography>
            <Typography
              variant="caption"
              className="text-xs text-green-400/70"
            >
              Issuer: {issuer || "Unknown"} | Date: {date || "Unknown"}
            </Typography>
          </Box>
        </Box>
      </Modal>

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
    </Box>
  );
};

export default Certificate;