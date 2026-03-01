import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface EgyptianCardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'gold' | 'dark';
  hoverable?: boolean;
}

const EgyptianCard = ({
  children,
  className = '',
  variant = 'default',
  hoverable = true,
}: EgyptianCardProps) => {
  const variants = {
    default: 'card-egyptian',
    gold: 'bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30',
    dark: 'bg-obsidian border border-border/30',
  };

  return (
    <motion.div
      className={`
        relative rounded-lg p-6 overflow-hidden
        ${variants[variant]}
        ${hoverable ? 'transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_30px_-5px_hsla(43,87%,55%,0.3)]' : ''}
        ${className}
      `}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={hoverable ? { y: -5 } : undefined}
    >
      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary/50" />
      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-primary/50" />
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-primary/50" />
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary/50" />

      {children}
    </motion.div>
  );
};

export default EgyptianCard;
