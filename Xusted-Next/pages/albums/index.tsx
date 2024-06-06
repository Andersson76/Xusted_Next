'use client'

import React, { useEffect } from 'react'
import { useAlbum } from '../../contexts/AlbumContext'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Albums() {
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
    <div className="mt-40">
      <h1 className={`text-2xl font-bold text-gray-800 text-center ${inter}`}>
        EP & Singles
      </h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-10">
        {albums.map((album) => (
          <li key={album.id} className="bg-white p-1">
            <Link href={`/albums/${album.id}`} passHref legacyBehavior>
              <a>
                <Image
                  src={album.cover}
                  alt={album.title}
                  width={200}
                  height={200}
                  className="rounded-md mb-2 shadow-xl p-4"
                />
                {/* <h2 className="text-xl font-bold">{album.title}</h2> */}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
