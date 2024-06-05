'use client'

import React from 'react'
import { AppProps } from 'next/app'
import { AlbumProvider } from '../contexts/AlbumContext'
import Navbar from '../components/Navbar'
import '../styles/globals.css'
//import '@/fontawesome'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { config } from '@fortawesome/fontawesome-svg-core'
import Footer from '../components/Footer'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AlbumProvider>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </AlbumProvider>
  )
}