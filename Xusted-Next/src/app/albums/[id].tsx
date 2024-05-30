'use client'

import React from 'react'
import { useRouter } from 'next/router'
import { useAlbum } from '../../contexts/AlbumContext'
import Album from '../../components/Album'

const AlbumPage = () => {
  const { albums } = useAlbum()
  const router = useRouter()
  const { id } = router.query

  const album = albums.find((album) => album.id === id)

  if (!album) {
    return <div>Album not found</div>
  }

  return <Album {...album} />
}

export default AlbumPage
