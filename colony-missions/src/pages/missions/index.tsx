import Head from 'next/head'
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
        <title>Missions for all Colonies</title>
      </Head>
      <main>
        Missions for all Colonies
      </main>
    </>
  )
}
