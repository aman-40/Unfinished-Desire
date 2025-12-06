import React from 'react';
import './ChatHeader.css';
import Avatar from './Avatar';

export default function ChatHeader({ conversation, onToggleProfile }){
  return (
    <div className="chat-header">
      <div className="left">
        <Avatar image={conversation?.avatar} name={conversation?.name} online={conversation?.online} />
        <div className="meta">
          <div className="name">{conversation?.name ?? 'Select a chat'}</div>
          <div className="status">{conversation?.online ? 'online' : 'offline'}</div>
        </div>
      </div>
      <div className="right">
        <button className="glass-button" onClick={onToggleProfile}>Info</button>
      </div>
    </div>
  )
}
