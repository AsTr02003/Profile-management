import React, { useState, useEffect } from 'react'
import LoadingIndicator from './LoadingIndicator'
import ProfileCard from './ProfileCard'


function ProfileList({ searchTerm, onSelectProfile }) {
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

  const filteredProfiles = profiles.filter(profile =>
    profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    profile.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return <LoadingIndicator />
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {filteredProfiles.map(profile => (
        <ProfileCard
          key={profile.id}
          profile={profile}
          onSelect={() => onSelectProfile(profile)}
        />
      ))}
    </div>
  )
}

export default ProfileList