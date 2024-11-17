import React from 'react'
import { Link } from 'react-router-dom'
import AdminPanel from "../Components/AdminPanel"
import LoadingIndicator from '../Components/LoadingIndicator'
import { useProfiles } from '../Components/ProfileProvider'


export default function Admin() {
  const { profiles, addProfile, editProfile, deleteProfile } = useProfiles()

  if (!profiles.length) {
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
        onAddProfile={addProfile}
        onEditProfile={editProfile}
        onDeleteProfile={deleteProfile}
      />
    </div>
  )
}