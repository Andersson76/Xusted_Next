import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Album from '../../components/Album'

const AlbumPage = () => {
  const router = useRouter()
  const { id } = router.query
  const [album, setAlbum] = useState<any>(null)

  useEffect(() => {
    if (id) {
      fetch(`/data/albums.json`)
        .then((response) => response.json())
        .then((data) => {
          const foundAlbum = data.find(
            (album: any) => album.id === parseInt(id as string),
          )
          setAlbum(foundAlbum)
        })
    }
  }, [id])

  return album ? (
    <Album title={album.title} songs={album.songs} image={album.image} />
  ) : (
    <p>Loading...</p>
  )
}

export default AlbumPage
