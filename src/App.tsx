import React, { useEffect } from 'react';
import { SearchSection } from './components/search/SearchSection';
import { Modal } from './components/Modal';
import { ProfileSelection } from './components/ProfileSelection';
import { useStore } from './store';

function App() {
  const { selectedResult, setSelectedResult, selectedProfile, loadMerchantsData } = useStore();

  // Load merchants data when the app starts
  useEffect(() => {
    loadMerchantsData();
  }, [loadMerchantsData]);

  if (!selectedProfile) {
    return <ProfileSelection />;
  }

  return (
    <div className="min-h-screen bg-[#121212]">
      <main className="relative">
        <div className="relative z-10">
          <SearchSection />
        </div>
        
        {selectedResult && (
          <Modal
            result={selectedResult}
            isOpen={!!selectedResult}
            onClose={() => setSelectedResult(null)}
          />
        )}
      </main>
    </div>
  );
}

export default App;