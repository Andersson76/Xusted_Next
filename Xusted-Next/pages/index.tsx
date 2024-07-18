import { Cursor, useTypewriter } from 'react-simple-typewriter'
import React, { Suspense, lazy } from 'react'
import Head from 'next/head'

const BackgroundCircles = lazy(() => import('components/BackgroundCircles'))
const Buttons = lazy(() => import('components/Buttons'))

const HomePage: React.FC = () => {
  const [text] = useTypewriter({
    words: ['Welcome to Xusted', 'Listen to Xusted', 'Contact Xusted'],
    loop: true,
    delaySpeed: 3000,
  })

  return (
    <div className="wrapper">
      <Head>
        <title>Xusted Music - Your electronic music website</title>
        <meta
          name="description"
          content="Listen to music from Xusted, contact Xusted, see Xusted album cover graphic"
        />
      </Head>
      <Suspense fallback={<div>Loading...</div>}>
        <BackgroundCircles />
      </Suspense>
      <div className="absolute inset-0 flex flex-col justify-center items-center">
        <h1 className="text-2xl lg:text-6xl font-semibold px-10 text-center text-white text-opacity-60">
          <span className="mr-1">{text}</span>
          <Cursor cursorColor="#F7AB0A" />
        </h1>
        <div className="mt-5">
          <Suspense fallback={<div>Loading...</div>}>
            <Buttons />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

export default HomePage
