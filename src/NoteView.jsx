import React, { useState, useEffect } from 'react';

const NoteView = ({ group, isMobile, onBack }) => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');

  useEffect(() => {
    // Reset notes first when group changes
    setNotes([]);
    
    if (group) {
      const notesString = localStorage.getItem(`${group}-list`);
      if (notesString && notesString.trim() !== '') {
        const notesList = notesString.split(';').map(note => {
          let [text, ...date] = note.split(':');
          date = date.join(':');
          return { text, date: new Date(date).toLocaleString('en-GB') };
        });
        setNotes(notesList);
      } else {
        // Ensure notes are empty for new/empty groups
        setNotes([]);
        localStorage.setItem(`${group}-list`, '');
      }
    }
  }, [group]); // Only depend on group changes

  const handleAddNote = () => {
    if (newNote) {
      const dateTime = new Date();
      const updatedNotes = `${newNote}:${dateTime}`;
      const existingNotes = localStorage.getItem(`${group}-list`) || '';
      localStorage.setItem(`${group}-list`, existingNotes ? `${existingNotes};${updatedNotes}` : updatedNotes);
      // console.log(new Date(dateTime))
      setNotes([...notes, { text: newNote, date: new Date(dateTime).toLocaleString('en-GB') }]);
      setNewNote('');
    }
  };

  const isButtonDisabled = !newNote || newNote.includes(':') || newNote.includes(';');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {group ? (
        <>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            padding: '10px',
            backgroundColor: '#001F8B',
            color: 'white'
          }}>
            {isMobile && (
              <button
                onClick={onBack}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'white',
                  fontSize: '24px',
                  padding: '0 15px',
                  cursor: 'pointer'
                }}
              >
                ←
              </button>
            )}
            <h2 style={{ margin: 0 }}>{group}</h2>
          </div>
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {notes.map((note, index) => (
              <div key={index} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 10px', backgroundColor: '#ffffff', borderRadius: '5px' }}>
                <p style={{ textAlign: 'left' }}>{note.text}</p>
                <p style={{ textAlign: 'right' }}>{String(note.date)}</p>
              </div>
            ))}
          </div>
          <div style={{ height: '15vh', backgroundColor: '#001F8B', display: 'flex', alignItems: 'center', padding: '10px' }}>
            <input
              type="text"
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder="Type a new note..."
              style={{ flex: 1, marginRight: '10px', height: '90%', borderRadius: '10px' }}
            />
            <button 
              onClick={handleAddNote} 
              disabled={isButtonDisabled} 
              style={{ 
                cursor: isButtonDisabled ? 'not-allowed' : 'pointer', 
                opacity: isButtonDisabled ? 0.5 : 1 
              }}
            >
              <span role="img" aria-label="send">➡️</span> 
            </button>
          </div>
        </>
      ) : (
        <div> 
          {/* <img src="/dancers.png" alt="Dancers" style={{ width: '80%', height: 'auto', marginTop: '10vh' }} /> */}
          <img src={`${process.env.PUBLIC_URL}/dancers.png`} alt="Dancers" style={{ width: '80%', height: 'auto' }} />
          <h1> Pocket Notes </h1>
          <p>Send and receive messages without keeping your phone online. <br /> Use Pocket Notes on up to 4 linked devices and 1 mobile phone</p> 
        </div>
      )}
    </div>
  );
};

const getInitials = (name) => {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
};

export default NoteView;
