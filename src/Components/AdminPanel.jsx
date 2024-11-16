import React, { useState } from 'react'

function AdminPanel({ profiles, onAddProfile, onEditProfile, onDeleteProfile }) {
  const [editingProfile, setEditingProfile] = useState(null)
  const [newProfile, setNewProfile] = useState({ name: '', description: '', address: '', image: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editingProfile) {
      onEditProfile({ ...editingProfile, ...newProfile })
      setEditingProfile(null)
    } else {
      onAddProfile(newProfile)
    }
    setNewProfile({ name: '', description: '', address: '', image: '' })
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="mb-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">{editingProfile ? 'Edit Profile' : 'Add New Profile'}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            value={newProfile.name}
            onChange={(e) => setNewProfile({ ...newProfile, name: e.target.value })}
            placeholder="Name"
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            value={newProfile.description}
            onChange={(e) => setNewProfile({ ...newProfile, description: e.target.value })}
            placeholder="Description"
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            value={newProfile.address}
            onChange={(e) => setNewProfile({ ...newProfile, address: e.target.value })}
            placeholder="Address"
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            value={newProfile.image}
            onChange={(e) => setNewProfile({ ...newProfile, image: e.target.value })}
            placeholder="Image URL"
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
        >
          {editingProfile ? 'Update Profile' : 'Add Profile'}
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {profiles.map(profile => (
          <div key={profile.id} className="bg-white p-4 rounded-lg shadow-md">
            <img src={profile.image} alt={profile.name} className="w-24 h-24 rounded-full mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">{profile.name}</h3>
            <p className="text-gray-600 mb-2">{profile.description}</p>
            <p className="text-gray-600 mb-4">{profile.address}</p>
            <div className="flex justify-between">
              <button
                onClick={() => setEditingProfile(profile)}
                className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 transition-colors duration-300"
              >
                Edit
              </button>
              <button
                onClick={() => onDeleteProfile(profile.id)}
                className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition-colors duration-300"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AdminPanel