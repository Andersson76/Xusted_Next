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
        duration: 0.5,
      }}
      className="absolute inset-0 flex justify-center items-center overflow-hidden"
    >
      <div className="absolute border border-[#333333] rounded-full h-52 w-52 animate-ping" />
      <div className="rounded-full border border-[#F7AB0A] h-80 w-80 absolute opacity-10 animate-pulse" />
      <div className="rounded-full border border-[#333333] h-130 w-130 absolute opacity-80 animate-ping" />
      <div className="rounded-full border border-[#F7AB0A] opacity-20 h-170 w-170 absolute animate-pulse" />
      <div className="rounded-full border border-[#333333] h-200 w-200 absolute" />
    </motion.div>
  )
}

export default BackgroundCircles
