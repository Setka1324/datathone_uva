import { motion, useMotionValue } from 'framer-motion';
import { useEffect } from 'react';

const CyberBackground = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const updateMousePosition = (e) => {
      mouseX.set(e.clientX - 75); // Center the effect
      mouseY.set(e.clientY - 75);
    };

    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[length:40px_40px] bg-[linear-gradient(to_right,#4f46e510_1px,transparent_1px),linear-gradient(to_bottom,#4f46e510_1px,transparent_1px)]" />
      
      {/* Moving gradient */}
      <motion.div
        className="absolute w-[150px] h-[150px] bg-[radial-gradient(circle_at_center,#9333ea30_0%,transparent_80%)] blur-[1px]"
        style={{
          x: mouseX,
          y: mouseY,
        }}
        transition={{ type: 'spring', stiffness: 0.000001, damping: 1 }}
      />
      
      {/* Scanning line */}
      <div className="absolute inset-0 bg-[linear-gradient(0deg,transparent_0%,#22d3ee20_80%,transparent_100%)] animate-scanline" />
    </div>
  );
};

export default CyberBackground;