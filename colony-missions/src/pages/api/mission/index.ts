import { withIronSessionApiRoute } from 'iron-session/next'
import { NextApiRequest, NextApiResponse } from 'next'

import { ironOptions } from '@/config'
import { isUserAdmin } from '@/colony'
import { Colony, prisma, Mission } from '@/prisma';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req
  switch (method) {
    case 'POST':
      try {
        const { address, mission } = req.body as { address: string, mission: Mission }
        if (!req.session.siwe) {
          throw new Error('User is not logged in')
        }
        const userIsAdmin = await isUserAdmin(address, req.session.siwe.address)
        if (!userIsAdmin) {
          throw new Error('User is not admin')
        }

        let colony: Colony | null
        colony = await prisma.colony.findUnique({
          where: {
            address,
          }
        });

        if (!colony) {
          colony = await prisma.colony.create({
            data: {
              address,
            }
          })
        }

        await prisma.mission.create({
          data: {
            colonyId: colony.id,
            title: mission.title,
            bounty: mission.bounty,
            description: mission.description,
          }
        })
        res.json({ ok: true })
      } catch (_error) {
        res.json({ ok: false })
      }
      break
    default:
      res.setHeader('Allow', ['POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

export default withIronSessionApiRoute(handler, ironOptions)
