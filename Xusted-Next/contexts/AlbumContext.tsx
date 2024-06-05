'use client'

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react'
import axios from 'axios'

interface Album {
  id: string
  title: string
  cover: string
  songs: { title: string }[]
}

interface AlbumContextProps {
  albums: Album[]
  setAlbums: React.Dispatch<React.SetStateAction<Album[]>>
}

const AlbumContext = createContext<AlbumContextProps | undefined>(undefined)

export const AlbumProvider = ({ children }: { children: ReactNode }) => {
  const [albums, setAlbums] = useState<Album[]>([])

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await axios.get('/data/albums.json')
        setAlbums(response.data)
      } catch (error) {
        console.error('Error fetching albums:', error)
      }
    }

    fetchAlbums()
  }, [])

  return (
    <AlbumContext.Provider value={{ albums, setAlbums }}>
      {children}
    </AlbumContext.Provider>
  )
}

export const useAlbum = () => {
  const context = useContext(AlbumContext)
  if (!context) {
    throw new Error('useAlbum must be used within an AlbumProvider')
  }
  return context
}
