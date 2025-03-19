import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const words = ["React", "Framer", "Tailwind", "Motion", "3D", "Scroll"];

const variants = {
  initial: { opacity: 0, rotateY: 0 },
  animate: { opacity: 1, rotateY: 360 },
};

const AutoRotatingCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-rotate every 3 seconds.
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
      <AnimatePresence exitBeforeEnter>
        <motion.div
          key={currentIndex}
          variants={variants}
          initial="initial"
          animate="animate"
          exit="initial"
          transition={{ duration: 1, ease: "easeInOut" }}
          className="text-4xl font-bold"
        >
          {words[currentIndex]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default AutoRotatingCarousel;
