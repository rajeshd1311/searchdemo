export interface SearchResult {
  id: string;
  type: string;
  title: string;
  description: string;
  image: string;
  details: {
    priceRange?: string;
    location?: string;
    rating?: number;
    knownFor?: string;
    deals?: string;
    relevance?: string;
    narrative?: string;
  };
  bookmarked: boolean;
}

export interface ReasoningStep {
  id: string;
  description: string;
  status: 'pending' | 'complete' | 'error';
}

export interface Profile {
  id: string;
  name: string;
  description: string;
  image: string;
  interests: string[];
}

export interface SearchState {
  query: string;
  isSearching: boolean;
  reasoningSteps: ReasoningStep[];
  results: SearchResult[];
  bookmarks: string[];
  selectedResult: SearchResult | null;
  selectedProfile: Profile | null;
  recommendations: SearchResult[];
  merchantsData: any[];
  setQuery: (query: string) => void;
  startSearch: () => void;
  completeSearch: () => void;
  clearSearch: () => void;
  toggleBookmark: (id: string) => void;
  setSelectedResult: (result: SearchResult | null) => void;
  setSelectedProfile: (profile: Profile | null) => void;
  loadMerchantsData: () => Promise<void>;
}