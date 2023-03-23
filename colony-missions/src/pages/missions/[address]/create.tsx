import Head from 'next/head'
import { useRouter } from 'next/router'
import { withIronSessionSsr } from 'iron-session/next'

import { ironOptions } from '../../config'

// import styles from '@/styles/Home.module.css'

interface Props {
  // user: {
  //   address: string,
  //   isAdmin: boolean,
  // },
}

export default function CreateMission({ }: Props) {
  const router = useRouter()
  const { address } = router.query
  return (
    <>
      <Head>
        <title>Create new mission for Colony {address}</title>
      </Head>
      <main>
        Create new mission for Colony {address}
      </main>
    </>
  )
}

export const getServerSideProps = withIronSessionSsr(async ({ req }) => {
  if (!req.session.user?.isAdmin) {
    return {
      notFound: true,
    }
  }

  return {
    props: {}
  }
}, ironOptions)
