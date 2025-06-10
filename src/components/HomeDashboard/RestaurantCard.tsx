import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Heart, Star, Award, Dot } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface RestaurantCardData {
  id: string;
  name: string;
  imageUrl: string;
  deliveryTime: string; // e.g., "20-30 min"
  ratingText?: string; // e.g., "Best Overall" or "4.5"
  uberOneBenefits?: boolean;
  isFavorite?: boolean;
  // In a real app, cuisine types or other tags might be useful
  // cuisineTypes?: string[]; 
}

interface RestaurantCardProps extends RestaurantCardData {
  className?: string;
  onToggleFavorite?: (id: string) => void;
  onClick?: (id: string) => void;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({
  id,
  name,
  imageUrl,
  deliveryTime,
  ratingText,
  uberOneBenefits,
  isFavorite = false,
  className,
  onToggleFavorite,
  onClick,
}) => {
  const [currentIsFavorite, setCurrentIsFavorite] = React.useState(isFavorite);

  React.useEffect(() => {
    setCurrentIsFavorite(isFavorite);
  }, [isFavorite]);

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click when clicking favorite
    if (onToggleFavorite) {
      onToggleFavorite(id);
    } else {
      setCurrentIsFavorite((prev) => !prev);
    }
  };

  const handleCardClick = () => {
    if (onClick) {
      onClick(id);
    }
    // console.log(`Card ${id} clicked`);
  };

  return (
    <Card
      className={cn('w-full overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer', className)}
      onClick={handleCardClick}
      onKeyDown={(e) => e.key === 'Enter' && handleCardClick()}
      tabIndex={0}
      role="group"
    >
      <div className="relative">
        <AspectRatio ratio={16 / 9}>
          <img
            src={imageUrl || 'https://via.placeholder.com/400x225?text=Restaurant'} 
            alt={name}
            className="object-cover w-full h-full"
          />
        </AspectRatio>
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 bg-black/30 hover:bg-black/50 text-white rounded-full p-1.5 h-8 w-8"
          onClick={handleToggleFavorite}
          aria-label={currentIsFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart className={cn('h-5 w-5', currentIsFavorite ? 'fill-red-500 text-red-500' : 'text-white')} />
        </Button>
      </div>
      <CardContent className="p-3 space-y-1.5">
        <h3 className="text-base font-semibold text-foreground truncate" title={name}>{name}</h3>
        
        <div className="flex items-center text-xs text-muted-foreground space-x-1.5">
          {uberOneBenefits && (
            <div className="flex items-center text-p-accent-secondary">
              <Award className="h-3.5 w-3.5 mr-0.5" />
              <span>Uber One</span> 
              <Dot className="h-4 w-4 text-muted-foreground opacity-50" />
            </div>
          )}
          {ratingText && (
            <div className="flex items-center">
              <Star className="h-3.5 w-3.5 mr-0.5 text-yellow-500 fill-yellow-500" />
              <span>{ratingText}</span>
              <Dot className="h-4 w-4 text-muted-foreground opacity-50" /> 
            </div>
          )}
          <span>{deliveryTime}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default RestaurantCard;
