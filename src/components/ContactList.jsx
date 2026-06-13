import React from 'react';
import '../component/Login.css';
import './ContactList.css';
import Avatar from './Avatar';

export default function ContactList({ conversations, selectedId, onSelect, onFindStranger, isFindingStranger }) {
  return (
    <div className="contacts-root">
      <div className="contacts-header">
        <h3>Chats</h3>
        <button 
          className="glass-button" 
          onClick={onFindStranger}
          disabled={isFindingStranger}
          style={{ padding: '0.5rem 1rem', fontSize: '1rem', width: '100%', marginBottom: '1rem' }}
        >
          <span>{isFindingStranger ? "Finding..." : "Find Stranger"}</span>
        </button>
        <input className="glass-input" placeholder="Search..." />
      </div>
      <div className="contacts-list">
        {conversations.map(c => (
          <div
            key={c.id}
            className={`contact-item ${selectedId === c.id ? 'selected' : ''}`}
            onClick={() => onSelect && onSelect(c.id)}
          >
            <Avatar image={c.avatar} online={c.online} />
            <div className="contact-meta">
              <div className="contact-name">{c.name}</div>
              <div className="contact-last">{c.messages[c.messages.length-1]?.text?.slice(0,40) ?? ''}</div>
            </div>
            {c.unread ? <div className="badge">{c.unread}</div> : null}
          </div>
        ))}
      </div>
    </div>
  );
}
