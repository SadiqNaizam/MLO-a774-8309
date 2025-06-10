import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ChevronDown, Search, Bell, User, MapPin } from 'lucide-react';

interface HeaderBarProps {
  className?: string;
  currentLocation?: string;
  onLocationClick?: () => void;
  onSearchClick?: () => void;
  onNotificationsClick?: () => void;
  onProfileClick?: () => void;
}

const HeaderBar: React.FC<HeaderBarProps> = ({
  className,
  currentLocation = '633 Rose Ave',
  onLocationClick,
  onSearchClick,
  onNotificationsClick,
  onProfileClick,
}) => {
  const handleLocationClick = React.useCallback(() => {
    if (onLocationClick) onLocationClick();
    // console.log('Location clicked');
  }, [onLocationClick]);

  const handleSearchClick = React.useCallback(() => {
    if (onSearchClick) onSearchClick();
    // console.log('Search clicked');
  }, [onSearchClick]);

  const handleNotificationsClick = React.useCallback(() => {
    if (onNotificationsClick) onNotificationsClick();
    // console.log('Notifications clicked');
  }, [onNotificationsClick]);

  const handleProfileClick = React.useCallback(() => {
    if (onProfileClick) onProfileClick();
    // console.log('Profile clicked');
  }, [onProfileClick]);

  return (
    <header
      className={cn(
        'sticky top-0 z-40 w-full border-b bg-background h-16',
        className
      )}
    >
      <div className="flex items-center justify-between px-4 h-full">
        {/* Left: Delivery Location */}
        <button
          onClick={handleLocationClick}
          className="flex flex-col items-start group text-left min-w-0 pr-2" // min-w-0 for truncation
        >
          <span className="text-xs text-muted-foreground group-hover:text-primary transition-colors">
            Deliver now
          </span>
          <div className="flex items-center">
            {/* Icon can be added if desired, e.g. MapPin */}
            {/* <MapPin className="mr-1 h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" /> */}
            <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors truncate">
              {currentLocation}
            </span>
            <ChevronDown className="ml-1 h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
          </div>
        </button>

        {/* Middle: Search Bar */}
        <div className="flex-1 mx-2 sm:mx-4 min-w-0"> {/* min-w-0 for flex child truncation issues */}
          <button
            onClick={handleSearchClick}
            aria-label="Search Postmates"
            className="flex items-center w-full bg-secondary hover:bg-secondary/80 rounded-full px-3 h-9 text-sm text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none transition-colors truncate"
          >
            <Search className="mr-2 h-4 w-4 flex-shrink-0" />
            Search Postmates
          </button>
        </div>

        {/* Right: Action Buttons */}
        <div className="flex items-center space-x-1 sm:space-x-2">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Notifications"
            onClick={handleNotificationsClick}
            className="text-foreground hover:text-primary transition-colors"
          >
            <Bell className="h-5 w-5 sm:h-6 sm:w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            aria-label="User Profile"
            onClick={handleProfileClick}
            className="text-foreground hover:text-primary transition-colors hidden sm:flex" // Hide on extra small screens based on hierarchy notes vs image
          >
            <User className="h-5 w-5 sm:h-6 sm:w-6" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default HeaderBar;
