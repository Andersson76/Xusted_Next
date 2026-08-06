'use client'

import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react'
import { isPlayableAudioSource } from '../lib/playerTracks'

export interface PlayerTrack {
  id: string
  albumId: string
  albumTitle: string
  title: string
  file: string
  cover: string
  durationLabel?: string
}

export type PlayerStatus = 'idle' | 'loading' | 'playing' | 'paused' | 'error'

interface PlayerControlsValue {
  currentTrack: PlayerTrack | null
  status: PlayerStatus
  isPlaying: boolean
  error: string | null
  hasPrevious: boolean
  hasNext: boolean
  playTrack: (track: PlayerTrack, queue?: PlayerTrack[]) => Promise<void>
  toggleTrack: (track: PlayerTrack, queue?: PlayerTrack[]) => Promise<void>
  togglePlayback: () => Promise<void>
  previousTrack: () => Promise<void>
  nextTrack: () => Promise<void>
  stop: () => void
}

interface PlayerProgressValue {
  currentTime: number
  duration: number
  progress: number
  seek: (seconds: number) => void
}

const PlayerControlsContext = createContext<PlayerControlsValue | undefined>(
  undefined,
)
const PlayerProgressContext = createContext<PlayerProgressValue | undefined>(
  undefined,
)

function mediaErrorMessage(code?: number) {
  switch (code) {
    case 2:
      return 'The audio connection was interrupted. Try again.'
    case 3:
      return 'This audio file could not be decoded.'
    case 4:
      return 'This audio format is not supported.'
    default:
      return 'The signal could not be played. Try again.'
  }
}

