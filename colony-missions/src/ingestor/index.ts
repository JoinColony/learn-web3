import { ColonyEventManager } from '@colony/sdk'
import { OneTxPaymentEvents__factory as OneTxPaymentEvents } from '@colony/events'

import { provider } from '../colony'
import { prisma } from '../prisma'

const eventManager = new ColonyEventManager(provider)
const oneTxEventSource = eventManager.createEventSource(OneTxPaymentEvents)

setInterval(async () => {
  const mission = await prisma.mission.findFirst({
    where: {
      NOT: [{txHash: null }],
      paid: false,
    }
  })
  if (!mission || !mission.txHash) {
    return
  }
  console.log(`Found a pending transaction: ${mission.txHash}! Handling it...`)
  const receipt = await provider.getTransactionReceipt(mission.txHash)
  let foundEvent = null;
  receipt.logs.forEach((log) => {
    try {
      const event = oneTxEventSource.interface.parseLog(log)
      if (event.name === 'OneTxPaymentMade') {
        foundEvent = event
      }
    } catch (e) {
      // nothing
    }
  })
  if (foundEvent) {
    await prisma.mission.update({
      where: {
        id: mission.id
      },
      data: {
        paid: true
      }
    })
  }
}, 5000)
