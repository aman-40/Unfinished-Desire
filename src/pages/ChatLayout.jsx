import React, { useState } from 'react';
import '../component/Login.css';
import './ChatLayout.css';
import ContactList from '../components/ContactList';
import MessageList from '../components/MessageList';
import MessageInput from '../components/MessageInput';
import ChatHeader from '../components/ChatHeader';
import ProfilePanel from './ProfilePanel';
import WelcomeChat from '../components/WelcomeChat';
import mockConversations from '../data/mockConversations';

export default function ChatLayout() {
  const [conversations, setConversations] = useState(mockConversations);
  const [selectedId, setSelectedId] = useState(conversations[0]?.id ?? null);
  const [showProfile, setShowProfile] = useState(false);

  const selectedConversation = conversations.find(c => c.id === selectedId);

  function sendMessage(text) {
    if (!text || !selectedId) return;
    const newMsg = {
      id: Date.now(),
      fromMe: true,
      text,
      time: new Date().toISOString(),
    };
    setConversations(prev => prev.map(c => c.id === selectedId ? { ...c, messages: [...c.messages, newMsg] } : c));
  }

  return (
    <div className="chat-app">
      <div className="chat-container">
        <aside className="chat-sidebar">
          <ContactList
            conversations={conversations}
            selectedId={selectedId}
            onSelect={id => setSelectedId(id)}
          />
        </aside>

        <section className="chat-main">
          {selectedConversation ? (
            <>
              <ChatHeader conversation={selectedConversation} onToggleProfile={() => setShowProfile(s => !s)} />
              <MessageList messages={selectedConversation.messages} />
              <MessageInput onSend={sendMessage} />
            </>
          ) : (
            <WelcomeChat />
          )}
        </section>

        <aside className={`chat-profile ${showProfile ? 'open' : ''}`}>
          <ProfilePanel conversation={selectedConversation} />
        </aside>
      </div>
    </div>
  );
}
