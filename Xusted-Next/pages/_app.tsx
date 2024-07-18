'use client'

import React from 'react'
import { AppProps } from 'next/app'
import { AlbumProvider } from '../contexts/AlbumContext'
import Navbar from '../components/Navbar'
import '../styles/globals.css'
import '@fortawesome/fontawesome-svg-core/styles.css'
import Footer from '../components/Footer'
import Head from 'next/head'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AlbumProvider>
      <div className="wrapper">
        <Head>
          <title>Xusted Music - Your Electronic Music Website</title>
          <meta
            name="description"
            content="Listen to music from Xusted. Contact Xusted. Xusted album cover"
          />
        </Head>
        <Navbar />
        <main className="flex-grow">
          <Component {...pageProps} />
        </main>
        <Footer />
      </div>
    </AlbumProvider>
  )
}
