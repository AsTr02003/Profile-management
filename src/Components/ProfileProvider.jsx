import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react'



const ProfileContext = createContext(undefined)

export const useProfiles = () => {
  const context = useContext(ProfileContext)
  if (!context) {
    throw new Error('useProfiles must be used within a ProfileProvider')
  }
  return context
}

export const ProfileProvider= ({ children }) => {
  const [profiles, setProfiles] = useState([])

  useEffect(() => {
   
    const fetchProfiles = async () => {
      try {
    
        setTimeout(() => {
          setProfiles([
            { id: 1, name: 'Abhishek Joshi', description: 'Software Engineer', address: 'Borivali, Maharashtra', image: 'https://randomuser.me/api/portraits/men/1.jpg' },
            { id: 2, name: 'Shreyans Satpute', description: 'UX Designer', address: 'Thane, Maharashtra', image: 'https://randomuser.me/api/portraits/women/2.jpg' },
            { id: 3, name: 'Advait Shelatkar', description: 'Data Scientist', address: 'Santacruz, Maharashtra', image: 'https://randomuser.me/api/portraits/women/3.jpg' },
            { id: 4, name: 'Harsh Patel', description: 'Product Manager', address: 'Goregaon, Maharashtra', image: 'https://randomuser.me/api/portraits/men/4.jpg' },
          ])
        }, 1000)
      } catch (error) {
        console.error('Error fetching profiles:', error)
      }
    }

    fetchProfiles()
  }, [])

  const addProfile = (newProfile) => {
    const profileWithId = { id: Date.now(), ...newProfile }
    setProfiles(prevProfiles => [...prevProfiles, profileWithId])
    
  }

  const editProfile = (editedProfile) => {
    setProfiles(prevProfiles => 
      prevProfiles.map(profile => profile.id === editedProfile.id ? editedProfile : profile)
    )
   
  }

  const deleteProfile = (profileId) => {
    setProfiles(prevProfiles => prevProfiles.filter(profile => profile.id !== profileId))
    
  }

  return (
    <ProfileContext.Provider value={{ profiles, addProfile, editProfile, deleteProfile }}>
      {children}
    </ProfileContext.Provider>
  )
}