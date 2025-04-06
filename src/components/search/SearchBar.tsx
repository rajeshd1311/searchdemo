import React, { KeyboardEvent } from 'react';
import { Search } from 'lucide-react';
import { useStore } from '../../store';

export const SearchBar: React.FC = () => {
  const { query, setQuery, startSearch } = useStore();

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      startSearch();
    }
  };

  return (
    <div className="relative w-full max-w-3xl">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="What would you like to do today?"
        className="w-full px-6 py-4 text-lg rounded-full bg-[#282828] text-white border-none focus:outline-none focus:ring-2 focus:ring-[#1DB954] transition-all pr-12 placeholder-gray-400"
      />
      <button
        onClick={startSearch}
        className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-[#1DB954] transition-colors"
      >
        <Search size={24} />
      </button>
    </div>
  );
};