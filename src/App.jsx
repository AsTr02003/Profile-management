import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ProfileProvider } from './Components/ProfileProvider'
import Home from './Pages/Home'
import Admin from './Pages/Admin'


function App() {
  return (
    <ProfileProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </div>
      </Router>
    </ProfileProvider>
  )
}

export default App