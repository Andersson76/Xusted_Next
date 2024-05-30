import React from 'react'
import { motion } from 'framer-motion'

interface AlbumProps {
  id: string
  title: string
  cover: string
  songs: { title: string }[]
}

const Album: React.FC<AlbumProps> = ({ id, title, cover, songs }) => {
  return (
    <motion.div whileHover={{ scale: 1.05 }} className="album">
      <img src={cover} alt={title} className="album-cover" />
      <h2>{title}</h2>
      <ul>
        {songs.map((song, index) => (
          <li key={index}>{song.title}</li>
        ))}
      </ul>
    </motion.div>
  )
}

export default Album
