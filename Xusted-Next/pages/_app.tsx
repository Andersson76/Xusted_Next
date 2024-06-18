'use client'

import React from 'react'
import { AppProps } from 'next/app'
import { AlbumProvider } from '../contexts/AlbumContext'
import Navbar from '../components/Navbar'
import '../styles/globals.css'
import '@fortawesome/fontawesome-svg-core/styles.css'
import Footer from '../components/Footer'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AlbumProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Component {...pageProps} />
        </main>
        <Footer />
      </div>
    </AlbumProvider>
  )
}
