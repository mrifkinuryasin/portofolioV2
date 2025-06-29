import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { href: "#Home", label: "Home" },
  { href: "#About", label: "About" },
  { href: "#Portofolio", label: "Portofolio" },
  { href: "#contact", label: "Contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("Home");
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Hanya aktifkan section tracking jika di rute utama
      if (location.pathname === "/") {
        const sections = navItems
          .map((item) => {
            const section = document.querySelector(item.href);
            if (section) {
              return {
                id: item.href.replace("#", ""),
                offset: section.offsetTop - 150,
                height: section.offsetHeight,
              };
            }
            return null;
          })
          .filter(Boolean);

        const currentPosition = window.scrollY;

        const active = sections.find(
          (section) =>
            currentPosition >= section.offset &&
            currentPosition < section.offset + section.height
        );

        setActiveSection(active ? active.id : "Home");
      } else {
        setActiveSection("");
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
  }, [isOpen]);

  const getNavLink = (href) => {
    // Jika di rute /project/:id, arahkan ke / dengan hash
    return location.pathname.startsWith("/project") ? `/${href}` : href;
  };

  const handleNavClick = (e, href) => {
    if (location.pathname === "/") {
      e.preventDefault();
      const section = document.querySelector(href);
      if (section) {
        const top = section.offsetTop - 100;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }
    setIsOpen(false);
  };

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-500 ${
        scrolled || isOpen
          ? "bg-gray-950/90 backdrop-blur-md border-b border-green-600/40"
          : "bg-gray-950/90"
      }`}
    >
      {/* Background Particles */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <div className="particle particle-1"></div>
        <div className="particle particle-2"></div>
        <div className="particle particle-3"></div>
      </div>

      <div className="mx-auto px-4 sm:px-8 lg:px-16">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              to="/#Home"
              className="text-2xl font-extrabold text-green-300 animate-typing"
              style={{ textShadow: "0 0 12px rgba(16, 185, 129, 0.6)" }}
              onClick={() => setIsOpen(false)}
            >
              MasCitull
            </Link>
          </div>

          {/* Menu Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={getNavLink(item.href)}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`group relative px-2 py-2 text-sm font-medium ${
                  activeSection === item.href.substring(1)
                    ? "text-green-300"
                    : "text-green-300/70 hover:text-green-300"
                } transition-all duration-300`}
                style={{
                  textShadow:
                    activeSection === item.href.substring(1)
                      ? "0 0 12px rgba(16, 185, 129, 0.6)"
                      : "none",
                }}
              >
                {item.label}
                <span
                  className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-green-500 to-teal-400 transform origin-left transition-transform duration-300 ${
                    activeSection === item.href.substring(1)
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </Link>
            ))}
          </div>

          {/* Hamburger Mobile */}
          <div className="md:hidden">
            <button
              aria-label={isOpen ? "Close menu" : "Open menu"}
              onClick={() => setIsOpen(!isOpen)}
              className="text-green-300 hover:text-teal-400 transition-all duration-300"
            >
              {isOpen ? (
                <X className="w-6 h-6 animate-morph" />
              ) : (
                <Menu className="w-6 h-6 animate-morph" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed inset-0 bg-gray-950/95 backdrop-blur-md border-t-4 border-gradient-to-r from-green-500 to-teal-400 transition-all duration-500 ease-in-out ${
          isOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-full pointer-events-none"
        }`}
        style={{ top: "64px" }}
      >
        <div className="flex flex-col h-full pt-8">
          {navItems.map((item, index) => (
            <Link
              key={item.label}
              to={getNavLink(item.href)}
              onClick={(e) => handleNavClick(e, item.href)}
              className={`px-6 py-4 text-lg font-medium transition-all duration-300 ${
                activeSection === item.href.substring(1)
                  ? "text-green-300"
                  : "text-green-300/70 hover:text-green-300"
              }`}
              style={{
                transitionDelay: `${index * 100}ms`,
                transform: isOpen ? "translateX(0)" : "translateX(50px)",
                opacity: isOpen ? 1 : 0,
                textShadow:
                  activeSection === item.href.substring(1)
                    ? "0 0 12px rgba(16, 185, 129, 0.6)"
                    : "none",
              }}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      <style jsx>{`
        /* Particle Animations */
        .particle {
          position: absolute;
          background: rgba(16, 185, 129, 0.7);
          border-radius: 50%;
          animation: float 10s infinite linear;
          box-shadow: 0 0 12px rgba(16, 185, 129, 0.6);
        }
        .particle-1 { width: 6px; height: 6px; top: 20%; left: 30%; animation-duration: 8s; }
        .particle-2 { width: 5px; height: 5px; top: 50%; left: 70%; animation-duration: 12s; }
        .particle-3 { width: 7px; height: 7px; top: 30%; left: 50%; animation-duration: 10s; }
        @keyframes float {
          0% { transform: translate(0, 0); opacity: 0.8; }
          50% { opacity: 0.3; }
          100% { transform: translate(50px, -50px); opacity: 0.8; }
        }

        /* Typing Animation */
        .animate-typing {
          overflow: hidden;
          white-space: nowrap;
          animation: typing 2s steps(20, end) forwards;
        }
        @keyframes typing {
          from { width: 0; }
          to { width: 100%; }
        }

        /* Morph Animation */
        .animate-morph {
          animation: morph 0.5s ease-in-out;
        }
        @keyframes morph {
          0% { transform: scale(0.8) rotate(0deg); opacity: 0.5; }
          50% { transform: scale(1.2) rotate(180deg); opacity: 0.8; }
          100% { transform: scale(1) rotate(360deg); opacity: 1; }
        }

        /* Responsive Styles */
        @media (max-width: 640px) {
          .text-sm { font-size: 0.75rem; }
          .px-4 { padding-left: 1rem; padding-right: 1rem; }
          .py-4 { padding-top: 0.75rem; padding-bottom: 0.75rem; }
          .text-lg { font-size: 1rem; }
        }
        @media (max-width: 768px) {
          .text-2xl { font-size: 1.5rem; }
        }
        @media (min-width: 1024px) {
          .px-16 { padding-left: 4rem; padding-right: 4rem; }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;