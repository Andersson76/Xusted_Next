'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
interface AlbumProps {
  id: string
  title: string
  cover: string
  songs: string[]
}

const Album: React.FC<AlbumProps> = ({ id, title, cover, songs }) => {
  return (
    <div className="grid place-items-center text-center mt-60">
      <Link href={`/albums/${id}`} passHref legacyBehavior>
        <a>
          <Image
            src={cover}
            alt={title}
            width={200}
            height={200}
            className="mb-2 p-2 sm:p-4 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-80 lg:h-80"
          />
          <h2 className="text-white text-opacity-75 mb-5">{title}</h2>
          <ul className="text-white text-opacity-75">
            {songs.map((song, index) => (
              <li key={index}>{song}</li>
            ))}
          </ul>
        </a>
      </Link>
    </div>
  )
}

export default Album
