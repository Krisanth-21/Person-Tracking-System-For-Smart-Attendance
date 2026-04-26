import React from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  clickable?: boolean;
  onClick?: () => void;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  hover = true,
  clickable = false,
  onClick,
}) => {
  return (
    <motion.div
      className={`
        backdrop-blur-md bg-white/10 border border-white/20
        rounded-xl shadow-lg p-6
        ${hover ? 'hover:bg-white/20 transition-all duration-300' : ''}
        ${clickable ? 'cursor-pointer' : ''}
        ${className}
      `}
      onClick={onClick}
      whileHover={hover ? { scale: 1.02, y: -2 } : undefined}
      whileTap={clickable ? { scale: 0.98 } : undefined}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};