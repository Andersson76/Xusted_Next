'use client'

import React from 'react'
import { AppProps } from 'next/app'
import { AlbumProvider } from '../contexts/AlbumContext'
import Navbar from '../components/Navbar'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AlbumProvider>
      <Navbar />
      <Component {...pageProps} />
    </AlbumProvider>
  )
}

export default MyApp
