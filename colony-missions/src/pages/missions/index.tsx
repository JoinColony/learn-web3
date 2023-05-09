import Head from 'next/head'

import { prisma, MissionWithColony, Colony } from '@/prisma'
import MissionListItem from '@/components/MissionListItem'
import Link from 'next/link'


interface Props {
  colonies: Colony[],
  missions: MissionWithColony[],
}

export default function Missions({ colonies, missions }: Props) {
  return (
    <>
      <Head>
        <title>All Colony missions</title>
      </Head>
      <main className="container">
        <h1>Missions within all Colonies</h1>
        <ul>
          {missions.map(mission => (
            <li key={mission.id}>
              <MissionListItem mission={mission} />
            </li>
          ))}
        </ul>
        <h1>Colonies with open missions</h1>
        <ul>
          {colonies.map(colony => (
            <li key={colony.id}>
              <Link href={`/missions/${colony.address}`}>{colony.address}</Link>
            </li>
          ))}
        </ul>
      </main>
    </>
  )
}

export const getServerSideProps = async () => {
  const missions = await prisma.mission.findMany({
    include: {
      colony: true,
    }
  })
  const colonies = await prisma.colony.findMany({
    where: {
      missions: {
        some: {
          paid: false,
        }
      }
    }
  })

  return { props: { missions, colonies }}
}
