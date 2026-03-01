import { motion } from 'framer-motion';
import { useId } from 'react';

interface EgyptianLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const EgyptianLogo = ({ className = '', size = 'md' }: EgyptianLogoProps) => {
  const innerGradientId = useId();
  const outerGradientId = useId();
  const sizeClasses = {
    sm: 'h-8',
    md: 'h-12',
    lg: 'h-16',
  };

  return (
    <motion.div
      className={`flex items-center gap-3 ${className}`}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative">
        <svg
          className={`${sizeClasses[size]} aspect-square`}
          viewBox="0 0 60 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Inner (Lighter) Gold Gradient */}
            <linearGradient
              id={innerGradientId}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="hsl(43, 87%, 65%)" />
              <stop offset="50%" stopColor="hsl(35, 80%, 45%)" />
              <stop offset="100%" stopColor="hsl(43, 87%, 55%)" />
            </linearGradient>

            {/* Outer (Darker) Gold Gradient */}
            <linearGradient
              id={outerGradientId}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="hsl(43, 60%, 45%)" />
              <stop offset="50%" stopColor="hsl(35, 50%, 35%)" />
              <stop offset="100%" stopColor="hsl(43, 60%, 40%)" />
            </linearGradient>
          </defs>

          {/* Outer Triangle */}
          <path
            d="M30 5L55 50H5L30 5Z"
            stroke={`url(#${outerGradientId})`}
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />

          {/* Inner Triangle */}
          <path
            d="M30 18L42 42H18L30 18Z"
            stroke={`url(#${innerGradientId})`}
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      </div>

      {/* Logo Text */}
      <div className="flex flex-col">
        <span className="font-heading font-bold text-gradient-gold text-lg md:text-xl tracking-widest">
          FR3ON
        </span>
        <span className="font-heading text-primary text-xs md:text-sm tracking-[0.3em] -mt-1">
          FIT
        </span>
      </div>
    </motion.div>
  );
};

export default EgyptianLogo;
