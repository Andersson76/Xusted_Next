'use client'

import React, { useEffect } from 'react'
import { useAlbum } from '../contexts/AlbumContext'
import Navbar from '../components/Navbar'
import axios from 'axios'
import Link from 'next/link'
import Image from 'next/image'

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
        {albums.map((album) => (
          <li key={album.id}>
            <Link href={`/albums/${album.id}`} passHref legacyBehavior>
              <a>
                <Image
                  src={album.cover}
                  alt={album.title}
                  width={200}
                  height={200}
                />
                <p>{album.title}</p>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default HomePage