function isAbortError(error: unknown) {
  return (
    typeof error === 'object' &&
    error !== null &&
    'name' in error &&
    error.name === 'AbortError'
  )
}

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const currentTrackRef = useRef<PlayerTrack | null>(null)
  const queueRef = useRef<PlayerTrack[]>([])
  const queueIndexRef = useRef(-1)
  const playRequestRef = useRef(0)
  const lastTimeUpdateRef = useRef(0)

  const [currentTrack, setCurrentTrack] = useState<PlayerTrack | null>(null)
  const [queueIndex, setQueueIndex] = useState(-1)
  const [queueLength, setQueueLength] = useState(0)
  const [status, setStatus] = useState<PlayerStatus>('idle')
  const [error, setError] = useState<string | null>(null)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  const startTrack = useCallback(async (track: PlayerTrack) => {
    const audio = audioRef.current
    if (!audio) return
    const requestId = ++playRequestRef.current

    currentTrackRef.current = track
    lastTimeUpdateRef.current = 0
    setCurrentTrack(track)
    setCurrentTime(0)
    setDuration(0)
    setError(null)

    if (!isPlayableAudioSource(track.file)) {
      audio.pause()
      audio.removeAttribute('src')
      audio.load()
      setStatus('error')
      setError('This track is not available yet.')
      return
    }

    setStatus('loading')
    audio.src = track.file
    audio.load()

    try {
      await audio.play()
    } catch (caughtError) {
      if (requestId !== playRequestRef.current || isAbortError(caughtError)) {
        return
      }
      setStatus('error')
      setError('Playback was blocked. Press play to try again.')
    }
  }, [])

  const goToQueueIndex = useCallback(
    async (index: number) => {
      const track = queueRef.current[index]
      if (!track) return

      queueIndexRef.current = index
      setQueueIndex(index)
      await startTrack(track)
    },
    [startTrack],
  )

  const playTrack = useCallback(
    async (track: PlayerTrack, queue: PlayerTrack[] = [track]) => {
      const playableQueue = queue.filter((item) =>
        isPlayableAudioSource(item.file),
      )
      const nextQueue = playableQueue.length > 0 ? playableQueue : [track]
      const nextIndex = Math.max(
        0,
        nextQueue.findIndex((item) => item.id === track.id),
      )

      queueRef.current = nextQueue
      queueIndexRef.current = nextIndex
      setQueueIndex(nextIndex)
      setQueueLength(nextQueue.length)
      await startTrack(track)
    },
    [startTrack],
  )

  const togglePlayback = useCallback(async () => {
    const audio = audioRef.current
    if (!audio || !currentTrackRef.current) return

    if (!isPlayableAudioSource(currentTrackRef.current.file)) {
      setStatus('error')
      setError('This track is not available yet.')
      return
    }

    if (!audio.paused) {
      playRequestRef.current += 1
      audio.pause()
      return
    }

    if (
      audio.ended ||
      (audio.duration && audio.currentTime >= audio.duration)
    ) {
      audio.currentTime = 0
    }

    setError(null)
    setStatus('loading')
    const requestId = ++playRequestRef.current
    try {
      await audio.play()
    } catch (caughtError) {
      if (requestId !== playRequestRef.current || isAbortError(caughtError)) {
        return
      }
      setStatus('error')
      setError('Playback was blocked. Press play to try again.')
    }
  }, [])

  const toggleTrack = useCallback(
    async (track: PlayerTrack, queue?: PlayerTrack[]) => {
      if (currentTrackRef.current?.id === track.id) {
        await togglePlayback()
        return
      }

      await playTrack(track, queue)
    },
    [playTrack, togglePlayback],
  )

  const previousTrack = useCallback(async () => {
    const audio = audioRef.current
    if (audio && (audio.currentTime > 5 || queueIndexRef.current <= 0)) {
      audio.currentTime = 0
      setCurrentTime(0)
      return
    }

    await goToQueueIndex(queueIndexRef.current - 1)
  }, [goToQueueIndex])

  const nextTrack = useCallback(async () => {
    await goToQueueIndex(queueIndexRef.current + 1)
  }, [goToQueueIndex])

  const stop = useCallback(() => {
    playRequestRef.current += 1
    currentTrackRef.current = null
    queueRef.current = []
    queueIndexRef.current = -1

    const audio = audioRef.current
    if (audio) {
      audio.pause()
      audio.removeAttribute('src')
      audio.load()
    }

    setCurrentTrack(null)
    setQueueIndex(-1)
    setQueueLength(0)
    setStatus('idle')
    setError(null)
    setCurrentTime(0)
    setDuration(0)
  }, [])

  const seek = useCallback((seconds: number) => {
    const audio = audioRef.current
    if (!audio || !Number.isFinite(audio.duration)) return

    const nextTime = Math.min(Math.max(seconds, 0), audio.duration)
    audio.currentTime = nextTime
    setCurrentTime(nextTime)
  }, [])

  const handleEnded = useCallback(() => {
    const audio = audioRef.current
    if (audio && Number.isFinite(audio.duration)) {
      setCurrentTime(audio.duration)
    }

    if (queueIndexRef.current < queueRef.current.length - 1) {
      void goToQueueIndex(queueIndexRef.current + 1)
      return
    }

    setStatus('paused')
  }, [goToQueueIndex])

  const controlsValue = useMemo<PlayerControlsValue>(
    () => ({
      currentTrack,
      status,
      isPlaying: status === 'playing',
      error,
      hasPrevious: currentTrack !== null,
      hasNext: queueIndex >= 0 && queueIndex < queueLength - 1,
      playTrack,
      toggleTrack,
      togglePlayback,
      previousTrack,
      nextTrack,
      stop,
    }),
    [
      currentTrack,
      error,
      nextTrack,
      playTrack,
      previousTrack,
      queueIndex,
      queueLength,
      status,
      stop,
      togglePlayback,
      toggleTrack,
    ],
  )

  const progressValue = useMemo<PlayerProgressValue>(() => {
    const progress = duration > 0 ? (currentTime / duration) * 100 : 0

    return {
      currentTime,
      duration,
      progress: Math.min(Math.max(progress, 0), 100),
      seek,
    }
  }, [currentTime, duration, seek])

  return (
    <PlayerControlsContext.Provider value={controlsValue}>
      <PlayerProgressContext.Provider value={progressValue}>
        {children}
        <audio
          ref={audioRef}
          preload="metadata"
          onLoadStart={() => {
            if (currentTrackRef.current) setStatus('loading')
          }}
          onLoadedMetadata={(event) => {
            const nextDuration = event.currentTarget.duration
            setDuration(Number.isFinite(nextDuration) ? nextDuration : 0)
          }}
          onDurationChange={(event) => {
            const nextDuration = event.currentTarget.duration
            setDuration(Number.isFinite(nextDuration) ? nextDuration : 0)
          }}
          onTimeUpdate={(event) => {
            const now = Date.now()
            if (now - lastTimeUpdateRef.current < 200) return

            lastTimeUpdateRef.current = now
            setCurrentTime(event.currentTarget.currentTime)
          }}
          onPlaying={() => setStatus('playing')}
          onPause={(event) => {
            if (currentTrackRef.current) {
              setCurrentTime(event.currentTarget.currentTime)
              setStatus('paused')
            }
          }}
          onWaiting={() => setStatus('loading')}
          onEnded={handleEnded}
          onError={(event) => {
            if (!currentTrackRef.current) return
            setStatus('error')
            setError(mediaErrorMessage(event.currentTarget.error?.code))
          }}
        />
      </PlayerProgressContext.Provider>
    </PlayerControlsContext.Provider>
  )
}

export function usePlayerControls() {
  const context = useContext(PlayerControlsContext)
  if (!context) {
    throw new Error('usePlayerControls must be used within a PlayerProvider')
  }
  return context
}

export function usePlayerProgress() {
  const context = useContext(PlayerProgressContext)
  if (!context) {
    throw new Error('usePlayerProgress must be used within a PlayerProvider')
  }
  return context
}
