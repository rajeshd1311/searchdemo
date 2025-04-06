import React from 'react';
import { Bookmark, MapPin, Star, Tag } from 'lucide-react';
import { SearchResult } from '../types';
import { useStore } from '../store';
import { clsx } from 'clsx';

interface ResultCardProps {
  result: SearchResult;
  featured?: boolean;
  tall?: boolean;
  wide?: boolean;
}

export const ResultCard: React.FC<ResultCardProps> = ({ result, featured, tall, wide }) => {
  const { toggleBookmark, setSelectedResult } = useStore();

  if (!result) return null;

  return (
    <div 
      onClick={() => setSelectedResult(result)}
      className={clsx(
        "group relative overflow-hidden rounded-lg cursor-pointer transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl h-full",
        featured && "aspect-square md:aspect-auto",
        tall && "aspect-[3/4] md:aspect-auto",
        wide && "aspect-video md:aspect-auto"
      )}
    >
      {/* Background Image */}
      <div className="relative h-full">
        <img
          src={result.image}
          alt={result.title}
          className={clsx(
            "w-full h-full object-cover",
            featured && "object-center",
            tall && "object-center",
            wide && "object-center"
          )}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity group-hover:opacity-90" />
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 p-4 flex flex-col justify-end">
        {/* Bookmark Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleBookmark(result.id);
          }}
          className={clsx(
            'absolute top-3 right-3 p-2 rounded-full transition-all',
            result.bookmarked
              ? 'bg-[#1DB954] text-white'
              : 'bg-black/50 text-gray-300 hover:bg-black/70'
          )}
        >
          <Bookmark size={18} />
        </button>

        {/* Main Content */}
        <div className="space-y-2">
          {/* Title and Rating */}
          <div className="flex items-start justify-between gap-2">
            <h3 className={clsx(
              "font-semibold text-white group-hover:text-[#1DB954] transition-colors",
              featured ? "text-xl" : "text-lg"
            )}>
              {result.title}
            </h3>
            {result.details.rating && (
              <div className="flex items-center gap-1 bg-black/50 px-2 py-1 rounded-full">
                <Star size={14} className="text-[#1DB954]" />
                <span className="text-sm text-white">{result.details.rating}</span>
              </div>
            )}
          </div>

          {/* Location and Price */}
          <div className="flex items-center gap-3 text-sm text-gray-300">
            {result.details.location && (
              <div className="flex items-center gap-1">
                <MapPin size={14} className="text-[#1DB954]" />
                <span>{result.details.location}</span>
              </div>
            )}
            {result.details.priceRange && (
              <div className="flex items-center gap-1">
                <Tag size={14} className="text-[#1DB954]" />
                <span>{result.details.priceRange}</span>
              </div>
            )}
          </div>

          {/* Deals Preview */}
          {result.details.deals && result.details.deals.length > 0 && (
            <div className="bg-[#1DB954]/10 text-[#1DB954] text-sm px-3 py-1 rounded-full inline-block">
              {result.details.deals[0]}
              {result.details.deals.length > 1 && (
                <span className="ml-1">+{result.details.deals.length - 1} more</span>
              )}
            </div>
          )}
        </div>

        {/* Hover Indicator */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#1DB954] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
      </div>
    </div>
  );
};