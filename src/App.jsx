import React, { useState } from 'react'
import Dashboard from './component/Dashboard'
import Under from './component/Under'
import Login from './component/Login'
import ChatLayout from './pages/ChatLayout'

function App() {
  const [user, setUser] = useState(null);

  if (!user) return <Login onStart={(userData) => setUser(userData)} />

  return <ChatLayout user={user} />
}

export default App