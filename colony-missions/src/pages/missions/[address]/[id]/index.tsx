import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { Application, Mission, prisma } from '@/prisma'

interface Props {
  applications: Application[],
  mission: Mission,
}

export default function MissionView({ applications, mission }: Props) {
  const router = useRouter()
  const { address, id } = router.query
  return (
    <>
      <Head>
        <title>Colony mission: {mission.title}</title>
      </Head>
      <main className="container">
        <h1>{mission.title}</h1>
        {!mission.worker &&
          <p>
            <Link href={`/missions/${address}/${id}/apply`}>Apply</Link>
          </p>
        }
        <h3>Bounty</h3>
        <p>{mission.bounty} DEAD</p>
        <h3>Description</h3>
        <p>
          {mission.description}
        </p>
        {mission.worker ?
          <div>
            <h3>Worker</h3>
            <p>{mission.worker}</p>
          </div> :
          <div>
            <h3>Applicants</h3>
            <ul>
              {applications.map(application => (
                <li key={application.id}>
                  <Link href={`/missions/${address}/${mission.id}/application/${application.id}`}>{application.userId}</Link>
                </li>
              ))}
            </ul>
          </div>
        }
      </main>
    </>
  )
}

export const getServerSideProps = async ({ params }) => {
  const mission = await prisma.mission.findUnique({
    where: {
      id: parseInt(params.id, 10),
    }
  })
  const applications = await prisma.application.findMany({
    where: {
      missionId: parseInt(params.id, 10),
    }
  })

  return { props: { mission, applications }}
}
