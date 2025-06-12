import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe } from 'lucide-react';

const TypewriterEffect = ({ text }) => {
  const [displayText, setDisplayText] = useState('');
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i <= text.length) {
        setDisplayText(text.slice(0, i));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 100);
    return () => clearInterval(timer);
  }, [text]);

  return (
    <span className="font-mono text-green-300 text-sm sm:text-base tracking-wide">
      {displayText}
      <span className="animate-pulse text-green-300">|</span>
    </span>
  );
};

const WelcomeScreen = ({ onLoadingComplete }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 100) return prev + 2;
        clearInterval(interval);
        return 100;
      });
    }, 50);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      setTimeout(() => {
        setIsLoading(false);
        setTimeout(() => onLoadingComplete?.(), 800);
      }, 500);
    }
  }, [progress, onLoadingComplete]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 bg-gray-950 text-gray-100 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 0.95,
            transition: { duration: 0.8, ease: 'easeInOut' },
          }}
        >
          {/* Background Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.15)_0%,transparent_70%)]" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="text-center space-y-6 sm:space-y-8 max-w-lg mx-auto px-4"
          >
            {/* Loading Indicator */}
            <motion.div
              className="relative w-16 h-16 sm:w-20 sm:h-20 mx-auto"
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            >
              <div className="absolute inset-0 border-4 border-green-400/30 rounded-full" />
              <motion.div
                className="absolute inset-0 border-t-4 border-green-400 rounded-full"
                animate={{ rotate: -360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                className="absolute inset-3 bg-gradient-to-r from-green-500 to-teal-400 rounded-full flex items-center justify-center"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Globe className="w-6 h-6 sm:w-8 sm:h-8 text-gray-900" />
              </motion.div>
            </motion.div>

            {/* Progress Text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-base sm:text-lg text-green-300 font-semibold tracking-wide"
            >
              Memuat... {Math.floor(progress)}%
            </motion.div>

            {/* Website Link */}
            <motion.a
              href="https://www.rifki.my.id"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="inline-flex items-center gap-3 px-6 py-3 bg-gray-900/60 backdrop-blur-md border border-green-600/40 rounded-lg shadow-[0_4px_12px_rgba(16,185,129,0.2)] hover:shadow-[0_6px_16px_rgba(16,185,129,0.4)] transition-all duration-300 hover:scale-105"
              aria-label="Kunjungi situs rifki.my.id"
            >
              <motion.div
                whileHover={{ scale: 1.2 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="p-2 bg-gradient-to-r from-green-500 to-teal-400 rounded-full"
              >
                <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-gray-900" />
              </motion.div>
              <TypewriterEffect text="www.rifki.my.id" />
            </motion.a>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeScreen;