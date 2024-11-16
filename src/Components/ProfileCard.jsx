import React from 'react'

function ProfileCard({ profile, onSelect }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300">
      <img src={profile.image} alt={profile.name} className="w-24 h-24 rounded-full mx-auto mb-4" />
      <h2 className="text-xl font-semibold text-center mb-2">{profile.name}</h2>
      <p className="text-gray-600 text-center mb-4">{profile.description}</p>
      <button
        onClick={onSelect}
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
      >
        View Summary
      </button>
    </div>
  )
}

export default ProfileCard