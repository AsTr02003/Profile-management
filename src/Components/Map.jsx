import React, { useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

mapboxgl.accessToken = 'YOUR_MAPBOX_ACCESS_TOKEN'

function Map({ selectedProfile }) {
  const mapContainer = useRef(null)
  const map = useRef(null)

  useEffect(() => {
    if (map.current) return

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-98.5795, 39.8283], // Center of the US
      zoom: 3
    })

    map.current.addControl(new mapboxgl.NavigationControl())
  }, [])

  useEffect(() => {
    if (!selectedProfile || !map.current) return

    // Remove existing markers
    const existingMarkers = document.getElementsByClassName('mapboxgl-marker')
    while (existingMarkers[0]) {
      existingMarkers[0].parentNode.removeChild(existingMarkers[0])
    }

    // Add marker for selected profile
    new mapboxgl.Marker()
      .setLngLat([-74.5, 40]) // Replace with actual coordinates from geocoding API
      .setPopup(new mapboxgl.Popup().setHTML(`<h3 class="font-bold">${selectedProfile.name}</h3><p>${selectedProfile.address}</p>`))
      .addTo(map.current)

    // Fly to the marker
    map.current.flyTo({
      center: [-74.5, 40], // Replace with actual coordinates
      zoom: 14,
      essential: true
    })
  }, [selectedProfile])

  return (
    <div ref={mapContainer} className="w-full h-full rounded-lg shadow-md" />
  )
}

export default Map