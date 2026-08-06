'use client'

import React, { useEffect } from 'react'
import { useAlbum } from '../../contexts/AlbumContext'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { FiArrowRight } from 'react-icons/fi'

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
    <section
      className="flex flex-col items-center px-4 pb-6 pt-32"
      aria-label="Albums"
    >
      <ul className="grid w-full max-w-[72rem] grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {albums.map((album) => (
          <li key={album.id} className="group relative flex justify-center">
            <Link href={`/albums/${album.id}`} passHref legacyBehavior>
              <a className="relative block w-4/5 max-w-[20rem] outline-none focus-visible:ring-2 focus-visible:ring-[#f7ab0a] focus-visible:ring-offset-4 focus-visible:ring-offset-[#0d0f10] sm:w-full sm:max-w-[14rem]">
                <Image
                  src={album.cover}
                  alt={album.title}
                  width={320}
                  height={320}
                  sizes="(max-width: 639px) 80vw, 224px"
                  className="aspect-square h-auto w-full rounded-md object-cover shadow-xl transition-transform duration-300 group-hover:scale-[0.97]"
                />
                <div className="absolute bottom-3 right-3 rounded-full bg-white p-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100">
                  <FiArrowRight className="text-black" size={24} />
                </div>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
