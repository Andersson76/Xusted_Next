'use client'

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react'
import axios from 'axios'

interface Song {
  title: string
  duration: string
  file: string
}
interface Album {
  id: string
  title: string
  cover: string
  songs: Song[]
}

interface AlbumContextProps {
  albums: Album[]
  setAlbums: React.Dispatch<React.SetStateAction<Album[]>>
  addAlbum: (album: Album) => void
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

  const addAlbum = (newAlbum: Album) => {
    setAlbums((prevAlbums) => [...prevAlbums, newAlbum])
  }

  return (
    <AlbumContext.Provider value={{ albums, setAlbums, addAlbum }}>
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
