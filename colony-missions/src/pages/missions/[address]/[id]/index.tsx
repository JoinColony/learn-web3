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

export default function MissionView({ }: Props) {
  const router = useRouter()
  const { address, id } = router.query
  return (
    <>
      <Head>
        <title>View mission {id} for Colony {address}</title>
      </Head>
      <main>
        View mission {id} for Colony {address}
      </main>
    </>
  )
}
