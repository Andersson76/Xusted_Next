'use client'

import React from 'react'
import Image from 'next/image'
interface Song {
  title: string
  duration: string
}
interface AlbumProps {
  id: string
  title: string
  cover: string
  songs: Song[]
}

const Album: React.FC<AlbumProps> = ({ title, cover, songs }) => {
  console.log('Album songs data:', songs)

  return (
    <div className="wrapper text-white text-opacity-75">
      <div className="flex flex-col items-center text-center min-h-[60vh] mt-40">
        <Image
          src={cover}
          alt={title}
          width={200}
          height={200}
          className="mb-2 p-2 sm:p-4 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-80 lg:h-80"
        />
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        <ul className="mt-5">
          {songs.map((song, index) => (
            <li key={index} className="hover:bg-gray-700 px-4 py-2">
              {song}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Album
