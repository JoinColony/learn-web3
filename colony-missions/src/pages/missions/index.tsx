import Head from 'next/head'
import Link from 'next/link'
// import { withIronSessionSsr } from 'iron-session/next'
//
// import { ironOptions } from './config'

// import styles from '@/styles/Home.module.css'

interface Props {
  // user: {
  //   address: string,
  //   isAdmin: boolean,
  // },
}

export default function Missions({ }: Props) {
  return (
    <>
      <Head>
        <title>All Colony missions</title>
      </Head>
      <main className="container">
        <h1>Missions within all Colonies</h1>
        <ul>
          <li><Link href={`/missions/0xdead/logo`}>Create a nice Logo for our Colony (0xdead)</Link></li>
          <li style={{ textDecoration: 'line-through' }}><Link href={`/missions/0xdead/54`}>Solve issue #54 in our SDK (0xdead)</Link></li>
        </ul>
      </main>
    </>
  )
}
