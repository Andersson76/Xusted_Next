import type { PlayerTrack } from '../contexts/PlayerContext'

export interface AlbumSongSource {
  title: string
  duration: string
  file: string
}

export interface AlbumSource {
  id: string
  title: string
  cover: string
  songs: AlbumSongSource[]
}

export function createPlayerQueue(album: AlbumSource): PlayerTrack[] {
  return album.songs.map((song, index) => ({
    id: `album-${album.id}-track-${index}`,
    albumId: album.id,
    albumTitle: album.title,
    title: song.title,
    file: song.file,
    cover: album.cover,
    durationLabel: song.duration,
  }))
}

export function getAlbumDuration(songs: AlbumSongSource[]) {
  const totalSeconds = songs.reduce((total, song) => {
    const [minutes, seconds] = song.duration.split(':').map(Number)

    if (!Number.isFinite(minutes) || !Number.isFinite(seconds)) return total
    return total + minutes * 60 + seconds
  }, 0)

  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

export function isPlayableAudioSource(file: string) {
  return /\.(aac|m4a|mp3|ogg|wav)(?:\?.*)?$/i.test(file)
}
