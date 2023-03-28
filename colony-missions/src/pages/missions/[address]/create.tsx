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
  title : string;
  bounty: string;
  description: string;
}

export default function CreateMission({ }: Props) {
  const router = useRouter()
  const { address } = router.query
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
        <h1>Create new mission for Colony {address}</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="title ">Title</label>
          <input id="title" {...register('title')} />
          <label htmlFor="bounty">Bounty</label>
          <input type="number" id="bounty" {...register('bounty')} />
          <label htmlFor="description">Description</label>
          <textarea id="description" {...register('description')} />
          <input type="submit" value="Create mission" />
        </form>
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
