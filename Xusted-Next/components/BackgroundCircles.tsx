import React from 'react'
import { motion } from 'framer-motion'

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {}

// eslint-disable-next-line no-empty-pattern
function BackgroundCircles({}: Props) {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        scale: [1, 2, 2, 3, 1],
        opacity: [0.1, 0.2, 0.4, 0.8, 0.1, 1.0],
        borderRadius: ['20%', '20%', '50%', '80%', '20%'],
      }}
      transition={{
        duration: 5.5,
      }}
      className="relative flex justify-center items-center"
    >
      <div
        className=" absolute border border-[#333333] rounded-full h-[200px] w-[200px] mt-52
      animate-ping"
      />
      <div
        className="rounded-full border border-[#F7AB0A] h-[300px] w-[300px] absolute opacity-10 animate-pulse
      mt-52"
      />
      <div
        className="rounded-full border border-[#333333] h-[500px] w-[500px] absolute opacity-80
      mt-52 animate-ping"
      />
      <div
        className="rounded-full border border-[#F7AB0A] opacity-20 h-[650px] w-[650px] absolute
      mt-52 animate-pulse"
      />
      <div
        className="rounded-full border border-[#333333] h-[800px] w-[800px] absolute
      mt-52"
      />
    </motion.div>
  )
}

export default BackgroundCircles
