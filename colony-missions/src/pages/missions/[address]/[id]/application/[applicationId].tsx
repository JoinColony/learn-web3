import Head from 'next/head'
import { withIronSessionSsr } from 'iron-session/next'

import { Application, MissionWithColony, User, prisma } from '@/prisma'
import { isUserAdmin } from '@/colony'
import { ironOptions } from '@/config'

interface Props {
  application: Application,
  isAdmin: boolean,
  mission: MissionWithColony,
  user: User,
}

export default function ApplicationView({ application, isAdmin, mission, user }: Props) {

  const acceptApplication = async () => {
    await fetch(`/api/mission/${mission.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ address: mission.colony.address, data: { worker: user.address } })
    })
  }

  return (
    <>
      <Head>
        <title>Application {application.id} for mission {mission.title}</title>
      </Head>
      <main className="container">
        <h1>Application {application.id} for mission {mission.title}</h1>
        <h3>User</h3>
        <p>{user.address}</p>
        <h3>Why me?</h3>
        <p>
          {application.whyme}
        </p>
        {isAdmin && <button onClick={acceptApplication}>Accept</button>}
      </main>
    </>
  )
}

export const getServerSideProps = withIronSessionSsr(async ({ params, req }) => {
  const application = await prisma.application.findUnique({
    where: {
      id: parseInt(params.applicationId, 10),
    }
  })
  const mission = await prisma.mission.findUnique({
    include: {
      colony: true,
    },
    where: {
      id: parseInt(params.id, 10),
    }
  })
  const user = await prisma.user.findUnique({
    where: {
      id: application?.userId
    }
  })

  const isAdmin = req.session.siwe &&
                  req.session.siwe.address &&
                  params && params.address &&
                  await isUserAdmin(params.address as string, req.session.siwe?.address)


  return { props: { application, isAdmin, mission, user }}
}, ironOptions);
