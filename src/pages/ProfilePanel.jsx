import React from 'react';

export default function ProfilePanel({ conversation }){
  if (!conversation) return <div style={{color:'white'}}>No user selected</div>;
  return (
    <div style={{color:'white'}}>
      <h3>{conversation.name}</h3>
      <p>Status: {conversation.online ? 'Online' : 'Offline'}</p>
      <h4>About</h4>
      <p>{conversation.about ?? 'This is a demo profile.'}</p>
    </div>
  )
}
