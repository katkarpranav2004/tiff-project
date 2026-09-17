import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface EyeFollowButtonProps {
  text?: string;
  onClick?: () => void;
  className?: string;
}

const Eye = ({ mouseX, mouseY }: { mouseX: number, mouseY: number }) => {
  const eyeRef = useRef<HTMLDivElement>(null);
  const [eyeCenter, setEyeCenter] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleResize = () => {
      if (eyeRef.current) {
        const rect = eyeRef.current.getBoundingClientRect();
        setEyeCenter({
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleResize);
    };
  }, []);

  // Calculate angle between eye center and mouse
  const angle = Math.atan2(mouseY - eyeCenter.y, mouseX - eyeCenter.x);
  
  // Distance from center (limit to max pupil movement)
  const maxMove = 8;
  const dist = Math.min(
    maxMove,
    Math.hypot(mouseX - eyeCenter.x, mouseY - eyeCenter.y) / 10
  );

  const pupilX = Math.cos(angle) * dist;
  const pupilY = Math.sin(angle) * dist;

  return (
    <div
      ref={eyeRef}
      className="relative w-8 h-8 bg-white rounded-full flex items-center justify-center overflow-hidden shadow-inner border border-gray-200"
    >
      <motion.div
        className="w-3 h-3 bg-black rounded-full"
        animate={{ x: isNaN(pupilX) ? 0 : pupilX, y: isNaN(pupilY) ? 0 : pupilY }}
        transition={{ type: 'spring', stiffness: 300, damping: 20, mass: 0.5 }}
      />
    </div>
  );
};

const EyeFollowButton: React.FC<EyeFollowButtonProps> = ({ text = "Apply Now", onClick, className = "" }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <button
      onClick={onClick}
      className={`relative flex items-center gap-4 bg-black text-white px-6 py-3 rounded-full font-bold shadow-lg hover:bg-gray-900 transition-colors ${className}`}
    >
      <span>{text}</span>
      <div className="flex gap-1">
        <Eye mouseX={mousePosition.x} mouseY={mousePosition.y} />
        <Eye mouseX={mousePosition.x} mouseY={mousePosition.y} />
      </div>
    </button>
  );
};

export default EyeFollowButton;
