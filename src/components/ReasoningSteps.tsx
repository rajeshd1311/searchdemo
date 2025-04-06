import React, { useState, useEffect } from 'react';
import { Brain, CheckCircle, Loader, ChevronDown, ChevronUp } from 'lucide-react';
import { useStore } from '../store';
import { clsx } from 'clsx';

export const ReasoningSteps: React.FC = () => {
  const { reasoningSteps } = useStore();
  const [isExpanded, setIsExpanded] = useState(true);
  const isComplete = reasoningSteps.every((step) => step.status === 'complete');

  // Auto-collapse when all steps are complete
  useEffect(() => {
    if (isComplete) {
      const timer = setTimeout(() => setIsExpanded(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [isComplete]);

  if (reasoningSteps.length === 0) return null;

  return (
    <div className="w-full max-w-3xl">
      <div 
        className={clsx(
          "transition-all duration-500 ease-in-out",
          isComplete ? "opacity-80 hover:opacity-100" : "opacity-100"
        )}
      >
        <div className={clsx(
          "backdrop-blur-sm bg-[#282828]/90 rounded-lg shadow-lg overflow-hidden transition-all duration-300",
          isComplete ? "bg-opacity-80" : "bg-opacity-90"
        )}>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-[#383838]/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Brain className="text-[#1DB954]" size={20} />
              <h2 className="text-base font-medium text-white/90">
                Thinking Process
                {isComplete && (
                  <span className="text-sm text-[#1DB954]/90 ml-2 font-normal">
                    • Complete
                  </span>
                )}
              </h2>
            </div>
            {isExpanded ? (
              <ChevronUp className="text-white/60" size={18} />
            ) : (
              <ChevronDown className="text-white/60" size={18} />
            )}
          </button>
          
          <div
            className={clsx(
              'transition-all duration-500 ease-in-out overflow-hidden',
              isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            )}
          >
            <div className="px-6 pb-4 space-y-3">
              {reasoningSteps.map((step) => (
                <div
                  key={step.id}
                  className={clsx(
                    'flex items-center gap-3 text-sm transition-opacity duration-300',
                    step.status === 'complete' 
                      ? 'text-[#1DB954]/90' 
                      : 'text-white/70'
                  )}
                >
                  {step.status === 'complete' ? (
                    <CheckCircle size={16} className="text-[#1DB954]/90" />
                  ) : (
                    <Loader size={16} className="animate-spin text-[#1DB954]/90" />
                  )}
                  <span className="font-light">{step.description}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};