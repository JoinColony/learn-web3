import { withIronSessionApiRoute } from 'iron-session/next'
import { NextApiRequest, NextApiResponse } from 'next'
import { SiweMessage } from 'siwe'
import { Id } from '@colony/sdk'
import { BigNumber } from 'ethers'

import { ironOptions } from '@/config'
import { getClient } from '@/colony'
import { prisma } from '@/prisma'

// FIXME: Definitely do not hard code this, otherwise it'll only work with one Colony
const COLONY_DEV_ADDRESS = '0x364B3153A24bb9ECa28B8c7aCeB15E3942eb4fc5'

const isUserAdmmin = async (colonyAddress: string, userAddress: string) => {
  const client = await getClient()
  const colony = await client.getColony(colonyAddress)
  const colonyClient = colony.getInternalColonyClient()
  const roles = await colonyClient.getUserRoles(userAddress, Id.RootDomain)
  const rolesBn = BigNumber.from(roles)
  return rolesBn.eq(0x6f)
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req
  switch (method) {
    case 'POST':
      try {
        const { message, signature } = req.body
        const siweMessage = new SiweMessage(message)
        const fields = await siweMessage.validate(signature)

        if (fields.nonce !== req.session.nonce) {
          return res.status(422).json({ message: 'Invalid nonce.' })
        }

        const isAdmin = await isUserAdmmin(COLONY_DEV_ADDRESS, fields.address)
        req.session.user = {
          isAdmin,
        }

        req.session.siwe = fields
        await req.session.save()

        const user = await prisma.user.findUnique({
          where: {
            address: fields.address,
          }
        })

        if (!user) {
          await prisma.user.create({
            data: {
              address: fields.address,
            }
          })
        }

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
