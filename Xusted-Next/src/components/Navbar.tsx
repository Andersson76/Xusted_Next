import React from 'react'
import Link from 'next/link'

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/albums">Albums</Link>
        </li>
        <li>
          <Link href="/contact">Contact</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
