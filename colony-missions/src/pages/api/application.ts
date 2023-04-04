import { withIronSessionApiRoute } from 'iron-session/next'
import { NextApiRequest, NextApiResponse } from 'next'

import { ironOptions } from '@/config'
import { prisma } from '@/prisma';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req
  switch (method) {
    case 'POST':
      try {
        const { missionId, whyme } = req.body as { whyme: string, missionId: number }
        if (!req.session.siwe?.address) {
          throw new Error('User is not logged in');
        }
        const user = await prisma.user.findUnique({
          where: {
            address: req.session.siwe.address
          }
        })
        if (!user) {
          throw new Error('User not found')
        }
        await prisma.application.create({
          data: {
            userId: user.id,
            missionId,
            whyme,
          }
        })
        res.json({ ok: true })
      } catch (error) {
        res.json({ ok: false, error: error.message })
      }
      break
    default:
      res.setHeader('Allow', ['POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

export default withIronSessionApiRoute(handler, ironOptions)
