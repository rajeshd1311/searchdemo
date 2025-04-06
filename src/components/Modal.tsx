import React from 'react';
import { X, ExternalLink, MapPin, Calendar, Clock, Tag, Star, Share2, MessageCircle } from 'lucide-react';
import { SearchResult } from '../types';
import { clsx } from 'clsx';

interface ModalProps {
  result: SearchResult;
  isOpen: boolean;
  onClose: () => void;
}

export const Modal: React.FC<ModalProps> = ({ result, isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleShare = async () => {
    try {
      await navigator.share({
        title: result.title,
        text: result.description,
        url: window.location.href,
      });
    } catch (err) {
      console.log('Sharing failed', err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-[#282828] rounded-xl shadow-xl w-full max-w-3xl overflow-hidden">
          {/* Header Image */}
          <div className="relative h-64 md:h-80">
            <img
              src={result.image}
              alt={result.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#282828] to-transparent opacity-60" />
            
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">{result.title}</h2>
              <p className="text-gray-300">{result.description}</p>
            </div>

            {/* AI Narrative */}
            {result.details.narrative && (
              <div className="bg-[#1DB954]/5 rounded-lg p-4 border border-[#1DB954]/10">
                <div className="flex items-start gap-3">
                  <MessageCircle size={20} className="text-[#1DB954] mt-1" />
                  <div className="space-y-2">
                    <h3 className="text-sm font-semibold text-[#1DB954]">Why I Recommend This</h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {result.details.narrative}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {result.details.location && (
                <div className="flex items-center gap-2 text-gray-300">
                  <MapPin size={18} className="text-[#1DB954]" />
                  <span>{result.details.location}</span>
                </div>
              )}
              {result.details.priceRange && (
                <div className="flex items-center gap-2 text-gray-300">
                  <Tag size={18} className="text-[#1DB954]" />
                  <span>{result.details.priceRange}</span>
                </div>
              )}
              {result.details.rating && (
                <div className="flex items-center gap-2 text-gray-300">
                  <Star size={18} className="text-[#1DB954]" />
                  <span>{result.details.rating} / 5</span>
                </div>
              )}
            </div>

            {/* Known For Tags */}
            {result.details.knownFor && (
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-white">Known For</h3>
                <div className="flex flex-wrap gap-2">
                  {result.details.knownFor.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 rounded-full bg-[#1DB954]/10 text-[#1DB954] text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Deals Section */}
            {result.details.deals && result.details.deals.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-white">Current Deals</h3>
                <div className="space-y-2">
                  {result.details.deals.map((deal, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 text-[#1DB954] text-sm"
                    >
                      <span>•</span>
                      <span>{deal}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 pt-4">
              <button className="flex-1 bg-[#1DB954] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#1ed760] transition-colors flex items-center justify-center gap-2">
                <ExternalLink size={18} />
                Visit Website
              </button>
              <button
                onClick={handleShare}
                className="px-6 py-3 rounded-lg font-medium border border-[#1DB954] text-[#1DB954] hover:bg-[#1DB954]/10 transition-colors flex items-center justify-center gap-2"
              >
                <Share2 size={18} />
                Share
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};