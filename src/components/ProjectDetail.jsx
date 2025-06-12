import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft, ExternalLink, Github, Code2, ChevronRight, Layers,
} from "lucide-react";
import Swal from "sweetalert2";
import data from "../data/data.json";

// Map icon strings to components
const iconMap = {
  ArrowLeft: ArrowLeft,
  ExternalLink: ExternalLink,
  Github: Github,
  Code2: Code2,
  ChevronRight: ChevronRight,
  Layers: Layers,
};

const TECH_ICONS = {
  React: Code2,
  Tailwind: Code2,
  Express: Code2,
  Python: Code2,
  Javascript: Code2,
  HTML: Code2,
  CSS: Code2,
  default: Code2,
};

const TechBadge = ({ tech }) => {
  const Icon = TECH_ICONS[tech] || TECH_ICONS["default"];
  return (
    <motion.div
      className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-transparent border border-green-600/30 rounded-full text-green-400/90 font-semibold text-xs sm:text-sm transition-all duration-300 hover:bg-green-600/20 hover:shadow-[0_4px_12px_rgba(16,185,129,0.3)]"
      whileHover={{ scale: 1.1, rotateY: 5 }}
      whileTap={{ scale: 0.95 }}
      data-aos="fade-up"
      data-aos-delay={Math.floor(Math.random() * 200)}
    >
      <Icon className="w-4 sm:w-5 h-4 sm:h-5 text-green-400" />
      <span>{tech}</span>
    </motion.div>
  );
};

const ProjectStats = ({ project }) => {
  const techStackCount = project?.TechStack?.length || 0;
  const featuresCount = project?.Features?.length || 0;

  return (
    <motion.div
      className="flex gap-6 sm:gap-8 p-4 sm:p-5 bg-transparent border border-green-600/30 rounded-xl w-full max-w-[280px] sm:max-w-sm mx-auto sm:mx-0 shadow-[0_2px_8px_rgba(16,185,129,0.2)]"
      whileHover={{ scale: 1.05, rotateY: 5, boxShadow: "0 6px 16px rgba(16,185,129,0.4)" }}
      transition={{ duration: 0.3 }}
      data-aos="fade-up"
    >
      <div className="flex flex-col items-center">
        <Code2 className="text-green-400 w-6 sm:w-7 h-6 sm:h-7 mb-1.5" />
        <span className="font-bold text-green-400 text-lg sm:text-xl">{techStackCount}</span>
        <span className="text-xs sm:text-sm text-green-400/70">Tech</span>
      </div>
      <div className="flex flex-col items-center">
        <Layers className="text-green-400 w-6 sm:w-7 h-6 sm:h-7 mb-1.5" />
        <span className="font-bold text-green-400 text-lg sm:text-xl">{featuresCount}</span>
        <span className="text-xs sm:text-sm text-green-400/70">Features</span>
      </div>
    </motion.div>
  );
};

