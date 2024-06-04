// app/layout.tsx
import '../styles/globals.css'
import { AlbumProvider } from '../contexts/AlbumContext'
import Navbar from '../components/Navbar'
import type { ReactNode } from 'react'
import Footer from '@/components/Footer'

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <AlbumProvider>
      <html lang="en">
        <body>
          <Navbar />
          <div className="mt-16"></div>
          <main>{children}</main>
          <Footer />
        </body>
      </html>
    </AlbumProvider>
  )
}

export default Layout
