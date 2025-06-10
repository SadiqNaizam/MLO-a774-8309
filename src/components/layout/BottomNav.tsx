import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Home, Apple, Search, ShoppingCart, User, LucideIcon } from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
  href: string;
}

const navigationItems: NavItem[] = [
  { id: 'home', label: 'Home', icon: Home, href: '/' },
  { id: 'shop', label: 'Shop', icon: Apple, href: '/shop' }, // Apple icon as per image
  { id: 'browse', label: 'Browse', icon: Search, href: '/browse' }, // Search for 'EQ' like icon
  { id: 'carts', label: 'Carts', icon: ShoppingCart, href: '/carts' },
  { id: 'account', label: 'Account', icon: User, href: '/account' },
];

interface BottomNavProps {
  className?: string;
  activeItemId?: string;
  onNavItemClick?: (itemId: string) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({
  className,
  activeItemId = 'home', // Default to 'home'
  onNavItemClick,
}) => {
  const [currentItemId, setCurrentItemId] = React.useState<string>(activeItemId);

  React.useEffect(() => {
    setCurrentItemId(activeItemId);
  }, [activeItemId]);

  const handleItemClick = React.useCallback(
    (itemId: string) => {
      setCurrentItemId(itemId);
      if (onNavItemClick) {
        onNavItemClick(itemId);
      }
      // console.log(`${itemId} clicked`);
    },
    [onNavItemClick]
  );

  return (
    <nav
      className={cn(
        'fixed bottom-0 left-0 right-0 z-40 h-16 border-t bg-background',
        'flex items-center justify-around',
        className
      )}
    >
      {navigationItems.map((item) => {
        const isActive = item.id === currentItemId;
        return (
          <Button
            key={item.id}
            variant="ghost"
            onClick={() => handleItemClick(item.id)}
            className={cn(
              'flex flex-col items-center justify-center h-full p-2 rounded-none',
              'text-xs font-medium w-1/5',
              isActive
                ? 'text-primary'
                : 'text-muted-foreground hover:text-primary/80',
              'transition-colors duration-150 ease-in-out'
            )}
            aria-label={item.label}
            aria-current={isActive ? 'page' : undefined}
          >
            <item.icon className={cn('h-5 w-5 mb-0.5', isActive ? 'text-primary' : '')} />
            {item.label}
          </Button>
        );
      })}
    </nav>
  );
};

export default BottomNav;
