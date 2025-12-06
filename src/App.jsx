import React, { useState } from 'react'
import Dashboard from './component/Dashboard'
import Under from './component/Under'
import Login from './component/Login'
import ChatLayout from './pages/ChatLayout'

function App() {
  const [started, setStarted] = useState(false);

  if (!started) return <Login onStart={() => setStarted(true)} />

  return <ChatLayout />
}

export default App