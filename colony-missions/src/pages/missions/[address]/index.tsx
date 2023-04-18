import Head from 'next/head'
import { useRouter } from 'next/router'

import { prisma, Mission } from '@/prisma'

import MissionListItem from '@/components/MissionListItem'

interface Props {
  missions: Mission[],
}

export default function ColonyMissions({ missions }: Props) {
  const router = useRouter()
  const { address } = router.query
  return (
    <>
      <Head>
        <title>Missions for Colony {address}</title>
      </Head>
      <main className="container">
        <h1>Missions for Colony {address}</h1>
        <ul>
          {missions.map(mission => (
            <li key={mission.id}>
              <MissionListItem mission={mission} />
            </li>
          ))}
        </ul>
      </main>
    </>
  )
}

export const getServerSideProps = async ({ params }) => {
  const missions = await prisma.mission.findMany({
    where: {
      colony: params.address
    },
    orderBy: [
      { done: 'desc' },
      { worker: 'asc' }
    ]
  });

  return { props: { missions }}
}
