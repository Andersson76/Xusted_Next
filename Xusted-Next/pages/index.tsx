'use client'

import React, { useEffect } from 'react'
//import { useAlbum } from '../contexts/AlbumContext'
//import axios from 'axios'
//import Link from 'next/link'
//import Image from 'next/image'
//import { Inter } from 'next/font/google'
//import styles from '../styles/Home.module.css'
import BackgroundCircles from 'components/BackgroundCircles'

//const inter = Inter({ subsets: ['latin'] })

export default function HomePage() {
  /* const { albums, setAlbums } = useAlbum() */

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        //const response = await axios.get('/data/albums.json')
        //setAlbums(response.data)
      } catch (error) {
        console.error('Error fetching albums:', error)
      }
    }

    fetchAlbums()
  }, [])

  return (
    <>
      <div className="mt-60"></div>
      <BackgroundCircles />
      {/* <main className={styles.center}>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-2">
            {albums.map((album) => (
              <li key={album.id}>
                <Link href={`/albums/${album.id}`} passHref legacyBehavior>
                  <a>
                    <Image
                      src={album.cover}
                      alt={album.title}
                      width={200}
                      height={200}
                    />
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </main> */}
    </>
  )
}
