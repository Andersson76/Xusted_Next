import { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'

const albumsFilePath = path.resolve(process.cwd(), 'data', 'albums.json')
const publicAlbumsFilePath = path.resolve(
  process.cwd(),
  'public',
  'data',
  'albums.json',
)

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const newAlbum = req.body

      // Kontrollera om filen finns, annars skapa en tom fil
      if (!fs.existsSync(albumsFilePath)) {
        await fs.promises.writeFile(albumsFilePath, '[]')
      }

      const data = await fs.promises.readFile(albumsFilePath, 'utf8')
      const albums = JSON.parse(data)
      albums.push(newAlbum)

      await fs.promises.writeFile(
        albumsFilePath,
        JSON.stringify(albums, null, 2),
      )
      await fs.promises.writeFile(
        publicAlbumsFilePath,
        JSON.stringify(albums, null, 2),
      )

      res.status(201).json(newAlbum)
    } catch (error) {
      console.error('Error handling request:', error)
      res.status(500).json({ message: 'Error handling request' })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

export default handler
