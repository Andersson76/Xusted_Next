import Link from 'next/link'
import styled from '@emotion/styled'

const Nav = styled.nav`
  padding: 1rem;
  background-color: #333;
  color: white;
  ul {
    display: flex;
    gap: 1rem;
  }
`

const Navbar = () => {
  return (
    <Nav>
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
    </Nav>
  )
}

export default Navbar
