'use client'

import React from 'react'
import { AppProps } from 'next/app'
import { AlbumProvider } from '../contexts/AlbumContext'
import Navbar from '../components/Navbar'
import '../styles/globals.css'
import '@fortawesome/fontawesome-svg-core/styles.css'
import Footer from '../components/Footer'
//import AlbumList from 'components/AlbumList'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AlbumProvider>
      <div className="wrapper">
        <Navbar />
        <main className="flex-grow">
          <Component {...pageProps} />
        </main>
        <Footer />
      </div>
    </AlbumProvider>
  )
}
