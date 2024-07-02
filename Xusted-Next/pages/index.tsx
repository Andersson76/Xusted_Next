import { Cursor, useTypewriter } from 'react-simple-typewriter'
import React from 'react'
import BackgroundCircles from 'components/BackgroundCircles'
import Buttons from 'components/Buttons'

const HomePage: React.FC = () => {
  const [text] = useTypewriter({
    words: ['Welcome to Xusted', 'Listen to Xusted', 'Contact Xusted'],
    loop: true,
    delaySpeed: 3000,
  })

  return (
    <div className="wrapper">
      <BackgroundCircles />
      <div className="absolute inset-0 flex flex-col justify-center items-center">
        <h1 className="text-2xl lg:text-6xl font-semibold px-10 text-center text-white text-opacity-60">
          <span className="mr-1">{text}</span>
          <Cursor cursorColor="#F7AB0A" />
        </h1>
        <div className="mt-5">
          <Buttons />
        </div>
      </div>
    </div>
  )
}

export default HomePage
