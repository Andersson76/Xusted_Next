'use client'

import React, { useEffect } from 'react'
import { useAlbum } from '@/contexts/AlbumContext'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import styles from '@/styles/Home.module.css'


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
    <div className={styles.main}>
      <ul className={styles.grid}>
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

export default Albums
