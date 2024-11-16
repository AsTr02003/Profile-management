import React, { useState, useEffect } from 'react'
import ProfileCard from './ProfileCard'
import LoadingIndicator from './LoadingIndicator'

function ProfileList({ searchTerm, onSelectProfile }) {
  const [profiles, setProfiles] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulating API call to fetch profiles
    setTimeout(() => {
      setProfiles([
        { id: 1, name: 'Abhishek Joshi', description: 'Software Engineer', address: 'Borivali, Maharashtra', image: 'https://randomuser.me/api/portraits/men/1.jpg' },
        { id: 2, name: 'Shreyans Satpute', description: 'UX Designer', address: 'Thane, Maharashtra', image: 'https://randomuser.me/api/portraits/women/2.jpg' },
        { id: 3, name: 'Advait Shelatkar', description: 'Data Scientist', address: 'Santacruz, Maharashtra', image: 'https://randomuser.me/api/portraits/women/3.jpg' },
        { id: 4, name: 'Harsh Patel', description: 'Product Manager', address: 'Goregaon, Maharashtra', image: 'https://randomuser.me/api/portraits/men/4.jpg' },
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