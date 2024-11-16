import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import SearchFilter from '../Components/SearchFilter'
import ProfileList from '../Components/ProfileList'
import Map from '../Components/Map'


function Home() {
  const [selectedProfile, setSelectedProfile] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-blue-600">Profile Explorer</h1>
        <Link
          to="/admin"
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors duration-300"
        >
          Admin Panel
        </Link>
      </div>
      <SearchFilter onSearch={setSearchTerm} />
      <div className="mb-8">
        <ProfileList
          searchTerm={searchTerm}
          onSelectProfile={setSelectedProfile}
        />
      </div>
      <div className="w-full h-[400px]">
        <Map selectedProfile={selectedProfile} />
      </div>
    </div>
  )
}

export default Home