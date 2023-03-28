import Head from 'next/head'
import { useRouter } from 'next/router'
import { withIronSessionSsr } from 'iron-session/next'
import { useForm, SubmitHandler } from 'react-hook-form'

import { ironOptions } from '@/config'

// import styles from '@/styles/Home.module.css'

interface Props {
  // user: {
  //   address: string,
  //   isAdmin: boolean,
  // },
}

interface Inputs {
  why : string;
}

export default function MissionApply({ }: Props) {
  const router = useRouter()
  const { address, id } = router.query
  const { register, handleSubmit, reset } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = data => {
    console.log(data);
    reset();
  }

  return (
    <>
      <Head>
        <title>Create new mission for Colony {address}</title>
      </Head>
      <main className="container">
        <h1>Apply for mission {id} on Colony {address}</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="title ">Why me?</label>
          <textarea id="description" {...register('why')} />
          <input type="submit" value="Apply!" />
        </form>
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
