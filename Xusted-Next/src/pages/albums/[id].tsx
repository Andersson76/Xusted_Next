import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Album from '../../components/Album'

const AlbumPage = () => {
  const router = useRouter()
  const { id } = router.query
  const [album, setAlbum] = useState<any>(null)

  useEffect(() => {
    if (id) {
      axios
        .get('/data/albums.json')
        .then((response) => {
          const foundAlbum = response.data.find(
            (album: any) => album.id === parseInt(id as string),
          )
          setAlbum(foundAlbum)
        })
        .catch((error) => {
          console.error('Error fetching album:', error)
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
