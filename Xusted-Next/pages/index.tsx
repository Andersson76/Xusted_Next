'use client'

import { Cursor, useTypewriter } from 'react-simple-typewriter'
import React from 'react'
//import { Inter } from 'next/font/google'
import BackgroundCircles from 'components/BackgroundCircles'

//const inter = Inter({ subsets: ['latin'] })

const HomePage: React.FC = () => {
  const [text] = useTypewriter({
    words: ['Welcome to Xusted', 'Listen to Xusted', 'Contact Xusted'],
    loop: true,
    delaySpeed: 2000,
  })
  return (
    <>
      <div className="mt-60"></div>
      {<BackgroundCircles />}
      <h1 className="text-2xl lg:text-6xl font-semibold px-10 text-center mt-24 text-white text-opacity-60">
        <span className="mr-3">{text}</span>
        <Cursor cursorColor="#F7AB0A" />
      </h1>
    </>
  )
}
export default HomePage
