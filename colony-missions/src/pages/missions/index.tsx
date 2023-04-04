import Head from 'next/head'
import Link from 'next/link'

import { prisma, Mission } from '@/prisma'

// import styles from '@/styles/Home.module.css'

interface Props {
  missions: Mission[],
}

export default function Missions({ missions }: Props) {
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
              <Link href={`/missions/${mission.colony}/${mission.id}`}>{mission.title}</Link>
            </li>
          ))}
        </ul>
      </main>
    </>
  )
}

export const getServerSideProps = async () => {
  const missions = await prisma.mission.findMany();

  return { props: { missions }}
}
