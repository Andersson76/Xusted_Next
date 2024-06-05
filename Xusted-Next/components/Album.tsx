'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

interface AlbumProps {
  id: string
  title: string
  cover: string
  songs: { title: string }[]
}

const Album: React.FC<AlbumProps> = ({ id, title, cover, songs }) => {
  return (
    <motion.div whileHover={{ scale: 1.05 }} className="album">
      <Link href={`/albums/${id}`} passHref legacyBehavior>
        <a>
          <Image
            src={cover}
            alt={title}
            width={200}
            height={200}
            className="album-cover"
          />
          <h2>{title}</h2>
          <ul>
            {songs.map((song, index) => (
              <li key={index}>{song.title}</li>
            ))}
          </ul>
        </a>
      </Link>
    </motion.div>
  )
}

export default Album
