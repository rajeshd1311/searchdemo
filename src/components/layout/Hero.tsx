import React from 'react';
import { Sparkles, UserCircle2 } from 'lucide-react';
import { Container } from './Container';
import { useStore } from '../../store';

export const Hero: React.FC = () => {
  const { selectedProfile, setSelectedProfile } = useStore();

  return (
    <div className="relative">
      {/* Background Elements */}
      <div className="absolute inset-0 h-[500px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1DB954]/20 via-transparent to-[#121212]" />
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `url('https://images.pexels.com/photos/20317596/pexels-photo-20317596/free-photo-of-a-narrow-street-with-blue-buildings-and-shops.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center 40%',
            opacity: 0.6,
          }} 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent" />
        
        {/* Animated gradient orbs */}
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-[#1DB954]/20 rounded-full filter blur-3xl animate-pulse" />
        <div className="absolute top-40 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Content */}
      <Container className="relative">
        <div className="pt-24 pb-12">
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Sparkles className="text-[#1DB954] drop-shadow-lg" size={32} />
              <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
                Lifestyle Search
              </h1>
            </div>
            <div className="flex items-center gap-3 mb-6">
              <button
                onClick={() => setSelectedProfile(null)}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#282828] hover:bg-[#383838] transition-colors"
              >
                <UserCircle2 size={20} className="text-[#1DB954]" />
                <span className="text-white">{selectedProfile?.name}</span>
              </button>
            </div>
            <p className="text-lg md:text-xl text-gray-100 max-w-2xl font-medium drop-shadow-lg">
              Discover personalized recommendations for your perfect day
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
};