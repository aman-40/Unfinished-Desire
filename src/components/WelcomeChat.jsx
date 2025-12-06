import React from 'react';
import './WelcomeChat.css';

export default function WelcomeChat(){
  return (
    <div className="welcome-root">
      <h2 className="tab-title">Welcome to Unfinished Desire Chat</h2>
      <p style={{color:'rgba(255,255,255,0.8)'}}>Select a conversation or start a new message.</p>
    </div>
  )
}
