import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import AdminPanel from "../Components/AdminPanel";
import LoadingIndicator from '../Components/LoadingIndicator'


function Admin() {
  const [profiles, setProfiles] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulating API call to fetch profiles
    setTimeout(() => {
      setProfiles([
        { id: 1, name: 'John Doe', description: 'Software Engineer', address: '123 Main St, New York, NY', image: 'https://randomuser.me/api/portraits/men/1.jpg' },
        { id: 2, name: 'Jane Smith', description: 'UX Designer', address: '456 Elm St, San Francisco, CA', image: 'https://randomuser.me/api/portraits/women/2.jpg' },
        { id: 3, name: 'Alice Johnson', description: 'Data Scientist', address: '789 Oak Rd, Chicago, IL', image: 'https://randomuser.me/api/portraits/women/3.jpg' },
        { id: 4, name: 'Bob Wilson', description: 'Product Manager', address: '321 Pine Ave, Seattle, WA', image: 'https://randomuser.me/api/portraits/men/4.jpg' },
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const handleAddProfile = (newProfile) => {
    setProfiles([...profiles, { id: Date.now(), ...newProfile }])
  }

  const handleEditProfile = (editedProfile) => {
    setProfiles(profiles.map(profile => profile.id === editedProfile.id ? editedProfile : profile))
  }

  const handleDeleteProfile = (profileId) => {
    setProfiles(profiles.filter(profile => profile.id !== profileId))
  }

  if (loading) {
    return <LoadingIndicator />
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-blue-600">Admin Panel</h1>
        <Link
          to="/"
          className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors duration-300"
        >
          Back to Home
        </Link>
      </div>
      <AdminPanel
        profiles={profiles}
        onAddProfile={handleAddProfile}
        onEditProfile={handleEditProfile}
        onDeleteProfile={handleDeleteProfile}
      />
    </div>
  )
}

export default Admin