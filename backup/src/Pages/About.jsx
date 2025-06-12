import React, { useEffect, memo, useMemo, useState } from "react";
import { FileText, Code2, BadgeCheck, Clock, Edit3, Layout, Cpu } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Helmet } from "react-helmet";
import { experienceData } from "../data/data"; // Import shared experienceData

const Header = memo(() => (
  <div className="text-center mb-4 xs:mb-6 sm:mb-8 px-2 xs:px-4 sm:px-6">
    <div className="inline-block relative group">
      <h2
        className="text-3xl xs:text-4xl sm:text-5xl font-extrabold text-orange-600 tracking-wide"
        data-aos="zoom-in-up"
        data-aos-duration="600"
      >
        About Me
      </h2>
    </div>
    <p
      className="mt-2 xs:mt-3 text-orange-400 max-w-3xl mx-auto text-base xs:text-lg sm:text-xl flex items-center justify-center gap-2 xs:gap-3 font-semibold"
      data-aos="zoom-in-up"
      data-aos-duration="800"
      aria-hidden="true"
    >
      - - - - - - - -
    </p>
  </div>
));

const LoadingSkeleton = () => (
  <div className="animate-pulse bg-orange-200 rounded-xl w-full max-w-[280px] xs:max-w-xs h-[300px] xs:h-[320px] mx-auto">
    <div className="flex flex-col items-center py-6 xs:py-8 px-4 xs:px-6 space-y-4 xs:space-y-6">
      <div className="rounded-full bg-orange-300 w-24 xs:w-28 h-24 xs:h-28 border-4 border-orange-100" />
      <div className="h-5 xs:h-6 bg-orange-300 rounded w-3/4"></div>
      <div className="h-4 bg-orange-300 rounded w-1/2"></div>
      <div className="h-4 bg-orange-300 rounded w-5/6"></div>
    </div>
    <div className="bg-orange-300 h-10 xs:h-12 rounded-b-xl mt-4 px-4 xs:px-6 py-2 xs:py-3" />
  </div>
);

const ProfileImage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <LoadingSkeleton />;

  return (
    <div
      className="relative w-full max-w-sm bg-white border border-orange-400 rounded-xl shadow-xl overflow-hidden transition-all duration-300 hover:scale-[1.05] hover:shadow-[0_15px_40px_rgba(234,88,12,0.4)] cursor-pointer mx-auto group"
      data-aos="fade-up"
      data-aos-duration="1000"
      aria-label="Profile Card of Ludang Prasetyo Nugroho"
    >
      <div className="w-full h-52 xs:h-60 overflow-hidden bg-gray-100 relative">
        <img
          src="p1.jpg"
          alt="Ludang Prasetyo Nugroho"
          className="object-cover w-full h-full transition-opacity duration-500 ease-in-out group-hover:opacity-0"
          loading="lazy"
          onError={(e) => (e.currentTarget.src = '/fallback.png')}
        />
        <img
          src="p2.jpg"
          alt="Ludang Prasetyo Nugroho Hover"
          className="object-cover w-full h-full absolute top-0 left-0 transition-opacity duration-500 ease-in-out opacity-0 group-hover:opacity-100"
          loading="lazy"
          onError={(e) => (e.currentTarget.src = '/fallback.png')}
        />
      </div>
      <div className="flex flex-col items-center bg-gradient-to-br from-orange-50 to-yellow-100 px-6 py-4 xs:py-6 transition-colors duration-300 group-hover:from-orange-100 group-hover:to-yellow-200">
        <h3 className="text-xl font-extrabold text-orange-700 text-center transition-colors duration-300 group-hover:text-orange-800 group-hover:scale-105">
          Ludang Prasetyo Nugroho
        </h3>
        <p className="text-sm text-orange-600 font-semibold mt-1 text-center transition-colors duration-300 group-hover:text-orange-700">
          Teknik Komputer - UTDI
        </p>
        <p className="text-xs italic text-orange-500 mt-2 text-center max-w-xs transition-colors duration-300 group-hover:text-orange-600 group-hover:scale-105">
          "Innovating with code & creativity."
        </p>
      </div>
      <div className="flex flex-col items-center text-orange-700 bg-orange-50 px-6 py-3 border-t border-orange-300 space-y-1 transition-colors duration-300 group-hover:bg-orange-100">
        <span className="font-bold text-sm text-center transition-colors duration-300 group-hover:text-orange-800">NIM: 225510017</span>
        <span className="font-semibold text-xs text-center transition-colors duration-300 group-hover:text-orange-800">Yogyakarta, Indonesia</span>
      </div>
    </div>
  );
};

