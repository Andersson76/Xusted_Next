'use client'

import Link from 'next/link'
import { useEffect } from 'react'
import axios from 'axios'
import { useAlbum } from '../../contexts/AlbumContext'
import Image from 'next/image'

const Albums = () => {
  const { albums, setAlbums } = useAlbum()

  useEffect(() => {
    if (albums.length === 0) {
      axios
        .get('/data/albums.json')
        .then((response) => {
          setAlbums(response.data)
        })
        .catch((error) => {
          console.error('Error fetching albums:', error)
        })
    }
  }, [albums, setAlbums])

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Albums</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {albums.map((album) => (
          <li key={album.id} className="bg-white p-4 rounded-md shadow-md">
            <Link href={`/albums/${album.id}`}>
              <a>
                <Image
                  src={album.cover}
                  alt={album.title}
                  width={200}
                  height={200}
                  className="rounded-md mb-2"
                />
                <h2 className="text-xl font-bold">{album.title}</h2>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Albums
