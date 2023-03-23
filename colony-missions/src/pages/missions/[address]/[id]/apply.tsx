import Head from 'next/head'
import { useRouter } from 'next/router'
import { withIronSessionSsr } from 'iron-session/next'

import { ironOptions } from '../../../config'

// import styles from '@/styles/Home.module.css'

interface Props {
  // user: {
  //   address: string,
  //   isAdmin: boolean,
  // },
}

export default function MissionApply({ }: Props) {
  const router = useRouter()
  const { address, id } = router.query
  return (
    <>
      <Head>
        <title>Apply for mission {id} in Colony {address}</title>
      </Head>
      <main>
        Apply for mission {id} in Colony {address}
      </main>
    </>
  )
}

export const getServerSideProps = withIronSessionSsr(async ({ req }) => {
  if (!req.session.user) {
    return {
      notFound: true,
    }
  }

  return {
    props: {}
  }
}, ironOptions)
