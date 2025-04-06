import type { SearchState, SearchResult, ReasoningStep } from './types';
import { SetState } from 'zustand';

const mockResults: SearchResult[] = [
  {
    id: '1',
    type: 'restaurant',
    title: 'The Urban Kitchen',
    description: 'Modern fusion cuisine in a contemporary setting',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4',
    details: {
      priceRange: '$$$',
      location: 'Downtown',
      rating: 4.5,
      knownFor: ['Fusion Tacos', 'Craft Cocktails'],
      deals: ['Happy Hour 4-6pm'],
      relevance: 'Matches your preference for fusion cuisine and ambiance',
      narrative: "I've selected The Urban Kitchen specifically for its unique blend of traditional and modern culinary techniques. The restaurant's downtown location makes it perfect for both casual dining and special occasions. Their fusion tacos are a standout dish that combines local ingredients with global flavors, and the craft cocktail program is consistently rated as one of the best in the city. The 4-6pm happy hour is particularly popular among young professionals, offering an excellent opportunity to try their signature dishes at reduced prices. The contemporary setting, with its industrial-chic design and warm lighting, creates an atmosphere that's both sophisticated and welcoming."
    },
    bookmarked: false,
  },
  {
    id: '2',
    type: 'event',
    title: 'Summer Night Market',
    description: 'Local vendors, live music, and street food',
    image: 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e',
    details: {
      location: 'Riverside Park',
      priceRange: 'Free Entry',
      knownFor: ['Local Artisans', 'Food Trucks'],
      deals: ['Early Bird Special'],
      relevance: 'Trending event in your area',
      narrative: "The Summer Night Market is more than just a regular market - it's a vibrant community gathering that brings together the city's best local talent. Taking place in the scenic Riverside Park, this event creates a magical atmosphere as the sun sets. I recommend this because it offers a perfect blend of entertainment, dining, and shopping. The food trucks feature an eclectic mix of cuisines, from traditional street food to innovative fusion dishes. Local artisans showcase handcrafted jewelry, artwork, and unique gifts. The early bird special gives you first access to the vendors and the best selection of goods. The live music lineup features local bands, creating an energetic yet laid-back atmosphere perfect for a summer evening."
    },
    bookmarked: false,
  },
  {
    id: '3',
    type: 'shopping',
    title: 'Artisan Market',
    description: 'Curated collection of handmade goods',
    image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc',
    details: {
      location: 'Historic District',
      priceRange: '$$',
      knownFor: ['Handcrafted Jewelry', 'Local Art'],
      deals: ['10% Off First Purchase'],
      relevance: 'Matches your interest in unique shopping experiences',
      narrative: "I've highlighted the Artisan Market because it offers a shopping experience that goes beyond the ordinary. Located in the charming Historic District, this market carefully curates its vendors to ensure a high-quality selection of handmade goods. The space itself is housed in a beautifully restored building that adds to the authentic artisanal atmosphere. Each piece of jewelry and artwork comes with a story, and the artisans are often on-site to share their creative process. The 10% first purchase discount is a great way to start your collection of unique pieces. What makes this market special is its commitment to supporting local artists while providing shoppers with one-of-a-kind items that you won't find in conventional stores."
    },
    bookmarked: false,
  },
];

const reasoningSteps: ReasoningStep[] = [
  {
    id: '1',
    description: 'Analyzing your search patterns and preferences',
    status: 'pending',
  },
  {
    id: '2',
    description: 'Searching local and trending activities',
    status: 'pending',
  },
  {
    id: '3',
    description: 'Checking real-time availability and deals',
    status: 'pending',
  },
  {
    id: '4',
    description: 'Personalizing recommendations based on your interests',
    status: 'pending',
  },
];

export const mockSearch = async (set: SetState<SearchState>) => {
  for (const step of reasoningSteps) {
    set((state) => ({
      reasoningSteps: [...state.reasoningSteps, { ...step, status: 'pending' }],
    }));
    await new Promise((resolve) => setTimeout(resolve, 1000));
    set((state) => ({
      reasoningSteps: state.reasoningSteps.map((s) =>
        s.id === step.id ? { ...s, status: 'complete' } : s
      ),
    }));
  }

  set({ results: mockResults });
  set({ isSearching: false });
};