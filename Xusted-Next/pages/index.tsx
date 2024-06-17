'use client'

import { Cursor, useTypewriter } from 'react-simple-typewriter'
import React from 'react'
//import Link from 'next/link'
//import { Inter } from 'next/font/google'
import BackgroundCircles from 'components/BackgroundCircles'

//const inter = Inter({ subsets: ['latin'] })

interface Props {
  pageInfo: string
}

export default function HomePage({ pageInfo }: Props) {
  const [text, count] = useTypewriter({
    words: [
      'Welcome to Xusted official website',
      'Here you can listen to Xusted´s music',
      'And keeping in touch with Xusted',
    ],
    loop: true,
    delaySpeed: 2000,
  })
  return (
    <>
      <div className="mt-60"></div>
      <BackgroundCircles />
      <h1 className="text-2xl lg:text-6xl font-semibold px-10 text-center mt-16">
        <span className="mr-3">{text}</span>
        <Cursor cursorColor="#F7AB0A" />
      </h1>
    </>
  )
}
