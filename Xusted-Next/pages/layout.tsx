import React from 'react'
//import '../styles/globals.css'
import { AlbumProvider } from 'contexts/AlbumContext'
import Navbar from 'components/Navbar'
import type { ReactNode } from 'react'
import Footer from 'components/Footer'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <AlbumProvider>
      <html lang="en">
        <body>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </body>
      </html>
    </AlbumProvider>
  )
}
