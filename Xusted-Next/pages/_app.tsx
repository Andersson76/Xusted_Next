'use client'

import React from 'react'
import { AppProps } from 'next/app'
import { AlbumProvider } from '../contexts/AlbumContext'
import { PlayerProvider, usePlayerControls } from '../contexts/PlayerContext'
import Navbar from '../components/Navbar'
import SignalPlayer from '../components/SignalPlayer'
import '../styles/globals.css'
import '@fortawesome/fontawesome-svg-core/styles.css'
import Footer from '../components/Footer'
import Head from 'next/head'

function AppFrame({ Component, pageProps }: AppProps) {
  const { currentTrack } = usePlayerControls()

  return (
    <div className={`wrapper ${currentTrack ? 'pb-20 md:pb-16' : ''}`}>
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
      <SignalPlayer />
    </div>
  )
}

export default function MyApp(props: AppProps) {
  return (
    <AlbumProvider>
      <PlayerProvider>
        <AppFrame {...props} />
      </PlayerProvider>
    </AlbumProvider>
  )
}
