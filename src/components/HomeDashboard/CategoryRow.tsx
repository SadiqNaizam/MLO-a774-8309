import React from 'react';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import {
  Pizza,
  Fish,
  Sandwich,
  ShoppingBasket,
  Leaf,
  Beef,
  CakeSlice,
  Coffee,
  LucideIcon
} from 'lucide-react';

interface CategoryItem {
  id: string;
  name: string;
  Icon: LucideIcon;
}

const categoriesData: CategoryItem[] = [
  { id: 'pizza', name: 'Pizza', Icon: Pizza },
  { id: 'sushi', name: 'Sushi', Icon: Fish },
  { id: 'sandwich', name: 'Sandwich', Icon: Sandwich },
  { id: 'grocery', name: 'Grocery', Icon: ShoppingBasket },
  { id: 'healthy', name: 'Healthy', Icon: Leaf },
  { id: 'burgers', name: 'Burgers', Icon: Beef },
  { id: 'dessert', name: 'Dessert', Icon: CakeSlice },
  { id: 'coffee', name: 'Coffee', Icon: Coffee },
  { id: 'asian', name: 'Asian', Icon: Fish }, // Example, using Fish icon for generic Asian food
  { id: 'mexican', name: 'Mexican', Icon: Beef }, // Example, using Beef icon for generic Mexican food
  { id: 'fastfood', name: 'Fast Food', Icon: Sandwich },
];

interface CategoryRowProps {
  className?: string;
  onCategorySelect?: (categoryId: string) => void;
}

const CategoryRow: React.FC<CategoryRowProps> = ({ className, onCategorySelect }) => {
  const handleCategoryClick = React.useCallback((categoryId: string) => {
    if (onCategorySelect) {
      onCategorySelect(categoryId);
    }
    // console.log(`Category ${categoryId} selected`);
  }, [onCategorySelect]);

  return (
    <ScrollArea className={cn('w-full whitespace-nowrap bg-background', className)}>
      <div className="flex space-x-6 p-4">
        {categoriesData.map((category) => (
          <div
            key={category.id}
            className="flex flex-col items-center justify-center space-y-2 w-20 cursor-pointer group"
            onClick={() => handleCategoryClick(category.id)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && handleCategoryClick(category.id)}
          >
            <div className="p-3 bg-muted rounded-full group-hover:bg-primary/10 transition-colors">
              <category.Icon className="h-7 w-7 text-foreground group-hover:text-primary" />
            </div>
            <span className="text-xs font-medium text-center text-foreground group-hover:text-primary transition-colors">
              {category.name}
            </span>
          </div>
        ))}
      </div>
      <ScrollBar orientation="horizontal" className="invisible" /> {/* Hide scrollbar visually if not desired, but keep functionality */}
    </ScrollArea>
  );
};

export default CategoryRow;
