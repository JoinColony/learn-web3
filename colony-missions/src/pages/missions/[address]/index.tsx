import Head from 'next/head'
import { useRouter } from 'next/router'
import Link from 'next/link'
// import { withIronSessionSsr } from 'iron-session/next'
//
// import { ironOptions } from './config'

interface Props {
  // user: {
  //   address: string,
  //   isAdmin: boolean,
  // },
}

export default function ColonyMissions({ }: Props) {
  const router = useRouter()
  const { address } = router.query
  return (
    <>
      <Head>
        <title>Missions for Colony {address}</title>
      </Head>
      <main className="container">
        <h1>Missions for Colony {address}</h1>
        <ul>
          <li><Link href={`/missions/${address}/logo`}>Create a nice Logo for our Colony</Link></li>
          <li style={{ textDecoration: 'line-through' }}><Link href={`/missions/${address}/54`}>Solve issue #54 in our SDK</Link></li>
        </ul>
      </main>
    </>
  )
}
