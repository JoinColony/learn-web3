import Head from 'next/head'
import { withIronSessionSsr } from 'iron-session/next'

import { ironOptions } from '@/config'

interface Props {
  user: {
    address: string,
  },
}

export default function Home({ user }: Props) {
  return (
    <>
      <Head>
        <title>Colony Missions</title>
        <meta name="description" content="Exciting missions to take part in on assorted Colonies" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container">
        <h1>Colony Missions</h1>
        {user.address ?
          <p>User with address {user.address} is logged in.</p>
        :
          <p>Not logged in</p>
        }
      </main>
    </>
  )
}

export const getServerSideProps = withIronSessionSsr(async ({ req }) => {
  return {
    props: {
      user: {
        address: req.session.siwe?.address || null,
      }
    }
  }
}, ironOptions)
