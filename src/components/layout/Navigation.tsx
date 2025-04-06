import React from 'react';
import { UserCircle2, ArrowLeft } from 'lucide-react';
import { Container } from './Container';
import { SearchBar } from '../search/SearchBar';
import { ReasoningSteps } from '../search/ReasoningSteps';
import { useStore } from '../../store';

export const Navigation: React.FC = () => {
  const { results, selectedProfile, setSelectedProfile, clearSearch } = useStore();
  const isCollapsed = results.length > 0;

  return (
    <div 
      className={`
        w-full bg-[#121212]/95 backdrop-blur-sm fixed top-0 left-0 z-50
        transition-all duration-300 ease-in-out
        ${isCollapsed ? 'py-4' : 'py-8'}
      `}
    >
      <Container>
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-4">
            <button
              onClick={clearSearch}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#282828] hover:bg-[#383838] transition-all duration-300 hover:scale-105"
            >
              <ArrowLeft size={20} className="text-[#1DB954]" />
              <span className="text-white">Back</span>
            </button>
            <button
              onClick={() => setSelectedProfile(null)}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#282828] hover:bg-[#383838] transition-all duration-300 hover:scale-105"
            >
              <UserCircle2 size={20} className="text-[#1DB954]" />
              <span className="text-white">{selectedProfile?.name}</span>
            </button>
          </div>
          
          <div className="flex-1">
            <SearchBar />
          </div>
          
          <div className="flex-shrink-0">
            <ReasoningSteps compact={isCollapsed} />
          </div>
        </div>
      </Container>
    </div>
  );
};