const handleGithubClick = (githubLink) => {
  if (githubLink === "Private") {
    Swal.fire({
      icon: "info",
      title: "Source Code Private",
      text: "Maaf, source code untuk proyek ini bersifat privat.",
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
    return false;
  }
  return true;
};

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const selectedProject = data.projects.find((p) => String(p.id) === id);

    if (selectedProject) {
      const enhancedProject = {
        ...selectedProject,
        Features: selectedProject.Features || [],
        TechStack: selectedProject.TechStack || [],
        Github: selectedProject.Github || "https://github.com/nugraa21",
      };
      setProject(enhancedProject);
    }
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4 animate-pulse">
          <div className="w-12 h-12 mx-auto border-4 border-green-600/30 border-t-green-400 rounded-full animate-spin" />
          <h2 className="text-base sm:text-lg font-semibold text-green-400">Loading...</h2>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen px-2 sm:px-6 lg:px-12 py-16 sm:py-24 relative overflow-hidden bg-transparent">
      <div className="max-w-7xl w-full mx-auto bg-transparent rounded-2xl border border-green-600/30 p-6 sm:p-10 shadow-[0_4px_16px_rgba(16,185,129,0.2)] relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.1),transparent_70%)] pointer-events-none" />

        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 sm:mb-12 gap-4 sm:gap-0">
          <motion.button
            onClick={() => navigate(-1)}
            className="relative flex items-center gap-2 px-5 sm:px-6 py-2.5 bg-transparent border border-green-600/30 text-green-400 rounded-xl font-semibold text-sm sm:text-base hover:bg-gradient-to-r hover:from-green-500 hover:to-teal-400 hover:text-gray-900 hover:shadow-[0_6px_16px_rgba(16,185,129,0.4)] transition-all duration-300 active:scale-95"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            data-aos="fade-up"
            aria-label="Back to Portfolio"
          >
            <motion.div
              className="absolute -left-4 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-green-500 to-teal-400 p-1.5 rounded-full"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            >
              <ArrowLeft className="w-3 h-3 text-gray-900" />
            </motion.div>
            <span>Back</span>
          </motion.button>
          <motion.div
            className="text-sm sm:text-base text-green-400/90 flex items-center gap-2 truncate max-w-[200px] sm:max-w-[280px]"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            data-aos="fade-up"
          >
            <span>Projects</span>
            <ChevronRight className="w-4 sm:w-5 h-4 sm:h-5" />
            <span className="font-bold text-green-400 truncate">{project.Title}</span>
          </motion.div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16">
          {/* Left Content */}
          <div className="flex flex-col gap-8 sm:gap-10">
            <motion.h1
              className="text-3xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-teal-400 tracking-tight"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              data-aos="zoom-in-up"
            >
              {project.Title}
            </motion.h1>
            <ProjectStats project={project} />
            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <a
                href={project.Link}
                target="_blank"
                rel="noopener noreferrer"
                className="relative flex items-center gap-2 px-5 sm:px-6 py-2.5 bg-gradient-to-r from-green-500 to-teal-400 text-gray-900 rounded-xl font-semibold text-sm sm:text-base hover:shadow-[0_6px_16px_rgba(16,185,129,0.4)] transition-all duration-300 active:scale-95"
                aria-label="Live Demo"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                <motion.div
                  className="absolute -left-4 top-1/2 transform -translate-y-1/2 bg-gray-900 p-1.5 rounded-full"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                >
                  <ExternalLink className="w-3 h-3 text-green-400" />
                </motion.div>
                Kunjungi
              </a>
              <a
                href={project.Github}
                target="_blank"
                rel="noopener noreferrer"
                className="relative flex items-center gap-2 px-5 sm:px-6 py-2.5 bg-transparent border border-green-600/30 text-green-400 rounded-xl font-semibold text-sm sm:text-base hover:bg-gradient-to-r hover:from-green-500 hover:to-teal-400 hover:text-gray-900 hover:shadow-[0_6px_16px_rgba(16,185,129,0.4)] transition-all duration-300 active:scale-95"
                onClick={(e) => !handleGithubClick(project.Github) && e.preventDefault()}
                aria-label="Github Repository"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <motion.div
                  className="absolute -left-4 top-1/2 transform -translate-y-1/2 bg-gray-900 p-1.5 rounded-full"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                >
                  <Github className="w-3 h-3 text-green-400" />
                </motion.div>
                Github
              </a>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h3 className="text-xl sm:text-2xl font-semibold text-green-400 mb-5 flex items-center gap-2.5">
                <Code2 className="w-6 sm:w-7 h-6 sm:h-7" />
                Technologies Used
              </h3>
              {project.TechStack.length > 0 ? (
                <div className="flex flex-wrap gap-3 sm:gap-4">
                  {project.TechStack.map((tech, i) => (
                    <TechBadge key={i} tech={tech} />
                  ))}
                </div>
              ) : (
                <p className="text-green-400/70 italic text-sm sm:text-base">No technologies added.</p>
              )}
            </motion.div>
          </div>

          {/* Right Content */}
          <div className="flex flex-col gap-8 sm:gap-10">
            <motion.div
              className="relative rounded-2xl overflow-hidden border border-green-600/30 shadow-[0_4px_16px_rgba(16,185,129,0.2)]"
              whileHover={{ scale: 1.05, rotateY: 5, boxShadow: "0 8px 24px rgba(16,185,129,0.4)" }}
              transition={{ duration: 0.3 }}
              data-aos="fade-up"
            >
              <img
                src={project.Img}
                alt={project.Title}
                className="w-full aspect-[16/9] object-cover transition-transform duration-700"
                loading="lazy"
                onError={(e) => (e.currentTarget.src = "/fallback.png")}
              />
              <div className="absolute inset-0 bg-green-600/10 transition-all duration-500 hover:bg-green-600/20 pointer-events-none" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <h3 className="text-xl sm:text-2xl font-semibold text-green-400 mb-5 flex items-center gap-2.5">
                <Code2 className="w-6 sm:w-7 h-6 sm:h-7" />
                Description
              </h3>
              <p className="text-sm sm:text-base text-green-400/90 leading-relaxed tracking-wide">
                {project.Description || "No description available."}
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .animate-slide-in-up {
          animation: slideInUp 0.6s ease-out;
        }
        @keyframes slideInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 640px) {
          .text-3xl {
            font-size: 1.75rem;
          }
          .text-5xl {
            font-size: 2.25rem;
          }
          .text-sm {
            font-size: 0.875rem;
          }
          .px-2 {
            padding-left: 0.5rem;
            padding-right: 0.5rem;
          }
          .py-2\.5 {
            padding-top: 0.5rem;
            padding-bottom: 0.5rem;
          }
          .max-w-\[200px\] {
            max-width: 140px;
          }
        }
      `}</style>
    </section>
  );
};

export default ProjectDetails;