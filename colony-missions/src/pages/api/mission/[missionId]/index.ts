import { withIronSessionApiRoute } from 'iron-session/next'
import { NextApiRequest, NextApiResponse } from 'next'

import { ironOptions } from '@/config'
import { prisma } from '@/prisma';
import { isUserAdmin } from '@/colony';

interface EditData {
  worker?: string;
  txHash?: string;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req
  switch (method) {
    case 'PUT':
      try {
        const { address, data } = req.body as { address: string, data: EditData }
        const { missionId } = req.query
        if (!req.session.siwe) {
          throw new Error('User is not logged in');
        }
        const userIsAdmin = await isUserAdmin(address, req.session.siwe.address);
        if (!userIsAdmin) {
          throw new Error('User is not admin');
        }
        const mission = await prisma.mission.findUnique({ where: { id: parseInt(missionId as string, 10) }})
        if (!mission || mission.colony !== address) {
          throw new Error('Mission does not belong to Colony')
        }

        if (data.worker) {
          await prisma.mission.update({
            where: {
              id: mission.id
            },
            data: {
              worker: data.worker,
            }
          })
        } else if (data.txHash) {
          await prisma.mission.update({
            where: {
              id: mission.id
            },
            data: {
              txHash: data.txHash,
            }
          })
        }
        res.json({ ok: true })
      } catch (error) {
        res.json({ ok: false, error: (error as Error).message })
      }
      break
    default:
      res.setHeader('Allow', ['PUT'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

export default withIronSessionApiRoute(handler, ironOptions)
