import React from 'react'
import { AlbumProvider } from 'contexts/AlbumContext'
import Navbar from 'components/Navbar'
import type { ReactNode } from 'react'
import Footer from 'components/Footer'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <AlbumProvider>
      <div className="wrapper">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </div>
    </AlbumProvider>
  )
}
