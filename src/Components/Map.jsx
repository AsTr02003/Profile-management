import React, { useState, useEffect } from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api'
import LoadingIndicator from './LoadingIndicator'

const containerStyle = {
  width: '100%',
  height: '400px'
}

const defaultCenter = {
  lat: 39.8283,
  lng: -98.5795
}

function Map({ selectedProfile }) {
  const [center, setCenter] = useState(defaultCenter)
  const [error, setError] = useState(null)

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  })

  useEffect(() => {
    if (selectedProfile && selectedProfile.address) {
      geocodeAddress(selectedProfile.address)
    } else {
      setCenter(defaultCenter)
    }
  }, [selectedProfile])

  const geocodeAddress = async (address) => {
    try {
      const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`)
      const data = await response.json()
      if (data.status === 'OK') {
        const { lat, lng } = data.results[0].geometry.location
        setCenter({ lat, lng })
        setError(null)
      } else {
        setError(`Geocoding error: ${data.status}`)
      }
    } catch (error) {
      setError('Error occurred while geocoding')
    }
  }

  if (loadError) {
    return <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
      <strong className="font-bold">Error loading Google Maps:</strong>
      <span className="block sm:inline"> {loadError.message}</span>
    </div>
  }

  if (!isLoaded) return <div className="text-center"><LoadingIndicator/></div>

  return (
    <div className="relative">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={selectedProfile ? 14 : 4}
      >
        {selectedProfile && <Marker position={center} />}
      </GoogleMap>
      {error && (
        <div className="absolute top-0 left-0 right-0 bg-red-500 text-white p-2 text-center">
          {error}
        </div>
      )}
    </div>
  )
}

export default Map