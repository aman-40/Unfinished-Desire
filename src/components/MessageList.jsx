import React, { useEffect, useRef } from 'react';
import './MessageList.css';

export default function MessageList({ messages=[] }){
  const endRef = useRef();
  useEffect(()=>{ endRef.current?.scrollIntoView({behavior:'smooth'}); }, [messages]);

  return (
    <div className="message-list-root">
      <div className="messages-inner">
        {messages.map(m=> (
          <div key={m.id} className={`message-bubble ${m.fromMe ? 'out' : 'in'}`}>
            <div className="message-text">{m.text}</div>
            <div className="message-time">{new Date(m.time).toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})}</div>
          </div>
        ))}
        <div ref={endRef} />
      </div>
    </div>
  )
}
