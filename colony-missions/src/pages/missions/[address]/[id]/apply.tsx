import Head from 'next/head'
import { withIronSessionSsr } from 'iron-session/next'
import { useForm, SubmitHandler } from 'react-hook-form'

import { ironOptions } from '@/config'
import { Mission, prisma } from '@/prisma'

// import styles from '@/styles/Home.module.css'

interface Props {
  mission: Mission,
}

interface Inputs {
  whyme : string;
}

export default function MissionApply({ mission }: Props) {
  const { register, handleSubmit, reset } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async data => {
    try {
      await fetch('/api/application', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ missionId: mission.id, whyme: data.whyme }),
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
        <title>Apply for mission {mission.title}</title>
      </Head>
      <main className="container">
        <h1>Apply for mission: {mission.title}</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="title ">Why me?</label>
          <textarea id="whyme" {...register('whyme')} />
          <input type="submit" value="Apply!" />
        </form>
      </main>
    </>
  )
}

export const getServerSideProps = withIronSessionSsr(async ({ params, req }) => {
  if (!req.session.user || typeof params?.id != 'string') {
    return {
      notFound: true,
    }
  }
  const mission = await prisma.mission.findUnique({
    where: {
      id: parseInt(params.id, 10),
    }
  })
  return {
    props: { mission }
  }
}, ironOptions)
