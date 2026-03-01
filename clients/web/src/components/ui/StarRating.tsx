import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  onRatingChange?: (rating: number) => void;
  interactive?: boolean;
  className?: string;
  starClassName?: string;
  size?: number;
}

const StarRating = ({
  rating,
  maxRating = 5,
  onRatingChange,
  interactive = false,
  className,
  starClassName,
  size = 20,
}: StarRatingProps) => {
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  const handleMouseEnter = (index: number) => {
    if (interactive) {
      setHoverRating(index);
    }
  };

  const handleMouseLeave = () => {
    if (interactive) {
      setHoverRating(null);
    }
  };

  const handleClick = (index: number) => {
    if (interactive && onRatingChange) {
      onRatingChange(index);
    }
  };

  const displayRating = hoverRating !== null ? hoverRating : rating;

  return (
    <div className={cn('flex items-center gap-1.5', className)}>
      {[...Array(maxRating)].map((_, i) => {
        const starIndex = i + 1;
        const isFilled = starIndex <= Math.floor(displayRating);
        const isHalf = !isFilled && starIndex <= Math.ceil(displayRating);
        const isActive = interactive && starIndex <= (hoverRating || 0);

        return (
          <button
            key={i}
            type="button"
            className={cn(
              'p-0.5 transition-all duration-300 ease-out outline-none',
              interactive
                ? 'cursor-pointer hover:scale-125 focus-visible:scale-125'
                : 'cursor-default',
              starClassName,
            )}
            onMouseEnter={() => handleMouseEnter(starIndex)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(starIndex)}
            disabled={!interactive}
          >
            <Star
              size={size}
              className={cn(
                'transition-all duration-300',
                isFilled
                  ? 'fill-egyptian-gold text-egyptian-gold drop-shadow-[0_0_8px_rgba(212,175,55,0.6)]'
                  : isHalf
                    ? 'fill-egyptian-gold/50 text-egyptian-gold drop-shadow-[0_0_4px_rgba(212,175,55,0.3)]'
                    : 'text-muted-foreground/40 fill-none hover:text-egyptian-gold/50',
                isActive &&
                  'scale-110 drop-shadow-[0_0_12px_rgba(212,175,55,0.8)] text-egyptian-gold',
              )}
              strokeWidth={isActive ? 2.5 : 2}
            />
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;
