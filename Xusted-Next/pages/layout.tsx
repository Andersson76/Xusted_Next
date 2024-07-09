import React from 'react'
import { AlbumProvider } from 'contexts/AlbumContext'
import Navbar from 'components/Navbar'
import type { ReactNode } from 'react'
import Footer from 'components/Footer'
import AlbumList from 'components/AlbumList'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <AlbumProvider>
      <AlbumList />
      <div className="wrapper">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </div>
    </AlbumProvider>
  )
}
