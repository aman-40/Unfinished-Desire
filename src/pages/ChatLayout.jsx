import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import '../component/Login.css';
import './ChatLayout.css';
import ContactList from '../components/ContactList';
import MessageList from '../components/MessageList';
import MessageInput from '../components/MessageInput';
import ChatHeader from '../components/ChatHeader';
import ProfilePanel from './ProfilePanel';
import WelcomeChat from '../components/WelcomeChat';

export default function ChatLayout({ user }) {
  const [conversations, setConversations] = useState([
    {
      id: 'global_room',
      name: 'Global Anonymous Room',
      avatar: '',
      online: true,
      unread: 0,
      about: 'Chat with everyone!',
      messages: [],
      isGlobal: true
    }
  ]);
  const [selectedId, setSelectedId] = useState('global_room');
  const [showProfile, setShowProfile] = useState(false);
  const [isFindingStranger, setIsFindingStranger] = useState(false);
  
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = io('http://localhost:4000');
    
    socketRef.current.on('connect', () => {
      console.log('Connected to server');
      socketRef.current.emit('set_user_data', user);
    });

    socketRef.current.on('joined_global', (data) => {
      addMessage('global_room', {
        id: Date.now(),
        fromMe: false,
        text: data.message,
        time: new Date().toISOString(),
        system: true
      });
    });

    socketRef.current.on('receive_global_message', (msg) => {
      addMessage('global_room', {
        id: msg.id,
        fromMe: msg.senderId === socketRef.current.id,
        text: msg.text,
        time: msg.time,
        senderName: msg.from
      });
    });

    socketRef.current.on('waiting_for_match', () => {
      setIsFindingStranger(true);
    });

    socketRef.current.on('match_found', (data) => {
      setIsFindingStranger(false);
      setConversations(prev => [
        ...prev,
        {
          id: data.roomId,
          name: 'Anonymous Stranger',
          avatar: '',
          online: true,
          unread: 0,
          about: 'Currently chatting 1-on-1',
          messages: [{
            id: Date.now(),
            fromMe: false,
            text: data.message,
            time: new Date().toISOString(),
            system: true
          }],
          isGlobal: false
        }
      ]);
      setSelectedId(data.roomId);
    });

    socketRef.current.on('receive_private_message', (msg) => {
      addMessage(msg.roomId, {
        id: msg.id,
        fromMe: msg.senderId === socketRef.current.id,
        text: msg.text,
        time: msg.time,
        senderName: msg.from
      });
    });

    socketRef.current.on('partner_disconnected', (data) => {
      addMessage(data.roomId, {
        id: Date.now(),
        fromMe: false,
        text: 'Stranger has disconnected.',
        time: new Date().toISOString(),
        system: true
      });
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [user]);

  function addMessage(roomId, newMsg) {
    setConversations(prev => {
      const idx = prev.findIndex(c => c.id === roomId);
      if (idx === -1) return prev;
      const updated = [...prev];
      updated[idx] = { 
        ...updated[idx], 
        messages: [...updated[idx].messages, newMsg] 
      };
      // Optional: highlight unread if not selected
      return updated;
    });
  }

  function sendMessage(text) {
    if (!text || !selectedId || !socketRef.current) return;
    
    const selected = conversations.find(c => c.id === selectedId);
    
    if (selected.isGlobal) {
      socketRef.current.emit('send_global_message', { text });
    } else {
      socketRef.current.emit('send_private_message', { roomId: selectedId, text });
      // Optimistically add message
      addMessage(selectedId, {
        id: Date.now(),
        fromMe: true,
        text,
        time: new Date().toISOString(),
        senderName: user.name
      });
    }
  }

  function handleFindStranger() {
    setIsFindingStranger(true);
    socketRef.current.emit('find_stranger');
  }

  const selectedConversation = conversations.find(c => c.id === selectedId);

  return (
    <div className="chat-app">
      <div className="chat-container">
        <aside className="chat-sidebar">
          <ContactList
            conversations={conversations}
            selectedId={selectedId}
            onSelect={id => setSelectedId(id)}
            onFindStranger={handleFindStranger}
            isFindingStranger={isFindingStranger}
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
