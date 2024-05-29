import { motion } from 'framer-motion'
import React from 'react'
import Image from 'next/image'

type AlbumProps = {
  title: string
  songs: string[]
  image: string
}

const Album: React.FC<AlbumProps> = ({ title, songs, image }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="album"
    >
      <Image
        src={image}
        alt={title}
        width={300}
        height={300}
        className="rounded-md"
      />
      <h1 className="text-3xl font-bold mb-4">{title}</h1>
      <ul>
        {songs.map((song, index) => (
          <li key={index} className="mb-2">
            {song}
          </li>
        ))}
      </ul>
    </motion.div>
  )
}
export default Album
