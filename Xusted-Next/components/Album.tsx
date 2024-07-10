import React, { useState } from 'react'
import Image from 'next/image'

interface Song {
  title: string
  duration: string
  file: string
}

interface AlbumProps {
  id: string
  title: string
  cover: string
  songs: Song[]
}

const Album: React.FC<AlbumProps> = ({ title, cover, songs }) => {
  const [currentSong, setCurrentSong] = useState<string | null>(null)

  const playSong = (file: string) => {
    if (file !== currentSong) {
      setCurrentSong(file) // Play new song if different from current
    } else {
      setCurrentSong(null) // Pause current song if same song clicked again
    }
  }

  return (
    <div className="wrapper text-white text-opacity-75">
      <div className="flex flex-col items-center text-center min-h-[60vh] mt-40">
        <Image
          src={cover}
          alt={title}
          width={200}
          height={200}
          className="mb-2 p-2 sm:p-4 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-80 lg:h-80"
        />
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        <ul className="mt-5">
          {songs.map((song, index) => (
            <li
              key={index}
              className="hover:bg-gray-700 px-4 py-2 cursor-pointer flex items-center"
            >
              {/* Play button */}
              <button
                className="mr-4 bg-gray-800 rounded-full w-8 h-8 flex items-center justify-center text-white"
                onClick={() => playSong(song.file)}
              >
                {currentSong === song.file ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 4h4v16H6zM14 4h4v16h-4z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                )}
              </button>
              {/* Song details */}
              <div className="ml-1" onClick={() => playSong(song.file)}>
                {song.title} - {song.duration}
              </div>
            </li>
          ))}
        </ul>
        {currentSong && (
          <audio
            controls
            autoPlay
            className="mt-5"
            src={currentSong}
            /* type="audio/wav" */
            onEnded={() => setCurrentSong(null)}
          >
            Your browser does not support the audio element.
          </audio>
        )}
      </div>
    </div>
  )
}

export default Album
