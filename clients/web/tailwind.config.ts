import type { Config } from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      fontFamily: {
        heading: ['Cinzel', 'serif'],
        body: ['Outfit', 'sans-serif'],
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        gold: {
          DEFAULT: 'hsl(43, 87%, 55%)',
          light: 'hsl(43, 87%, 70%)',
          dark: 'hsl(35, 80%, 45%)',
        },
        nile: {
          DEFAULT: 'hsl(175, 70%, 40%)',
          light: 'hsl(175, 70%, 55%)',
          dark: 'hsl(175, 70%, 30%)',
        },
        sand: {
          DEFAULT: 'hsl(35, 30%, 25%)',
          light: 'hsl(35, 30%, 35%)',
          dark: 'hsl(35, 30%, 15%)',
        },
        obsidian: {
          DEFAULT: 'hsl(40, 15%, 8%)',
          light: 'hsl(40, 15%, 12%)',
          dark: 'hsl(40, 15%, 4%)',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        shimmer: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-gold': {
          '0%, 100%': { boxShadow: '0 0 20px -5px hsla(43, 87%, 55%, 0.4)' },
          '50%': { boxShadow: '0 0 40px -5px hsla(43, 87%, 55%, 0.6)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        shimmer: 'shimmer 3s ease-in-out infinite',
        float: 'float 6s ease-in-out infinite',
        'pulse-gold': 'pulse-gold 2s ease-in-out infinite',
      },
      backgroundImage: {
        'gradient-gold':
          'linear-gradient(135deg, hsl(43, 87%, 55%) 0%, hsl(35, 80%, 45%) 50%, hsl(43, 87%, 55%) 100%)',
        'gradient-royal':
          'linear-gradient(180deg, hsl(40, 20%, 8%) 0%, hsl(40, 15%, 4%) 100%)',
        'gradient-sand':
          'linear-gradient(135deg, hsl(35, 30%, 18%) 0%, hsl(40, 25%, 12%) 100%)',
        'gradient-pharaoh':
          'linear-gradient(135deg, hsl(43, 87%, 55%) 0%, hsl(25, 85%, 45%) 100%)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;
