import { motion } from 'framer-motion';
import React from 'react';
import { Link } from 'react-router-dom';
import EgyptianLogo from '../ui/EgyptianLogo';

interface Props {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

function FormWrapper({ children, title, subtitle }: Props) {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-obsidian-light" />
      <div className="absolute inset-0 hieroglyph-pattern opacity-10" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/">
            <EgyptianLogo size="lg" className="justify-center" />
          </Link>
        </div>

        {/* Card */}
        <div className="card-egyptian rounded-xl p-8 border border-border/50">
          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-primary/50 rounded-tl-xl" />
          <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-primary/50 rounded-tr-xl" />
          <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-primary/50 rounded-bl-xl" />
          <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-primary/50 rounded-br-xl" />

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="font-heading text-2xl font-bold text-foreground mb-2">
              {title}
            </h1>
            <p className="font-body text-muted-foreground">{subtitle}</p>
          </div>

          {/* Form */}
          {children}
        </div>
      </motion.div>
    </div>
  );
}

export default FormWrapper;
