import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { Application, Mission, User, prisma } from '@/prisma'

interface Props {
  application: Application,
  mission: Mission,
  user: User,
}

export default function ApplicationView({ application, mission, user }: Props) {
  const router = useRouter()
  const { address, id } = router.query
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
      </main>
    </>
  )
}

export const getServerSideProps = async ({ params }) => {
  const application = await prisma.application.findUnique({
    where: {
      id: parseInt(params.applicationId, 10),
    }
  })
  const mission = await prisma.mission.findUnique({
    where: {
      id: parseInt(params.id, 10),
    }
  })
  const user = await prisma.user.findUnique({
    where: {
      id: application?.userId
    }
  })

  return { props: { application, mission, user }}
}
