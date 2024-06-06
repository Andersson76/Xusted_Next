import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Icon } from '@iconify/react'
import tidalIcon from '@iconify/icons-simple-icons/tidal'
import { library } from '@fortawesome/fontawesome-svg-core'

library.add(faYoutube, faSpotify, faItunes)

import {
  faItunes,
  faSpotify,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons'

const navigation = [
  {
    name: 'Youtube',
    href: 'https://www.youtube.com/channel/UCUJrqOFKzMfDCGenCvLLwdQ',
    icon: () => (
      <FontAwesomeIcon
        icon={faYoutube}
        beat
        size="2x"
        style={{
          paddingLeft: '12px',
          paddingRight: '12px',
          marginBottom: '25px',
        }}
      />
    ),
  },
  {
    name: 'Spotify',
    href: 'https://open.spotify.com/artist/11lVHxCjt7gVjwwPvPC8mG',
    icon: () => (
      <FontAwesomeIcon
        icon={faSpotify}
        bounce
        size="2x"
        style={{
          paddingLeft: '12px',
          paddingRight: '12px',
          marginBottom: '25px',
        }}
      />
    ),
  },
  {
    name: 'Itunes',
    href: 'https://music.apple.com/se/artist/xusted/1491482184',
    icon: () => (
      <FontAwesomeIcon
        icon={faItunes}
        shake
        size="2x"
        style={{
          paddingLeft: '12px',
          paddingRight: '12px',
          marginBottom: '15px',
        }}
      />
    ),
  },
  {
    name: 'Tidal',
    href: 'https://listen.tidal.com/artist/17716554',
    icon: () => (
      <Icon
        icon={tidalIcon}
        width="40"
        style={{
          marginLeft: '10px',
          marginRight: '20px',
        }}
      />
    ),
  },
]

export default function Footer() {
  return (
    <footer>
      <div
        className={`
      mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8 `}
      >
        <div className="flex justify-center space-x-6 md:order-2">
          {navigation.map((item) => (
            <a key={item.name} href={item.href} className="hover:text-gray-500">
              <span className="sr-only">{item.name}</span>
              <item.icon />
            </a>
          ))}
        </div>
        <div className="mt-8 md:order-1 md:mt-0">
          <p className="text-center text-xs leading-5 text-gray-500">
            &copy; 2024 XUSTED All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
