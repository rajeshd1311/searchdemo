import React from 'react';
import { Compass } from 'lucide-react';
import { SearchBar } from './SearchBar';
import { ReasoningSteps } from './ReasoningSteps';
import { Results } from '../Results';
import { useStore } from '../../store';
import { Container } from '../layout/Container';
import { Navigation } from '../layout/Navigation';
import { Hero } from '../layout/Hero';
import { CSSTransition, SwitchTransition } from 'react-transition-group';

export const SearchSection: React.FC = () => {
  const { results } = useStore();
  const showResults = results.length > 0;

  return (
    <>
      <CSSTransition
        in={showResults}
        timeout={400}
        classNames="nav-slide"
        unmountOnExit
      >
        <Navigation />
      </CSSTransition>

      <SwitchTransition mode="out-in">
        <CSSTransition
          key={showResults ? 'results' : 'initial'}
          timeout={300}
          classNames="page"
        >
          <div>
            {showResults ? (
              <Container>
                <div className="pt-24">
                  <CSSTransition
                    in={showResults}
                    timeout={400}
                    classNames="content-fade"
                    appear
                  >
                    <div className="w-full py-6">
                      <Results />
                    </div>
                  </CSSTransition>
                </div>
              </Container>
            ) : (
              <>
                <Hero />
                <Container>
                  <div className="flex flex-col items-center gap-12 py-8">
                    <div className="w-full flex flex-col items-center gap-6">
                      <SearchBar />
                      <ReasoningSteps />
                    </div>
                    
                    <div className="w-full">
                      <div className="flex items-center gap-2 mb-8">
                        <Compass className="text-[#1DB954]" size={24} />
                        <h2 className="text-2xl font-semibold text-white drop-shadow">
                          Selected Just For You
                        </h2>
                      </div>
                      <Results isRecommendations={true} />
                    </div>
                  </div>
                </Container>
              </>
            )}
          </div>
        </CSSTransition>
      </SwitchTransition>
    </>
  );
};