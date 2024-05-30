'use client'

import React, { useEffect } from 'react'
import { useAlbum } from '../contexts/AlbumContext'
import Navbar from '../components/Navbar'
import axios from 'axios'

const HomePage = () => {
  const { albums, setAlbums } = useAlbum()

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
  }, [setAlbums])

  return (
    <div>
      <Navbar />
      <h1>Albums</h1>
      <ul>
        {albums.map((album: { id: string; title: string; cover: string }) => (
          <li key={album.id}>
            <a href={`/albums/${album.id}`}>
              <img src={album.cover} alt={album.title} />
              <p>{album.title}</p>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default HomePage
