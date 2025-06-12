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
    }, 90);
    return () => clearInterval(timer);
  }, [text]);

  return (
    <span className="font-mono text-green-400 tracking-wider">
      {displayText}
      <span className="animate-pulse text-green-400">|</span>
    </span>
  );
};

const AuroraBackground = () => (
  <div className="absolute inset-0 -z-10">
    <div className="w-full h-full bg-gray-900 bg-opacity-80" />
    <div className="absolute w-[500px] h-[500px] bg-green-500 rounded-full blur-3xl opacity-30 animate-float top-10 left-10" />
    <div className="absolute w-[400px] h-[400px] bg-teal-400 rounded-full blur-2xl opacity-20 animate-float-slow bottom-10 right-10" />
  </div>
);

const IconButton = ({ Icon }) => (
  <motion.div
    whileHover={{ scale: 1.1, rotate: 5 }}
    transition={{ type: "spring", stiffness: 300 }}
    className="relative p-3 bg-gray-800 bg-opacity-60 backdrop-blur-md rounded-full border border-green-600 shadow-lg"
  >
    <Icon className="text-green-400 w-5 h-5 sm:w-6 sm:h-6" />
  </motion.div>
);

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
    }, 40);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      setTimeout(() => {
        setIsLoading(false);
        setTimeout(() => onLoadingComplete?.(), 1000);
      }, 500);
    }
  }, [progress, onLoadingComplete]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 bg-gray-900 text-gray-100 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
            y: 50,
            filter: 'blur(10px)',
            transition: { duration: 0.8 }
          }}
        >
          <AuroraBackground />
          <div className="min-h-screen flex items-center justify-center px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="text-center space-y-8 max-w-2xl mx-auto"
            >
              {/* Flowing Animation */}
              <motion.div
                className="flex justify-center space-x-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {[...Array(5)].map((_, index) => (
                  <motion.div
                    key={index}
                    className="w-2 h-12 bg-gradient-to-b from-green-500 to-teal-400 rounded-full"
                    animate={{
                      y: [0, -20, 0],
                      opacity: [0.3, 1, 0.3],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: index * 0.2,
                      ease: 'easeInOut',
                    }}
                  />
                ))}
              </motion.div>

              {/* Progress Text */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="text-lg text-green-400 font-medium tracking-wide"
              >
                Loading... {progress}%
              </motion.div>

              {/* Website Link */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {/* <a
                  href="https://www.rifki.my.id"
                  className="inline-flex items-center gap-3 px-6 py-3 bg-gray-800 bg-opacity-60 border border-green-600 rounded-full shadow-lg hover:shadow-xl transition hover:scale-105"
                >
                  <IconButton Icon={Globe} />
                  <TypewriterEffect text="www.rifki.my.id" />
                </a> */}
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeScreen;