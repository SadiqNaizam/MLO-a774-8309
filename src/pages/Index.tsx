import React from 'react';
import MainAppLayout from '@/components/layout/MainAppLayout';
import CategoryRow from '@/components/HomeDashboard/CategoryRow';
import SectionHeader from '@/components/HomeDashboard/SectionHeader';
import RestaurantCard, { RestaurantCardData } from '@/components/HomeDashboard/RestaurantCard';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

// Define dummy data for restaurant cards
// Using 'as const' for readonly arrays to ensure type safety and immutability for props
const onlyAvailableHereData: readonly RestaurantCardData[] = [
  {
    id: 'sugarfish',
    name: 'SUGARFISH',
    imageUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3VzaGl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=400&h=225&q=80',
    deliveryTime: '20-30 min',
    ratingText: 'Best Overall',
    uberOneBenefits: true,
    isFavorite: true, // Initial favorite state
  },
  {
    id: 'uovo',
    name: 'Uovo',
    imageUrl: 'https://images.unsplash.com/photo-1595295333158-4742f28fbd85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGFzdGF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=400&h=225&q=80',
    deliveryTime: '30-40 min',
    ratingText: 'Best Overall',
    uberOneBenefits: true,
    isFavorite: false,
  },
  {
    id: 'joes-pizza',
    name: "Joe's Pizza",
    imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGl6emF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=400&h=225&q=80',
    deliveryTime: '25-35 min',
    ratingText: '4.7',
    uberOneBenefits: false,
    isFavorite: false,
  },
] as const;

const featuredOnPostmatesData: readonly RestaurantCardData[] = [
  {
    id: 'goop-kitchen',
    name: 'goop kitchen',
    imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8c2FsYWR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=400&h=225&q=80',
    deliveryTime: '15-25 min',
    ratingText: 'Healthy Pick',
    uberOneBenefits: true,
    isFavorite: true,
  },
  {
    id: 'shake-shack',
    name: 'Shake Shack',
    imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YnVyZ2VyfGVufDB8fDB8fHww&auto=format&fit=crop&w=400&h=225&q=80',
    deliveryTime: '20-30 min',
    ratingText: '4.8',
    uberOneBenefits: false,
    isFavorite: false,
  },
  {
    id: 'sweetgreen',
    name: 'Sweetgreen',
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aGVhbHRoeSUyMGZvb2R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=400&h=225&q=80',
    deliveryTime: '25-35 min',
    ratingText: 'Top Rated',
    uberOneBenefits: true,
    isFavorite: true,
  },
] as const;

const IndexPage: React.FC = () => {
  // Memoize combined restaurant data for initializing favorites state
  const allRestaurants = React.useMemo(() => [...onlyAvailableHereData, ...featuredOnPostmatesData], []);

  // Initialize page-level state for favorites from dummy data
  const initialFavorites = React.useMemo(() => {
    const favs: Record<string, boolean> = {};
    allRestaurants.forEach(r => {
      if (r.isFavorite) {
        favs[r.id] = true;
      }
    });
    return favs;
  }, [allRestaurants]);

  const [favorites, setFavorites] = React.useState<Record<string, boolean>>(initialFavorites);

  // Callback to handle toggling favorite status
  const handleToggleFavorite = React.useCallback((restaurantId: string) => {
    setFavorites(prev => {
      const newFavs = { ...prev, [restaurantId]: !prev[restaurantId] };
      // console.log(`Toggled favorite for ${restaurantId}. New state: ${newFavs[restaurantId]}`);
      return newFavs;
    });
  }, []);

  // Callback for when a restaurant card is clicked
  const handleRestaurantClick = React.useCallback((restaurantId: string) => {
    // console.log(`Restaurant ${restaurantId} clicked.`);
    // In a real app, this would likely navigate to a restaurant detail page
    // e.g., using react-router-dom: navigate(`/restaurant/${restaurantId}`);
  }, []);
  
  // Callback for when a category is selected
  const handleCategorySelect = React.useCallback((categoryId: string) => {
    // console.log(`Category ${categoryId} selected.`);
    // In a real app, this might filter results or navigate to a category page
  }, []);

  // Callback for header actions
  const handleHeaderAction = React.useCallback((actionName: string) => {
    // console.log(`Header action: ${actionName}`);
    // Placeholder for actions like opening location modal, search page, notifications, or profile page
  }, []);

  return (
    <MainAppLayout
      headerProps={{
        currentLocation: "633 Rose Ave",
        onLocationClick: () => handleHeaderAction('Location'),
        onSearchClick: () => handleHeaderAction('Search'),
        onNotificationsClick: () => handleHeaderAction('Notifications'),
        onProfileClick: () => handleHeaderAction('Profile'),
      }}
      bottomNavProps={{
        activeItemId: "home", // Set 'home' as active for the index page
        onNavItemClick: (itemId) => handleHeaderAction(`BottomNav-${itemId}`), // Example of handling nav item clicks
      }}
    >
      {/* Main content area with vertical spacing between sections */}
      {/* pb-16 for bottom padding, so content scrolls above fixed BottomNav */}
      <div className="flex flex-col space-y-6 pb-16">
        <CategoryRow 
          onCategorySelect={handleCategorySelect} 
          // Apply negative margins to make CategoryRow's background span full width 
          // of its padded container. Its internal p-4 then aligns content with page padding.
          className="-mx-4 sm:-mx-6 lg:-mx-8" 
        />

        <section aria-labelledby="only-available-here-heading">
          <SectionHeader
            id="only-available-here-heading"
            title="Only available here"
            onActionClick={() => console.log('View all: Only available here')} // Placeholder action
            className="px-0" // Remove SectionHeader's own horizontal padding
          />
          <ScrollArea className="w-full whitespace-nowrap">
            {/* Horizontal list of restaurant cards */}
            <div className="flex space-x-4 pt-2 pb-1">
              {onlyAvailableHereData.map((restaurant) => (
                <RestaurantCard
                  key={restaurant.id}
                  {...restaurant}
                  isFavorite={!!favorites[restaurant.id]} // Reflect page-level favorite state
                  className="w-64 flex-shrink-0 sm:w-72" // Responsive card width
                  onToggleFavorite={handleToggleFavorite}
                  onClick={handleRestaurantClick}
                />
              ))}
            </div>
            <ScrollBar orientation="horizontal" className="invisible" />
          </ScrollArea>
        </section>

        <section aria-labelledby="featured-on-postmates-heading">
          <SectionHeader
            id="featured-on-postmates-heading"
            title="Featured on Postmates"
            onActionClick={() => console.log('View all: Featured on Postmates')} // Placeholder action
            className="px-0" // Align with page padding
          />
          <ScrollArea className="w-full whitespace-nowrap">
            <div className="flex space-x-4 pt-2 pb-1">
              {featuredOnPostmatesData.map((restaurant) => (
                <RestaurantCard
                  key={restaurant.id}
                  {...restaurant}
                  isFavorite={!!favorites[restaurant.id]}
                  className="w-64 flex-shrink-0 sm:w-72"
                  onToggleFavorite={handleToggleFavorite}
                  onClick={handleRestaurantClick}
                />
              ))}
            </div>
            <ScrollBar orientation="horizontal" className="invisible" />
          </ScrollArea>
        </section>
        
        {/* Additional sections (e.g., All Restaurants, Promotions) can be added here */}

      </div>
    </MainAppLayout>
  );
};

export default IndexPage;
