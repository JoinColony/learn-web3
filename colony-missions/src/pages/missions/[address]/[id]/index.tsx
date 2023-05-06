import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import { toWei } from '@colony/sdk'

import { Application, Mission, prisma } from '@/prisma'

import { ColonyContext } from '../../../_app'

interface Props {
  applications: Application[],
  mission: Mission,
}

export default function MissionView({ applications, mission }: Props) {
  const router = useRouter()
  const { colonyNetwork } = useContext(ColonyContext)
  const { address, id } = router.query

  const pay = async () => {
    if (!colonyNetwork) {
      return;
    }
    const colony = await colonyNetwork.getColony(address as string)
    if (!colony.ext.oneTx) {
      return alert('OneTxPayment extension not available!')
    }
    if (!mission.worker) {
      return alert('No worker for mission');
    }
    const [, { transactionHash }] = await colony.ext.oneTx.pay(
      mission.worker,
      toWei(mission.bounty)
    ).tx()

    await fetch(`/api/mission/${mission.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        address: mission.colony,
        data: { txHash: transactionHash }
      })
    })
  }

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
        {!mission.paid && mission.txHash &&
          <p><b>Payment for this mission is still pendig</b></p>
        }
        {mission.paid &&
          <p><b>This mission was paid out</b></p>
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
            {colonyNetwork && !mission.txHash && <button onClick={pay}>Pay worker and complete mission</button>}
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
