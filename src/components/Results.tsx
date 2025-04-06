import React from 'react';
import { useStore } from '../store';
import { ResultCard } from './ResultCard';

interface ResultsProps {
  isRecommendations?: boolean;
}

export const Results: React.FC<ResultsProps> = ({ isRecommendations = false }) => {
  const { results, recommendations } = useStore();
  const displayResults = isRecommendations ? recommendations : results;

  if (displayResults.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {displayResults.map((result) => (
        <ResultCard key={result.id} result={result} />
      ))}
    </div>
  );
};

const initialRecommendations = [
  {
    id: 'rec1',
    type: 'restaurant',
    title: 'Rooftop Garden Lounge',
    description: 'Farm-to-table dining with panoramic city views',
    image: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092',
    details: {
      priceRange: '$$$',
      location: 'Downtown',
      rating: 4.8,
      knownFor: ['Sunset Views', 'Craft Cocktails'],
      deals: ['Weekend Brunch Special'],
      relevance: 'Trending spot for urban dining experience',
    },
    bookmarked: false,
  },
  {
    id: 'rec2',
    type: 'event',
    title: 'Jazz in the Park',
    description: 'Weekly outdoor jazz performances with local artists',
    image: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629',
    details: {
      location: 'Central Park',
      priceRange: 'Free',
      knownFor: ['Live Music', 'Food Trucks'],
      deals: ['Happy Hour Specials'],
      relevance: 'Popular weekend activity',
    },
    bookmarked: false,
  },
  {
    id: 'rec3',
    type: 'shopping',
    title: 'Design District Market',
    description: 'Contemporary fashion and lifestyle boutiques',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8',
    details: {
      location: 'Arts District',
      priceRange: '$$',
      knownFor: ['Local Designers', 'Vintage Finds'],
      deals: ['First-Time Visitor Discount'],
      relevance: 'Curated shopping experience',
    },
    bookmarked: false,
  },
];

const additionalRecommendations = [
  {
    id: 'rec4',
    type: 'event',
    title: 'Sunset Yoga Session',
    description: 'Outdoor yoga classes with stunning city views',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773',
    details: {
      location: 'Skyline Park',
      priceRange: '$$',
      rating: 4.9,
      knownFor: ['Sunset Views', 'Meditation'],
      deals: ['First Class Free'],
      relevance: 'Perfect for wellness enthusiasts',
    },
    bookmarked: false,
  },
  {
    id: 'rec5',
    type: 'restaurant',
    title: 'Hidden Ramen Bar',
    description: 'Authentic Japanese ramen in a cozy setting',
    image: 'https://images.unsplash.com/photo-1557872943-16a5ac26437e',
    details: {
      location: 'East Side',
      priceRange: '$$',
      rating: 4.7,
      knownFor: ['Handmade Noodles', 'Craft Sake'],
      deals: ['Late Night Happy Hour'],
      relevance: 'Local favorite for authentic cuisine',
    },
    bookmarked: false,
  },
  {
    id: 'rec6',
    type: 'entertainment',
    title: 'Vintage Cinema Night',
    description: 'Classic films in an art deco theater',
    image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba',
    details: {
      location: 'Theater District',
      priceRange: '$',
      rating: 4.6,
      knownFor: ['Classic Movies', 'Historic Venue'],
      deals: ['Thursday Double Features'],
      relevance: 'Unique entertainment experience',
    },
    bookmarked: false,
  },
  {
    id: 'rec7',
    type: 'activity',
    title: 'Urban Art Workshop',
    description: 'Learn street art techniques from local artists',
    image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b',
    details: {
      location: 'Creative Quarter',
      priceRange: '$$',
      rating: 4.8,
      knownFor: ['Hands-on Learning', 'Local Artists'],
      deals: ['Group Discounts'],
      relevance: 'Creative experience',
    },
    bookmarked: false,
  },
  {
    id: 'rec8',
    type: 'cafe',
    title: 'Botanical Coffee Lab',
    description: 'Specialty coffee in a greenhouse setting',
    image: 'https://images.unsplash.com/photo-1525480122447-9f7426e5c797',
    details: {
      location: 'Garden District',
      priceRange: '$$',
      rating: 4.9,
      knownFor: ['Single Origin Coffee', 'Plant Shop'],
      deals: ['Morning Coffee Flights'],
      relevance: 'Instagram-worthy spot',
    },
    bookmarked: false,
  }
];