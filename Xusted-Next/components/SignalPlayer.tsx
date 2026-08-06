'use client'

import React, { CSSProperties } from 'react'
import Image from 'next/image'
import {
  BackwardIcon,
  ForwardIcon,
  PauseIcon,
  PlayIcon,
  XMarkIcon,
} from '@heroicons/react/24/solid'
import { usePlayerControls, usePlayerProgress } from '../contexts/PlayerContext'
import styles from '../styles/SignalPlayer.module.css'

function formatTime(value: number) {
  if (!Number.isFinite(value) || value < 0) return '--:--'
  const minutes = Math.floor(value / 60)
  const seconds = Math.floor(value % 60)
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

export default function SignalPlayer() {
  const {
    currentTrack,
    status,
    isPlaying,
    error,
    hasPrevious,
    hasNext,
    togglePlayback,
    previousTrack,
    nextTrack,
    stop,
  } = usePlayerControls()
  const { currentTime, duration, progress, seek } = usePlayerProgress()

  if (!currentTrack) return null

  const elapsedLabel = formatTime(currentTime)
  const durationLabel =
    duration > 0 ? formatTime(duration) : currentTrack.durationLabel ?? '--:--'
  const progressStyle = {
    '--player-progress': `${progress}%`,
  } as CSSProperties
  const canPause = isPlaying || status === 'loading'
  const signalStatus =
    status === 'loading'
      ? 'TUNING SIGNAL'
      : status === 'error'
        ? 'SIGNAL LOST'
        : 'SIGNAL LINK'
  const liveMessage =
    status === 'playing'
      ? `Playing ${currentTrack.title}`
      : status === 'paused'
        ? `Paused ${currentTrack.title}`
        : status === 'loading'
          ? `Loading ${currentTrack.title}`
          : ''

  return (
    <aside className={styles.shell} aria-label="Music player">
      <div
        className={styles.player}
        data-status={status}
        style={progressStyle}
        aria-busy={status === 'loading'}
      >
        <div className={styles.identity}>
          <Image
            src={currentTrack.cover}
            alt=""
            width={40}
            height={40}
            className={styles.cover}
          />
          <div className={styles.trackCopy}>
            <div className={styles.titleLine}>
              <span
                className={`${styles.signalBars} ${isPlaying ? styles.signalBarsPlaying : ''}`}
                aria-hidden="true"
              >
                <i />
                <i />
                <i />
                <i />
              </span>
              <strong>{currentTrack.title}</strong>
            </div>
            <span className={styles.albumTitle}>
              {currentTrack.albumTitle} / {signalStatus}
            </span>
          </div>
        </div>

        <div className={styles.transport}>
          <button
            type="button"
            className={styles.iconButton}
            onClick={() => void previousTrack()}
            disabled={!hasPrevious}
            aria-label="Previous track or restart current track"
          >
            <BackwardIcon aria-hidden="true" />
          </button>
          <button
            type="button"
            className={styles.playButton}
            onClick={() => void togglePlayback()}
            aria-label={
              canPause
                ? `Pause ${currentTrack.title}`
                : `Play ${currentTrack.title}`
            }
          >
            {canPause ? (
              <PauseIcon aria-hidden="true" />
            ) : (
              <PlayIcon aria-hidden="true" />
            )}
          </button>
          <button
            type="button"
            className={styles.iconButton}
            onClick={() => void nextTrack()}
            disabled={!hasNext}
            aria-label="Next track"
          >
            <ForwardIcon aria-hidden="true" />
          </button>
        </div>

        <div className={styles.timeline}>
          <label className="sr-only" htmlFor="global-signal-seek">
            Seek position in {currentTrack.title}
          </label>
          <input
            id="global-signal-seek"
            className={styles.seek}
            type="range"
            min="0"
            max={duration || 0}
            step="1"
            value={Math.min(currentTime, duration || 0)}
            disabled={!duration}
            onChange={(event) => seek(Number(event.currentTarget.value))}
            aria-valuetext={`${elapsedLabel} of ${durationLabel}`}
            style={progressStyle}
          />
          <div className={styles.time} aria-hidden="true">
            <span>{elapsedLabel}</span>
            <span>{durationLabel}</span>
          </div>
        </div>

        <button
          type="button"
          className={styles.closeButton}
          onClick={stop}
          aria-label="Close music player"
        >
          <XMarkIcon aria-hidden="true" />
        </button>

        {error ? (
          <p className={styles.error} role="alert">
            {error}
          </p>
        ) : null}
        <span className="sr-only" aria-live="polite" aria-atomic="true">
          {liveMessage}
        </span>
      </div>
    </aside>
  )
}
