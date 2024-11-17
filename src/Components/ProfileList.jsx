import React from 'react'
import ProfileCard from './ProfileCard'
import LoadingIndicator from './LoadingIndicator'
import { useProfiles } from './ProfileProvider'




export default function ProfileList({ searchTerm, onSelectProfile }) {
  const { profiles } = useProfiles()

  const filteredProfiles = profiles.filter(profile =>
    profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    profile.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (!profiles.length) {
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