import React, { useMemo } from 'react'
import Image from 'next/image'
import { PauseIcon, PlayIcon } from '@heroicons/react/24/solid'
import { usePlayerControls } from '../contexts/PlayerContext'
import { createPlayerQueue, isPlayableAudioSource } from '../lib/playerTracks'

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

const Album: React.FC<AlbumProps> = ({ id, title, cover, songs }) => {
  const { currentTrack, status, isPlaying, toggleTrack } = usePlayerControls()
  const queue = useMemo(
    () => createPlayerQueue({ id, title, cover, songs }),
    [cover, id, songs, title],
  )

  return (
    <div className="wrapper text-white text-opacity-75">
      <div className="mt-40 flex min-h-[60vh] flex-col items-center px-4 text-center">
        <Image
          src={cover}
          alt={`${title} album cover`}
          width={320}
          height={320}
          sizes="(max-width: 640px) 176px, (max-width: 1024px) 256px, 320px"
          className="mb-2 h-44 w-44 object-cover p-2 sm:h-48 sm:w-48 sm:p-4 md:h-64 md:w-64 lg:h-80 lg:w-80"
        />
        <h1 className="mb-2 text-2xl font-bold">{title}</h1>
        <p className="font-mono text-[0.65rem] tracking-[0.18em] text-[#b17c13]">
          SELECT A SIGNAL
        </p>

        <ul className="mt-5 w-full max-w-xl border-t border-white/10">
          {queue.map((track, index) => {
            const isActive = currentTrack?.id === track.id
            const canPause = isActive && (isPlaying || status === 'loading')
            const isAvailable = isPlayableAudioSource(track.file)

            return (
              <li key={track.id} className="border-b border-white/10">
                <button
                  type="button"
                  className={`group grid w-full grid-cols-[2.5rem_minmax(0,1fr)_auto] items-center gap-3 px-3 py-3 text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f7ab0a] disabled:cursor-not-allowed disabled:opacity-40 ${
                    isActive ? 'bg-white/[0.07]' : 'hover:bg-white/[0.04]'
                  }`}
                  onClick={() => void toggleTrack(track, queue)}
                  disabled={!isAvailable}
                  aria-label={
                    !isAvailable
                      ? `${track.title} is unavailable`
                      : canPause
                        ? `Pause ${track.title}`
                        : `Play ${track.title}`
                  }
                >
                  <span
                    className={`grid h-8 w-8 place-items-center border transition-colors ${
                      isActive
                        ? 'border-[#f7ab0a] bg-[#f7ab0a] text-black'
                        : 'border-white/20 text-white group-hover:border-[#f7ab0a] group-hover:text-[#f7ab0a]'
                    }`}
                    aria-hidden="true"
                  >
                    {canPause ? (
                      <PauseIcon className="h-3.5 w-3.5" />
                    ) : (
                      <PlayIcon className="h-3.5 w-3.5" />
                    )}
                  </span>

                  <span className="min-w-0">
                    <span className="block truncate text-sm font-semibold text-white/80">
                      {track.title}
                    </span>
                    <span className="mt-0.5 block font-mono text-[0.58rem] tracking-[0.13em] text-white/35">
                      {isAvailable
                        ? `TRACK ${(index + 1).toString().padStart(2, '0')}`
                        : 'SIGNAL UNAVAILABLE'}
                    </span>
                  </span>

                  <span className="font-mono text-xs tabular-nums text-white/45">
                    {track.durationLabel}
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default Album
