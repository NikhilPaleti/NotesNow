import './App.css';
import React, { useState, useEffect } from 'react';
import NotesList from './NotesList';
import NoteView from './NoteView';

function App() {
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="App" style={{ display: 'flex' }}>
      {isMobile ? (
        <div style={{ width: '100%', height: '100vh' }}>
          {selectedGroup ? (
            <NoteView 
              group={selectedGroup} 
              isMobile={true}
              onBack={() => setSelectedGroup(null)} 
            />
          ) : (
            <NotesList onSelectGroup={setSelectedGroup} />
          )}
        </div>
      ) : (
        <>
          <div style={{ flex: 2, backgroundColor: '#FFFFFF', height: '100vh' }}>
            <NotesList onSelectGroup={setSelectedGroup} />
          </div>
          <div style={{ flex: 5, backgroundColor: '#DAE5F5', height: '100vh' }}>
            <NoteView group={selectedGroup} isMobile={false} />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
