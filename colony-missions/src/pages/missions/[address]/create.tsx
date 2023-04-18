import Head from 'next/head'
import { useRouter } from 'next/router'
import { withIronSessionSsr } from 'iron-session/next'
import { useForm, SubmitHandler } from 'react-hook-form'

import { ironOptions } from '@/config'
import { isUserAdmin } from '@/colony'

interface Props {
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
  const onSubmit: SubmitHandler<Inputs> = async data => {
    if (!address || Array.isArray(address)) {
      alert('I do not have a Colony address');
      throw new Error('Colony address missing');
    }

    try {
      await fetch('/api/mission', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ address, mission: data }),
      })
    } catch (_err) {
      console.error(_err);
      alert('There was an error!');
    }
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

export const getServerSideProps = withIronSessionSsr(async ({ params, req }) => {
  const isAdmin = req.session.siwe &&
                  req.session.siwe.address &&
                  params && params.address &&
                  await isUserAdmin(params.address as string, req.session.siwe?.address)
  if (!isAdmin) {
    return {
      notFound: true,
    }
  }

  return {
    props: {}
  }
}, ironOptions)
