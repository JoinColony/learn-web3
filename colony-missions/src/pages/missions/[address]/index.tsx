import Head from 'next/head'
import { useRouter } from 'next/router'
import { withIronSessionSsr } from 'iron-session/next'
import { utils } from 'ethers'

import { prisma, MissionWithColony } from '@/prisma'

import MissionListItem from '@/components/MissionListItem'
import { ironOptions } from '@/config'
import { isUserAdmin } from '@/colony'
import Link from 'next/link'

const { isAddress } = utils

interface Props {
  isAdmin: boolean,
  missions: MissionWithColony[],
}

export default function ColonyMissions({ missions, isAdmin }: Props) {
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
        {isAdmin && <Link href={`/missions/${address}/create`} role="button">Create mission</Link>}
      </main>
    </>
  )
}

export const getServerSideProps = withIronSessionSsr(async ({ params, req }) => {
  if (!isAddress(params?.address as string)) {
    return { notFound: true }
  }

  const isAdmin = req.session.siwe &&
                  req.session.siwe.address &&
                  params && params.address &&
                  await isUserAdmin(params.address as string, req.session.siwe?.address)
  const colony = await prisma.colony.findUnique({
    where: {
      address: params?.address as string,
    }
  })

  const missions = await prisma.mission.findMany({
    include: {
      colony: true,
    },
    where: {
      colonyId: colony?.id,
    },
    orderBy: [
      { paid: 'desc' },
      { worker: 'asc' }
    ]
  })

  return { props: { colony, missions, isAdmin }}
}, ironOptions)

