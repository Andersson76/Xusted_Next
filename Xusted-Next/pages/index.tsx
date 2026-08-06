'use client'

import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { PauseIcon, PlayIcon } from '@heroicons/react/24/solid'
import albumsData from '../public/data/albums.json'
import { usePlayerControls } from '../contexts/PlayerContext'
import { createPlayerQueue, getAlbumDuration } from '../lib/playerTracks'
import styles from '../styles/HomeHero.module.css'

const featuredAlbum = albumsData[0]
const featuredQueue = createPlayerQueue(featuredAlbum)
const featuredTrack = featuredQueue[0]
const featuredDuration = getAlbumDuration(featuredAlbum.songs)
const transmissionId = featuredAlbum.id.padStart(3, '0')

export default function HomePage() {
  const { currentTrack, status, isPlaying, toggleTrack } = usePlayerControls()
  const featuredTrackIsActive = currentTrack?.id === featuredTrack.id
  const featuredTrackCanPause =
    featuredTrackIsActive && (isPlaying || status === 'loading')
  const featuredAlbumIsPlaying =
    isPlaying && currentTrack?.albumId === featuredAlbum.id

  return (
    <div className={styles.page}>
      <Head>
        <title>{featuredAlbum.title} — Featured release by Xusted</title>
        <meta
          name="description"
          content={`Enter the Xusted music archive and listen to the featured release ${featuredAlbum.title}.`}
        />
      </Head>

      <section className={styles.hero} aria-labelledby="featured-title">
        <div className={styles.copy}>
          <p className={styles.eyebrow}>
            <span aria-hidden="true" />
            XUSTED / FEATURED RELEASE
          </p>

          <h1 id="featured-title" className={styles.title}>
            {featuredAlbum.title}
          </h1>

          <p className={styles.lede}>
            Electronic music by Xusted. Start a signal and let it follow you
            through the archive.
          </p>

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.primaryAction}
              onClick={() => void toggleTrack(featuredTrack, featuredQueue)}
              aria-label={
                featuredTrackCanPause
                  ? `Pause ${featuredTrack.title}`
                  : `Play ${featuredTrack.title}`
              }
            >
              {featuredTrackCanPause ? (
                <PauseIcon aria-hidden="true" />
              ) : (
                <PlayIcon aria-hidden="true" />
              )}
              {featuredTrackCanPause
                ? 'PAUSE SIGNAL'
                : `PLAY ${featuredAlbum.title.toUpperCase()}`}
            </button>

            <Link className={styles.secondaryAction} href="/albums">
              EXPLORE RELEASES
              <span aria-hidden="true">↗</span>
            </Link>
          </div>

          <dl className={styles.metadata}>
            <div>
              <dt>TRANSMISSION</dt>
              <dd>{transmissionId}</dd>
            </div>
            <div>
              <dt>TRACKS</dt>
              <dd>{featuredAlbum.songs.length.toString().padStart(2, '0')}</dd>
            </div>
            <div>
              <dt>RUNTIME</dt>
              <dd>{featuredDuration}</dd>
            </div>
          </dl>
        </div>

        <div className={styles.receiver} data-playing={featuredAlbumIsPlaying}>
          <Link
            href={`/albums/${featuredAlbum.id}`}
            className={styles.coverFrame}
            aria-label={`Open ${featuredAlbum.title}`}
          >
            <Image
              src={featuredAlbum.cover}
              alt={`${featuredAlbum.title} album cover`}
              fill
              priority
              sizes="(max-width: 760px) 78vw, (max-width: 1100px) 45vw, 430px"
              className={styles.cover}
            />
            <span className={styles.scanline} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  )
}
