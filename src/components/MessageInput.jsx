import React, { useState } from 'react';
import './MessageInput.css';

export default function MessageInput({ onSend }){
  const [text, setText] = useState('');
  function submit(){ if (!text.trim()) return; onSend && onSend(text.trim()); setText(''); }
  return (
    <div className="msg-input-root">
      <textarea
        className="glass-input"
        value={text}
        onChange={e=>setText(e.target.value)}
        placeholder="Type a message..."
        onKeyDown={e=>{ if (e.key==='Enter' && !e.shiftKey){ e.preventDefault(); submit(); } }}
      />
      <button className="glass-button send-btn" onClick={submit}>Send</button>
    </div>
  )
}
