import React, { useState } from 'react'
import ScriptHelper from './components/ScriptHelper'
import Header from './components/Header'

export default function App() {
  const [activeTab, setActiveTab] = useState('script')

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #313973 0%, #295294 50%, #3962b4 100%)' }}>
      <Header activeTab={activeTab} onTabChange={setActiveTab} />
      <div>
        <ScriptHelper />
      </div>
    </div>
  )
}