import Link from 'next/link'

import styles from '@/styles/Nav.module.css'

interface Props {
  address?: string
}

const Nav = ({ address }: Props) => {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>[COLONY LOGO]</li>
      </ul>
      <ul>
        <li><Link href="/"><strong>Colony Missions</strong></Link></li>
      </ul>
      <ul>
        {address ? <li>{address}</li> : <li><Link href="/login">Login</Link></li>}
      </ul>
    </nav>
  )
}

export default Nav
