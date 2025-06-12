import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import AOS from "aos";
import "aos/dist/aos.css";
import { Code, Award, Box } from "lucide-react";
import CardProject from "../components/CardProject";
import Certificate from "../components/Certificate";
import TechStackIcon from "../components/TechStackIcon";
import data from "../data/data.json";

// Map icon strings to components
const iconMap = {
  Code: Code,
  Award: Award,
  Box: Box,
};

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <div className="p-4 sm:p-6 md:p-8">{children}</div>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `tab-${index}`,
    "aria-controls": `tabpanel-${index}`,
  };
}

const techStacks = {
  Code: [
    // { icon: "material-icon-theme--dart.svg", language: "Dart" },
    { icon: "html.svg", language: "HTML" },
    { icon: "css.svg", language: "CSS" },
    { icon: "javascript.svg", language: "JavaScript" },
    // { icon: "devicon--latex.svg", language: "LaTeX" },
    { icon: "material-icon-theme--python.svg", language: "Python" },
    { icon: "reactjs.svg", language: "ReactJS" },
    // { icon: "logos--vue.svg", language: "Vue" },
    { icon: "devicon--php.svg", language: "PHP" },
  ],
  Programs: [
    { icon: "devicon--flutter.svg", language: "Flutter" },
    { icon: "nodejs.svg", language: "Node JS" },
  ],
  Tools: [
    { icon: "logos--github-icon.svg", language: "GitHub" },
    { icon: "vercel.svg", language: "Vercel" },
    { icon: "devicon--firebase.svg", language: "Firebase" },
  ],
  // Software: [
  //   { icon: "logos--adobe-illustrator.svg", language: "Adobe Illustrator" },
  //   { icon: "logos--adobe-premiere.svg", language: "Adobe Premiere Pro" },
  // ],
};

