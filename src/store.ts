import { create } from 'zustand';
import type { SearchState, Profile } from './types';
import { mockSearch } from './mockData';
import { loadMerchantsData, getRecommendationsForPersona, getSearchResultsForPersonaAndQuery } from './data/merchants';

// Define the persona-specific search queries
const personaQueries = {
  'Wael': [
    'Show me the best deals on luxury watches in UAE',
    'I want to hangout with my friends in some Trendy cafes in Dubai. Show me what you have',
    'I need to travel to Sharjah. Give me the best offers on hotels',
    'Discounts on mens clothing and branded electronics'
  ],
  'Salama': [
    'Family-friendly restaurants in Abu Dhabi with kids play areas',
    'Best deals on family clothing and matching outfits in Abu Dhabi',
    'Affordable cosmetics and skincare offers',
    'Jewelry collections for special occasions with discounts'
  ],
  'Khaleed': [
    'Fine dining restaurants in Sharjah for special occasions',
    'Luxury furniture and home furnishing deals',
    'Discounts on branded mens clothing',
    'Seafood options in Sharjah'
  ]
};

export const useStore = create<SearchState>((set, get) => ({
  query: '',
  isSearching: false,
  reasoningSteps: [],
  results: [],
  bookmarks: [],
  selectedResult: null,
  selectedProfile: null,
  recommendations: [],
  merchantsData: [],
  
  // Load merchants data when the app starts
  loadMerchantsData: async () => {
    const merchantsData = await loadMerchantsData();
    set({ merchantsData });
    
    // If a profile is already selected, load its recommendations
    const { selectedProfile } = get();
    if (selectedProfile) {
      const recommendations = getRecommendationsForPersona(selectedProfile.name, merchantsData);
      set({ recommendations });
    }
  },
  
  setQuery: (query) => set({ query }),
  
  startSearch: () => {
    const { selectedProfile, query, merchantsData } = get();
    
    if (!selectedProfile || !merchantsData.length) {
      // Fallback to mock search if no profile is selected or data isn't loaded
      set({ isSearching: true, reasoningSteps: [], results: [] });
      mockSearch(set);
      return;
    }
    
    // Find which query this matches
    const queries = personaQueries[selectedProfile.name as keyof typeof personaQueries] || [];
    const queryIndex = queries.findIndex(q => 
      query.toLowerCase().includes(q.toLowerCase().split(' ').slice(0, 3).join(' '))
    );
    
    if (queryIndex === -1) {
      // If no matching query found, use mock search
      set({ isSearching: true, reasoningSteps: [], results: [] });
      mockSearch(set);
      return;
    }
    
    // Use persona-specific search
    set({ isSearching: true, reasoningSteps: [], results: [] });
    
    // Simulate reasoning steps
    const reasoningSteps = [
      { id: '1', description: 'Analyzing your search patterns and preferences', status: 'pending' },
      { id: '2', description: 'Searching local and trending activities', status: 'pending' },
      { id: '3', description: 'Checking real-time availability and deals', status: 'pending' },
      { id: '4', description: 'Personalizing recommendations based on your interests', status: 'pending' }
    ];
    
    // Add reasoning steps one by one with delay
    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < reasoningSteps.length) {
        set(state => ({
          reasoningSteps: [
            ...state.reasoningSteps, 
            { ...reasoningSteps[currentStep], status: 'pending' }
          ]
        }));
        
        // Mark step as complete after a delay
        setTimeout(() => {
          set(state => ({
            reasoningSteps: state.reasoningSteps.map(s => 
              s.id === reasoningSteps[currentStep].id ? { ...s, status: 'complete' } : s
            )
          }));
        }, 1000);
        
        currentStep++;
      } else {
        clearInterval(interval);
        
        // Get results for this persona and query
        const results = getSearchResultsForPersonaAndQuery(
          selectedProfile.name, 
          queryIndex + 1, 
          merchantsData
        );
        
        set({ results, isSearching: false });
      }
    }, 1000);
  },
  
  completeSearch: () => set({ isSearching: false }),
  
  clearSearch: () => set({ query: '', results: [], reasoningSteps: [] }),
  
  toggleBookmark: (id) =>
    set((state) => ({
      bookmarks: state.bookmarks.includes(id)
        ? state.bookmarks.filter((b) => b !== id)
        : [...state.bookmarks, id],
      results: state.results.map((result) =>
        result.id === id
          ? { ...result, bookmarked: !result.bookmarked }
          : result
      ),
    })),
  
  setSelectedResult: (result) => set({ selectedResult: result }),
  
  setSelectedProfile: (profile) => {
    set({ selectedProfile: profile });
    
    // Load recommendations for the selected profile
    const { merchantsData } = get();
    if (merchantsData.length && profile) {
      const recommendations = getRecommendationsForPersona(profile.name, merchantsData);
      set({ recommendations });
    }
  },
}));