const SkillBar = ({ name, percent }) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => setWidth(percent), 400);
    return () => clearTimeout(timeout);
  }, [percent]);

  return (
    <div className="mb-3 xs:mb-4">
      <div className="flex justify-between text-xs xs:text-sm font-semibold text-gray-700 mb-1">
        <span>{name}</span>
        <span>{percent}%</span>
      </div>
      <div className="w-full bg-orange-100 h-2 xs:h-3 rounded-full overflow-hidden shadow-inner">
        <div
          className="bg-gradient-to-r from-orange-500 to-yellow-400 h-2 xs:h-3 rounded-full transition-all duration-1000 ease-in-out"
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
};

const StatsCard = ({ icon: Icon, value, label, description, delay }) => (
  <div
    className="flex items-center p-4 xs:p-5 rounded-xl bg-white bg-opacity-20 backdrop-blur-md border border-orange-300 shadow-md transition-transform hover:scale-105 hover:shadow-xl cursor-pointer"
    data-aos="fade-up"
    data-aos-delay={delay}
    role="group"
    tabIndex={0}
    aria-label={`${label}: ${value}`}
  >
    <div className="bg-gradient-to-tr from-orange-400 to-yellow-300 text-white p-3 xs:p-4 rounded-full shadow-md flex-shrink-0 mr-3 xs:mr-5">
      <Icon className="w-5 xs:w-6 sm:w-7 h-5 xs:h-6 sm:h-7" aria-hidden="true" />
    </div>
    <div className="flex flex-col flex-grow">
      <div className="text-sm xs:text-md text-gray-800 font-semibold">{label}</div>
      {description && (
        <div className="text-xs xs:text-sm text-gray-600 mt-0.5 xs:mt-1">{description}</div>
      )}
    </div>
    <div className="text-orange-700 font-extrabold text-lg xs:text-xl sm:text-2xl ml-4 xs:ml-6 self-end">{value}</div>
  </div>
);

const Chip = ({ text }) => (
  <span className="inline-block bg-orange-200 text-orange-800 text-[10px] xs:text-xs font-semibold px-2 xs:px-3 py-0.5 xs:py-1 rounded-full mr-1 xs:mr-2 mb-1 xs:mb-2 shadow-sm select-none">
    {text}
  </span>
);

const SkillCard = ({ icon: Icon, title, description, tools = [], delay }) => (
  <div
    className="bg-white bg-opacity-30 backdrop-blur-md border border-orange-300 rounded-xl p-4 xs:p-5 sm:p-6 flex flex-col items-center text-center cursor-pointer shadow-md hover:scale-105 hover:shadow-2xl transition-transform duration-300 ease-in-out"
    data-aos="fade-up"
    data-aos-delay={delay}
    role="group"
    tabIndex={0}
    aria-label={`${title} skill`}
  >
    <div className="bg-gradient-to-tr from-orange-500 to-yellow-400 text-white p-3 xs:p-4 sm:p-5 rounded-full shadow-lg mb-3 xs:mb-4 flex items-center justify-center">
      <Icon className="w-8 xs:w-10 sm:w-12 h-8 xs:h-10 sm:h-12" aria-hidden="true" />
    </div>
    <h3 className="text-lg xs:text-xl sm:text-2xl font-bold text-orange-700 mb-2 xs:mb-3">{title}</h3>
    <p className="text-xs xs:text-sm text-gray-800 mb-3 xs:mb-4">{description}</p>
    <div className="flex flex-wrap justify-center max-w-full">
      {tools.map((tool) => (
        <Chip key={tool} text={tool} />
      ))}
    </div>
  </div>
);

