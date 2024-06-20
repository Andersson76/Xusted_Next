'use client'

import React, { useEffect, useState } from 'react'
import { useAlbum } from '../../contexts/AlbumContext'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { Inter } from 'next/font/google'
import { FiArrowRight } from 'react-icons/fi'

const inter = Inter({ subsets: ['latin'] })

export default function Albums() {
  const { albums, setAlbums, addAlbum } = useAlbum()
  const [newAlbum, setNewAlbum] = useState({
    id: '',
    title: '',
    cover: '',
  })

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewAlbum((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    addAlbum(newAlbum)
    setNewAlbum({ id: '', title: '', cover: '' })
  }

  return (
    <div className={`mt-40`}>
      <h1
        className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xlfont-bold text-gray-400 text-center ${inter.className}`}
      >
        EP & Singles
      </h1>
      <main className="flex justify-center">
        <form onSubmit={handleSubmit} className="mb-8 w-full max-w-md">
          <h2 className="text-xl font-bold mb-4">Add New Album</h2>
          <input
            type="text"
            name="id"
            value={newAlbum.id}
            onChange={handleChange}
            placeholder="Album ID"
            className="w-full mb-2 p-2 border rounded"
            required
          />
          <input
            type="text"
            name="title"
            value={newAlbum.title}
            onChange={handleChange}
            placeholder="Album Title"
            className="w-full mb-2 p-2 border rounded"
            required
          />
          <input
            type="text"
            name="cover"
            value={newAlbum.cover}
            onChange={handleChange}
            placeholder="Album Cover URL"
            className="w-full mb-2 p-2 border rounded"
            required
          />
          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white rounded"
          >
            Add Album
          </button>
        </form>
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
                    className="rounded-md mb-2 shadow-xl p-2 sm:p-4 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 transition-transform duration-300 transform group-hover:scale-90"
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
