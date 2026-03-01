import { motion } from 'framer-motion';

interface EgyptianDividerProps {
  className?: string;
}

const EgyptianDivider = ({ className = '' }: EgyptianDividerProps) => {
  return (
    <motion.div
      className={`flex items-center justify-center gap-4 ${className}`}
      initial={{ opacity: 0, scaleX: 0 }}
      animate={{ opacity: 1, scaleX: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      {/* Left line */}
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary/50 to-primary" />

      {/* Center ornament */}
      <svg
        className="w-8 h-8 text-primary"
        viewBox="0 0 32 32"
        fill="currentColor"
      >
        <path d="M16 4L20 12L28 12L22 18L24 26L16 21L8 26L10 18L4 12L12 12L16 4Z" />
      </svg>

      {/* Right line */}
      <div className="flex-1 h-px bg-gradient-to-l from-transparent via-primary/50 to-primary" />
    </motion.div>
  );
};

export default EgyptianDivider;
