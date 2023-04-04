import Head from 'next/head'
import { useRouter } from 'next/router'
import Link from 'next/link'

import { prisma, Mission } from '@/prisma'

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
              <Link href={`/missions/${address}/${mission.id}`}>{mission.title}</Link>
            </li>
          ))}
          <li style={{ textDecoration: 'line-through' }}><Link href={`/missions/${address}/54`}>Solve issue #54 in our SDK</Link></li>
        </ul>
      </main>
    </>
  )
}

export const getServerSideProps = async ({ params }) => {
  const missions = await prisma.mission.findMany({
    where: {
      colony: params.address
    }
  });

  return { props: { missions }}
}