const AboutPage = () => {
  const { totalProjects, totalCertificates, YearExperience } = useMemo(() => {
    const storedProjects = JSON.parse(localStorage.getItem("projects") || "[]");
    const storedCertificates = JSON.parse(localStorage.getItem("certificates") || "[]");

    // Calculate YearExperience as the number of entries in experienceData
    const experience = experienceData.length;

    return {
      totalProjects: storedProjects.length || 0,
      totalCertificates: storedCertificates.length || 0,
      YearExperience: experience || 0, // Fallback to 0 if no valid data
    };
  }, []);

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
        <title>About – Nugra.my.id</title>
        <meta name="description" content="Tentang Ludang Prasetyo dan perjalanan profesionalnya." />
        <meta name="keywords" content="Ludang Prasetyo, Nugra21, Portfolio, Web Developer, Tentang Saya" />
        <meta property="og:title" content="About – Nugra.my.id" />
        <meta property="og:description" content="Tentang Ludang Prasetyo dan perjalanan profesionalnya." />
        <meta property="og:url" content="https://nugra.my.id/about" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://nugra.my.id/about" />
      </Helmet>

      <section
        className="min-h-screen text-gray-900 overflow-hidden px-2 xs:px-4 sm:px-6 md:px-8 lg:px-12 pt-16 xs:pt-20 sm:pt-24 pb-10 sm:pb-12"
        id="About"
      >
        <div className="max-w-7xl w-full mx-auto">
          <Header />

          <div className="pt-8 xs:pt-10 sm:pt-14">
            <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 xs:gap-8 sm:gap-12 md:gap-16 lg:gap-20 items-center">
              <div className="space-y-4 xs:space-y-6 sm:space-y-8 text-center lg:text-left">
                <h2
                  className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight"
                  data-aos="fade-right"
                  data-aos-duration="1000"
                >
                  <span className="text-orange-600">Hello, I'm</span>
                  <span className="block mt-1 xs:mt-2 text-gray-900" data-aos="fade-right" data-aos-duration="1300">
                    Ludang Prasetyo Nugroho
                  </span>
                </h2>
                <p
                  className="text-sm xs:text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed text-justify"
                  data-aos="fade-right"
                  data-aos-duration="1500"
                >
                  Mahasiswa Teknik Komputer di Universitas Teknologi Digital Indonesia (UTDI), dengan minat kuat dalam
                  pemrograman, desain web, editing video & foto, serta robotika.
                  <br />
                  Saya bersemangat menciptakan solusi teknologi inovatif yang memberikan manfaat nyata untuk masyarakat.
                </p>
                <div
                  className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 xs:gap-4 sm:gap-6 mt-3 xs:mt-4"
                  data-aos="fade-up"
                  data-aos-duration="800"
                >
                  <a
                    href="Ludang-prasetyo-nugorho-resume.pdf"
                    className="w-full sm:w-auto"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <button
                      className="w-full sm:w-auto px-6 xs:px-8 py-2 xs:py-3 rounded-xl bg-gradient-to-r from-orange-500 to-yellow-400 text-white font-semibold transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 xs:gap-3 shadow-lg hover:shadow-xl"
                    >
                      <FileText className="w-4 xs:w-5 sm:w-6 h-4 xs:h-5 sm:h-6" />
                      Download CV
                    </button>
                  </a>
                  <a href="#Portofolio" className="w-full sm:w-auto">
                    <button
                      className="w-full sm:w-auto px-6 xs:px-8 py-2 xs:py-3 rounded-xl border-2 border-orange-400 text-orange-600 font-semibold transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 xs:gap-3 hover:bg-orange-100"
                      data-aos="fade-up"
                      data-aos-duration="1000"
                    >
                      <Code2 className="w-4 xs:w-5 sm:w-6 h-4 xs:h-5 sm:h-6" />
                      View Projects
                    </button>
                  </a>
                </div>
              </div>

              <ProfileImage />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 xs:gap-8 mt-12 xs:mt-16 sm:mt-20">
              <SkillBar name="Programming" percent={70} />
              <SkillBar name="Web Design" percent={80} />
              <SkillBar name="Video Editing" percent={80} />
              <SkillBar name="IOT" percent={50} />
              <SkillBar name="UI/UX Design" percent={75} />
              <SkillBar name="Photography" percent={65} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 xs:gap-8 mt-12 xs:mt-16 sm:mt-20">
              <StatsCard
                icon={Code2}
                value={totalProjects}
                label="Total Projects"
                description="Projects I have completed"
                delay={100}
              />
              <StatsCard
                icon={BadgeCheck}
                value={totalCertificates}
                label="Certificates"
                description="Verified skill certificates"
                delay={300}
              />
              <StatsCard
                icon={Clock}
                value={`${YearExperience}`}
                label="Years of Experience"
                description="In software development"
                delay={500}
              />
            </div>

            <div id="Skils" className="mt-12 xs:mt-16 sm:mt-20">
              <h3
                className="text-3xl xs:text-4xl sm:text-5xl font-extrabold text-orange-600 mb-8 xs:mb-10 sm:mb-12 text-center"
                data-aos="fade-up"
                data-aos-duration="800"
              >
                My Skills
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 xs:gap-8 sm:gap-10 px-2 xs:px-4 sm:px-8">
                <SkillCard
                  icon={Code2}
                  title="Programming"
                  description="Expertise in multiple programming languages and algorithms."
                  tools={["JavaScript", "Python", "C++", "Dart", "html", "css"]}
                  delay={100}
                />
                <SkillCard
                  icon={Edit3}
                  title="Video & Photo Editing"
                  description="Skilled in video and photo editing tools to create compelling visuals."
                  tools={["Adobe Premiere", "Photoshop", "Alight Motion", "Adobe Illustrator"]}
                  delay={300}
                />
                <SkillCard
                  icon={Layout}
                  title="UI/UX Design"
                  description="Designing intuitive and modern user interfaces and experiences."
                  tools={["Figma", "Sketch", "TailwindCSS"]}
                  delay={500}
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
      </section>
    </>
  );
};

export default memo(AboutPage);