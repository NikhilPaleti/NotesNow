import React, { useState, useEffect } from 'react';

const NotesList = ({ onSelectGroup }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  const colors = ['#B38BFA', '#FF79F2', '#43E6FC', '#F19576', '#0047FF', '#6691FF'  ];

  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const loadGroups = () => {
      const groupsString = localStorage.getItem('group-list-pocket-note');
      if (groupsString) {
        const groupsList = groupsString.split(';').map(group => {
          const [name, color] = group.split(':');
          return { name, color };
        });
        setGroups(groupsList);
      }
    };

    loadGroups();
    window.addEventListener('storage', loadGroups);
    return () => window.removeEventListener('storage', loadGroups);
  }, []);

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
  };

  const renderGroups = () => (
    <div style={{ 
      overflowY: 'auto',
      height: 'calc(100% - 80px)', // Leave space for the + button
      padding: '20px'
    }}>
      {groups.map((group, index) => (
        <div 
          key={index}
          onClick={() => {
            onSelectGroup(group.name); // Pass the group name
            // Clear the dancers.png image logic here if needed
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '10px',
            cursor: 'pointer',
            marginBottom: '10px',
            borderRadius: '5px',
            transition: 'background-color 0.2s',
            ':hover': {
              backgroundColor: '#f5f5f5'
            }
          }}
        >
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: group.color,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            marginRight: '15px',
            fontSize: '16px',
            fontWeight: 'bold'
          }}>
            {getInitials(group.name)}
          </div>
          <span style={{
            fontSize: '16px'
          }}>
            {group.name}
          </span>
        </div>
      ))}
    </div>
  );
  

  const handleSubmit = () => {
    if (groupName && selectedColor) {
      const newGroup = `${groupName}:${selectedColor}`;
      const existingGroups = localStorage.getItem('group-list-pocket-note') || '';
      const updatedGroups = existingGroups ? `${existingGroups};${newGroup}` : newGroup;
      localStorage.setItem('group-list-pocket-note', updatedGroups);
      setShowPopup(false);
      setGroupName('');
      setSelectedColor('');
      
      console.log('storage changed', localStorage.getItem('group-list-pocket-note'));
    //   window.location.reload();
    }
  };

  return (
    <div style={{ position: 'relative', height: '100%' }}>
      <div 
        onClick={() => setShowPopup(true)}
        style={{
          position: 'absolute',
          bottom: '20px',
          right: '20px',
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          backgroundColor: '#16008B',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '24px',
          cursor: 'pointer'
        }}
      >
        +
      </div>
      <h1> Pocket Notes </h1>
        {renderGroups()}
      {showPopup && (
        <div style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          width: '500px'
        }}>
          <h3 style={{textAlign: 'left'}}>Create New Group</h3>
          <div style={{ margin: '10px', textAlign: 'left'}}>
            <label>Group Name</label>
            <input
              type="text"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              style={{ 
                width: '100%',
                padding: '8px',
                marginTop: '8px',
                border: '1px solid #ccc',
                borderRadius: '22px',
                display: 'inline'
              }}
            />
          </div>

          <div style={{ marginBottom: '20px', textAlign: 'left'}}>
            <label>Choose Color</label>
            <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
              {colors.map((color) => (
                <div
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    backgroundColor: color,
                    cursor: 'pointer',
                    border: selectedColor === color ? '2px solid #000' : 'none'
                  }}
                />
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
            <button
              onClick={() => setShowPopup(false)}
              style={{
                padding: '8px 16px',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={!groupName || !selectedColor}
              style={{
                padding: '8px 16px',
                backgroundColor: groupName && selectedColor ? '#16008B' : '#ccc',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: groupName && selectedColor ? 'pointer' : 'not-allowed'
              }}
            >
              Create
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotesList;
