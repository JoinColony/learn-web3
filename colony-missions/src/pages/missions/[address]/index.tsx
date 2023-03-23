import Head from 'next/head'
import { useRouter } from 'next/router'
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

export default function ColonyMissions({ }: Props) {
  const router = useRouter()
  const { address } = router.query
  return (
    <>
      <Head>
        <title>Missions for Colony {address}</title>
      </Head>
      <main>
        Missions for Colony {address}
      </main>
    </>
  )
}
