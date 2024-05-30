// app/layout.tsx
import '../styles/globals.css'
import { AlbumProvider } from '../contexts/AlbumContext'
import Navbar from '../components/Navbar'
import type { ReactNode } from 'react'

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <AlbumProvider>
      <html lang="en">
        <body>
          <Navbar />
          <main>{children}</main>
        </body>
      </html>
    </AlbumProvider>
  )
}

export default Layout
