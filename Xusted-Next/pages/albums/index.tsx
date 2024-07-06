'use client'

import React, { useEffect /* useState */ } from 'react'
import { useAlbum } from '../../contexts/AlbumContext'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { Inter } from 'next/font/google'
import { FiArrowRight } from 'react-icons/fi'

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
    <div className="wrapper">
      <main className="flex flex-col items-center">
        <h1
          className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xlfont-bold text-gray-400 text-center mt-24 ${inter.className}`}
        >
          EP & Singles
        </h1>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
          {albums.map((album) => (
            <li key={album.id} className="relative group flex justify-center ">
              <Link href={`/albums/${album.id}`} passHref legacyBehavior>
                <a className="relative block">
                  <Image
                    src={album.cover}
                    alt={album.title}
                    width={200}
                    height={200}
                    className="rounded-md mb-2 shadow-xl p-2 sm:p-4 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-64 lg:h-64 transition-transform duration-300 transform group-hover:scale-90"
                  />
                  <div className="absolute bottom-2 right-2 bg-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 md:opacity-0 md:group-hover:opacity-100">
                    <FiArrowRight className="text-black" size={24} />
                  </div>
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  )
}
