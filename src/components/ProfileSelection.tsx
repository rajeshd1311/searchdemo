import React from 'react';
import { UserCircle2 } from 'lucide-react';
import { Profile } from '../types';
import { useStore } from '../store';
import { Container } from './layout/Container';

const profiles: Profile[] = [
  {
    id: '1',
    name: 'Wael',
    description: 'Male, 32, Lives in Dubai\nAvid traveller, frequents cafes and lounges, Spends ~AED 13K+ per month; primarily in electronics, clothing & watches',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d',
    interests: ['Travel', 'Cafes', 'Electronics', 'Fashion', 'Watches'],
  },
  {
    id: '2',
    name: 'Salama',
    description: 'Female, 36\nMother of a child. Prefers to visit family friendly restaurants. Spends ~AED 18K+ per month; primarily in school fees, family clothing, jewellery & cosmetics',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb',
    interests: ['Family Dining', 'Education', 'Fashion', 'Jewellery', 'Cosmetics'],
  },
  {
    id: '3',
    name: 'Khaleed',
    description: 'Male, 44, Lives in Sharjah\nFrequents at premium, fine-dining restaurants.\nSpends ~AED 25K+ per month; primarily in dining, clothing, furniture & home furnishing',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
    interests: ['Fine Dining', 'Fashion', 'Furniture', 'Home Furnishing', 'Premium Experiences'],
  },
];

export const ProfileSelection: React.FC = () => {
  const { setSelectedProfile } = useStore();

  return (
    <div className="min-h-screen bg-[#121212]">
      <Container>
        <div className="py-16 flex flex-col items-center">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <UserCircle2 className="text-[#1DB954]" size={40} />
              <h1 className="text-4xl font-bold text-white">Choose Your Profile</h1>
            </div>
            <p className="text-gray-400 text-lg">
              Select a profile to get personalized recommendations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
            {profiles.map((profile) => (
              <button
                key={profile.id}
                onClick={() => setSelectedProfile(profile)}
                className="group bg-[#282828] rounded-xl overflow-hidden transition-transform hover:scale-[1.02] hover:shadow-xl"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={profile.image}
                    alt={profile.name}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-semibold text-white group-hover:text-[#1DB954] transition-colors">
                    {profile.name}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {profile.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {profile.interests.map((interest, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 text-xs rounded-full bg-[#1DB954]/10 text-[#1DB954]"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};