import { SearchResult } from '../types';
import Papa from 'papaparse';

// Define the structure of a merchant from the CSV
export interface Merchant {
  cdf_merchant_id: string;
  offer_name: string;
  merchant_description: string;
  category: string;
  tags_with_attributes: string;
  offer_url: string;
  valid_from: string;
  valid_to: string;
  online: string;
  offer_title: string;
  Tags: string;
  city: string;
  country: string;
  brand_logos: string;
  curated_image: string;
  merchant_banner_image: string;
  offer_image: string;
  Wael?: string;
  Salama?: string;
  Khaleed?: string;
}

// Function to parse CSV data
export function parseCSV(csvText: string): Merchant[] {
  const results = Papa.parse(csvText, {
    header: true,
    skipEmptyLines: true
  });

  return results.data.map((row: any) => ({
    cdf_merchant_id: row.cdf_merchant_id || '',
    offer_name: row.offer_name || '',
    merchant_description: row.merchant_description || '',
    category: row.category || '',
    tags_with_attributes: row.tags_with_attributes || '',
    offer_url: row.offer_url || '',
    valid_from: row.valid_from || '',
    valid_to: row.valid_to || '',
    online: row.online || '',
    offer_title: row.offer_title || '',
    Tags: row.Tags || '',
    city: row.city || '',
    country: row.country || '',
    brand_logos: row.brand_logos || '',
    curated_image: row.curated_image || '',
    merchant_banner_image: row.merchant_banner_image || '',
    offer_image: row.offer_image || '',
    Wael: row.Wael || '',
    Salama: row.Salama || '',
    Khaleed: row.Khaleed || ''
  }));
}

// Function to convert Merchant to SearchResult
export function merchantToSearchResult(merchant: Merchant): SearchResult {
  return {
    id: merchant.cdf_merchant_id,
    type: merchant.category,
    title: merchant.offer_name,
    description: merchant.merchant_description,
    image: merchant.offer_image || merchant.curated_image || '',
    details: {
      priceRange: '', // Not available in CSV
      location: merchant.city,
      rating: 0, // Not available in CSV
      knownFor: merchant.Tags,
      deals: merchant.offer_title,
      relevance: '', // Not available in CSV
      narrative: '' // Not available in CSV
    },
    bookmarked: false
  };
}

// Function to get recommendations for a persona
export function getRecommendationsForPersona(persona: string, merchants: Merchant[]): SearchResult[] {
  const recommendations: SearchResult[] = [];
  
  // Get all merchants with 's' values for this persona
  const personaMerchants = merchants.filter(merchant => {
    const personaValue = merchant[persona as keyof Merchant] as string | undefined;
    return personaValue && personaValue.includes('s');
  });
  
  // Sort by s1, s2, etc.
  personaMerchants.sort((a, b) => {
    const aValue = a[persona as keyof Merchant] as string;
    const bValue = b[persona as keyof Merchant] as string;
    
    const aMatch = aValue.match(/s(\d+)/);
    const bMatch = bValue.match(/s(\d+)/);
    
    if (aMatch && bMatch) {
      return parseInt(aMatch[1]) - parseInt(bMatch[1]);
    }
    return 0;
  });
  
  // Convert to SearchResult
  return personaMerchants.map(merchantToSearchResult);
}

// Function to get search results for a persona and query
export function getSearchResultsForPersonaAndQuery(
  persona: string, 
  queryIndex: number, 
  merchants: Merchant[]
): SearchResult[] {
  const queryId = `q${queryIndex}`;
  
  // Get all merchants with this query ID for this persona
  const queryMerchants = merchants.filter(merchant => {
    const personaValue = merchant[persona as keyof Merchant] as string | undefined;
    return personaValue && personaValue.includes(queryId);
  });
  
  // Convert to SearchResult
  return queryMerchants.map(merchantToSearchResult);
}

// Function to load merchants data from CSV
export async function loadMerchantsData(): Promise<Merchant[]> {
  try {
    // In development, use the CSV file directly from the src/data directory
    const response = await fetch('/src/data/merchants.csv');
    if (!response.ok) {
      throw new Error(`Failed to load merchants data: ${response.statusText}`);
    }
    const csvText = await response.text();
    return parseCSV(csvText);
  } catch (error) {
    console.error('Error loading merchants data:', error);
    return [];
  }
} 