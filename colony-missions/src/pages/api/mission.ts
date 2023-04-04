import { withIronSessionApiRoute } from 'iron-session/next'
import { NextApiRequest, NextApiResponse } from 'next'

import { ironOptions } from '@/config'
import { isUserAdmin } from '@/colony'
import { prisma, Mission } from '@/prisma';

// FIXME: Definitely do not hard code this, otherwise it'll only work with one Colony
const COLONY_DEV_ADDRESS = '0x364B3153A24bb9ECa28B8c7aCeB15E3942eb4fc5'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req
  switch (method) {
    case 'POST':
      try {
        const { address, mission } = req.body as { address: string, mission: Mission }
        if (!req.session.siwe) {
          throw new Error('User is not logged in');
        }
        const userIsAdmin = await isUserAdmin(address, req.session.siwe.address);
        if (!userIsAdmin) {
          throw new Error('User is not admin');
        }
        await prisma.mission.create({
          data: {
            colony: address,
            title: mission.title,
            bounty: mission.bounty,
            description: mission.description,
            done: false,
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