const Portfolio = () => {
  const [value, setValue] = useState(0);
  const [techStackValue, setTechStackValue] = useState(0);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [showAllCertificates, setShowAllCertificates] = useState(false);
  const [showAllTechStacks, setShowAllTechStacks] = useState(false);
  const [projects, setProjects] = useState([]);
  const [certificates, setCertificates] = useState([]);

  useEffect(() => {
    AOS.init({ once: false, duration: 600, easing: "ease-in-out" });
    setProjects(data.projects || []);
    setCertificates(data.certificates || []);
    localStorage.setItem("projects", JSON.stringify(data.projects || []));
    localStorage.setItem("certificates", JSON.stringify(data.certificates || []));
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue !== 2) setTechStackValue(0);
  };

  const handleTechStackChange = (event, newValue) => {
    if (!showAllTechStacks) setTechStackValue(newValue);
  };

  const filteredProjects = showAllProjects ? projects : projects.slice(0, 6);

  return (
    <section
      className="px-4 sm:px-6 lg:px-8 py-12 scroll-mt-24 relative overflow-hidden"
      id="Portofolio"
    >
      {/* <Helmet>
        <title>Portfolio – Nugra.my.id</title>
        <meta
          name="description"
          content="Explore Ludang Prasetyo Nugroho's projects, certifications, and tech skills."
        />
        <meta
          name="keywords"
          content="Ludang Prasetyo, Nugra21, Portfolio, Projects, Certifications, Tech Stack"
        />
        <meta property="og:title" content="Portfolio – Nugra.my.id" />
        <meta
          property="og:description"
          content="Explore Ludang Prasetyo Nugroho's projects, certifications, and tech skills."
        />
        <meta property="og:url" content="https://nugra.my.id/portfolio" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://nugra.my.id/portfolio" />
      </Helmet> */}

      {/* Header */}
      <div className="text-center mb-8 relative z-10">
        <motion.h2
          className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-teal-400"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          data-aos="zoom-in-up"
          data-aos-duration="600"
        >
          Portfolio
        </motion.h2>
        <p
          className="mt-2 text-green-400 max-w-md mx-auto text-base sm:text-lg flex items-center justify-center gap-2 font-semibold"
          data-aos="zoom-in-up"
          data-aos-duration="800"
        >
          Discover my projects, certifications, and technical expertise.
        </p>
      </div>

      {/* Navigation */}
      <motion.nav
        className="relative flex justify-center gap-4 mb-8 bg-gray-900/60 rounded-xl border border-green-600/30 p-3 backdrop-blur-md max-w-3xl mx-auto"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {[
          { label: "Projects", icon: "Code" },
          { label: "Certificates", icon: "Award" },
          { label: "Tech Stack", icon: "Box" },
        ].map((tab, index) => {
          const Icon = iconMap[tab.icon];
          return (
            <motion.button
              key={tab.label}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm sm:text-base font-medium ${
                value === index
                  ? "bg-gradient-to-r from-green-500 to-teal-400 text-gray-900"
                  : "text-green-400 hover:bg-gray-800/50"
              } transition-all duration-300`}
              onClick={() => handleChange(null, index)}
              whileHover={{ scale: 1.05, rotateY: 5 }}
              whileTap={{ scale: 0.95 }}
              {...a11yProps(index)}
              aria-label={`Switch to ${tab.label} tab`}
            >
              <motion.div
                animate={{ rotate: value === index ? [0, 360] : 0 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              >
                <Icon className="w-5 h-5" />
              </motion.div>
              {tab.label}
            </motion.button>
          );
        })}
      </motion.nav>

      {/* Projects Tab */}
      <TabPanel value={value} index={0}>
        <div className="flex justify-center mb-6">
          <motion.button
            onClick={() => setShowAllProjects(!showAllProjects)}
            className="relative px-6 py-2 bg-gradient-to-r from-green-500 to-teal-400 text-gray-900 rounded-lg font-semibold transition-all duration-300"
            whileHover={{ scale: 1.05, boxShadow: "0 4px 12px rgba(45, 212, 191, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            data-aos="fade-up"
            data-aos-delay="200"
            aria-label={showAllProjects ? "Hide projects" : "Show all projects"}
          >
            {showAllProjects ? "Hide" : `Show All (${filteredProjects.length})`}
            <motion.div
              className="absolute -left-4 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-green-500 to-teal-400 p-1.5 rounded-full"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            >
              <Code className="w-3 h-3 text-gray-900" />
            </motion.div>
          </motion.button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {filteredProjects.map((project, i) => (
            <div key={project.id} data-aos="fade-up" data-aos-delay={i * 100}>
              <CardProject
                Img={project.Img}
                Title={project.Title}
                Description={project.Description}
                Link={project.Link}
                id={project.id}
              />
            </div>
          ))}
        </div>
      </TabPanel>

      {/* Certificates Tab */}
      <TabPanel value={value} index={1}>
        <div className="flex justify-center mb-6">
          <motion.button
            onClick={() => setShowAllCertificates(!showAllCertificates)}
            className="relative px-6 py-2 bg-gradient-to-r from-green-500 to-teal-400 text-gray-900 rounded-lg font-semibold transition-all duration-300"
            whileHover={{ scale: 1.05, boxShadow: "0 4px 12px rgba(45, 212, 191, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            data-aos="fade-up"
            data-aos-delay="200"
            aria-label={showAllCertificates ? "Hide certificates" : "Show all certificates"}
          >
            {showAllCertificates ? "Hide" : `Show All (${certificates.length})`}
            <motion.div
              className="absolute -left-4 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-green-500 to-teal-400 p-1.5 rounded-full"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            >
              <Award className="w-3 h-3 text-gray-900" />
            </motion.div>
          </motion.button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {(showAllCertificates ? certificates : certificates.slice(0, 6)).map((certificate, i) => (
            <div key={i} data-aos="fade-up" data-aos-delay={i * 100}>
              <Certificate
                ImgSertif={certificate.Img}
                title={certificate.title}
                description={certificate.description}
                issuer={certificate.issuer}
                date={certificate.date}
              />
            </div>
          ))}
        </div>
      </TabPanel>

      {/* Tech Stack Tab */}
      <TabPanel value={value} index={2}>
        <div className="flex justify-center gap-4 mb-6">
          <motion.div
            className="flex gap-2 bg-gray-900/60 rounded-xl border border-green-600/30 p-2 backdrop-blur-md"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {["Code", "Programs", "Tools"].map((category, index) => (
            // {["Code", "Programs", "Tools", "Software"].map((category, index) => (
              <motion.button
                key={index}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  techStackValue === index && !showAllTechStacks
                    ? "bg-gradient-to-r from-green-500 to-teal-400 text-gray-900"
                    : "text-green-400 hover:bg-gray-800/50"
                } transition-all duration-300`}
                onClick={() => handleTechStackChange(null, index)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={showAllTechStacks}
                aria-label={`Select ${category} tech stack`}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>
          <motion.button
            onClick={() => setShowAllTechStacks(!showAllTechStacks)}
            className="relative px-6 py-2 bg-gradient-to-r from-green-500 to-teal-400 text-gray-900 rounded-lg font-semibold transition-all duration-300"
            whileHover={{ scale: 1.05, boxShadow: "0 4px 12px rgba(45, 212, 191, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            data-aos="fade-up"
            data-aos-delay="200"
            aria-label={showAllTechStacks ? "Hide tech stack" : "Show all tech stack"}
          >
            {showAllTechStacks ? "Hide" : `Show All (${Object.values(techStacks).flat().length})`}
            <motion.div
              className="absolute -left-4 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-green-500 to-teal-400 p-1.5 rounded-full"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            >
              <Box className="w-3 h-3 text-gray-900" />
            </motion.div>
          </motion.button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
          {(showAllTechStacks
            ? Object.values(techStacks).flat()
            : techStacks[Object.keys(techStacks)[techStackValue]]
          ).map((stack, i) => (
            <div key={i} data-aos="fade-up" data-aos-delay={i * 100}>
              <TechStackIcon TechStackIcon={stack.icon} Language={stack.language} />
            </div>
          ))}
        </div>
      </TabPanel>

      <style jsx>{`
        .grid {
          display: grid;
        }
        .scrollbar-hidden::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hidden {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @media (max-width: 640px) {
          .grid {
            grid-template-columns: 1fr;
          }
          .text-3xl {
            font-size: 1.875rem;
          }
          .text-sm {
            font-size: 0.75rem;
          }
          button {
            padding: 6px 12px;
          }
        }
      `}</style>
    </section>
  );
};

export default Portfolio;