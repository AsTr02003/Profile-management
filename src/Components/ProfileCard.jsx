
import React, { useState, useEffect } from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api'
import LoadingIndicator from './LoadingIndicator'

const mapContainerStyle = {
  width: '100%',
  height: '400px'
}

const defaultCenter = {
  lat: 39.8283,
  lng: -98.5795
}

export default function ProfileCard({ profile }) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [isMapOpen, setIsMapOpen] = useState(false)
  const [mapCenter, setMapCenter] = useState(defaultCenter)
  const [mapError, setMapError] = useState(null)


  const { isLoaded, loadError } = useJsApiLoader({
    // googleMapsApiKey: process.env.VITE_GOOGLE_MAPS_API_KEY || '',
  })

  const toggleDetails = () => setIsDetailsOpen(!isDetailsOpen)
  const toggleMap = () => setIsMapOpen(!isMapOpen)

  useEffect(() => {
    if (isMapOpen && profile.address) {
      geocodeAddress(profile.address)
    }
  }, [isMapOpen, profile.address])

  const geocodeAddress = async (address) => {
    try {
      const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`)
      const data = await response.json()
      if (data.status === 'OK') {
        const { lat, lng } = data.results[0].geometry.location
        setMapCenter({ lat, lng })
        setMapError(null)
      } else {
        setMapError(`Geocoding error: ${data.status}`)
      }
    } catch (error) {
      setMapError('Error occurred while geocoding')
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300">
      <img src={profile.image} alt={profile.name} className="w-24 h-24 rounded-full mx-auto mb-4" />
      <h2 className="text-xl font-semibold text-center mb-2">{profile.name}</h2>
      <p className="text-gray-600 text-center mb-4">{profile.description}</p>
      <div className="space-y-2">
        <button
          onClick={toggleMap}
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
        >
          View Summary
        </button>
        <button
          onClick={toggleDetails}
          className="w-full border border-blue-500 text-blue-500 py-2 rounded-md hover:bg-blue-50 transition-colors duration-300"
        >
          View Details
        </button>
      </div>

      {isDetailsOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <img src={profile.image} alt={profile.name} className="w-24 h-24 rounded-full mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Name: {profile.name}</h3>
            <p className="text-gray-600 mb-2">Description: {profile.description}</p>
            <p className="text-gray-600 mb-4">Address: {profile.address}</p>
            <button
              onClick={toggleDetails}
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {isMapOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-3xl w-full">
            <h3 className="text-xl font-semibold mb-4">Location: {profile.address}</h3>
            <div className="relative h-[400px]">
              {loadError && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                  <strong className="font-bold">Error loading Google Maps:</strong>
                  <span className="block sm:inline"> {loadError.message}</span>
                </div>
              )}
              {!isLoaded ? (
                <div className="flex justify-center items-center h-full">
                  <LoadingIndicator className="h-8 w-8 animate-spin" />
                </div>
              ) : (
                <GoogleMap
                  mapContainerStyle={mapContainerStyle}
                  center={mapCenter}
                  zoom={14}
                >
                  <Marker position={mapCenter} />
                </GoogleMap>
              )}
              {mapError && (
                <div className="absolute top-0 left-0 right-0 bg-red-500 text-white p-2 text-center">
                  {mapError}
                </div>
              )}
            </div>
            <div className="mt-4 text-right">
              <button
                onClick={toggleMap}
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}