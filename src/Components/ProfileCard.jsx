import React, { useState } from 'react';

function ProfileCard({ profile, onSelect }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDialog = () => setIsOpen(!isOpen);

  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300">
      <img src={profile.image} alt={profile.name} className="w-24 h-24 rounded-full mx-auto mb-4" />
      <h2 className="text-xl font-semibold text-center mb-2">{profile.name}</h2>
      <p className="text-gray-600 text-center mb-4">{profile.description}</p>
      <div className="space-y-2">
        <button
          onClick={onSelect}
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
        >
          View Summary
        </button>
        <button
          onClick={toggleDialog}
          className="w-full border border-blue-500 text-blue-500 py-2 rounded-md hover:bg-blue-50 transition-colors duration-300"
        >
          View Details
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
          <img src={profile.image} alt={profile.name} className="w-24 h-24 rounded-full mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Name: {profile.name}</h3>
            <p className="text-gray-600 mb-2">Description: {profile.description}</p>
            <p className="text-gray-600 mb-4">Address: {profile.address}</p>
            <button
              onClick={toggleDialog}
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileCard;