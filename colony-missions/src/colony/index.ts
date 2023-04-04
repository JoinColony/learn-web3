import { BigNumber, providers } from 'ethers'
import { ColonyNetwork, ColonyRpcEndpoint, Id } from '@colony/sdk'

const provider = new providers.JsonRpcProvider(ColonyRpcEndpoint.Gnosis)

let client: ColonyNetwork

export const getClient = async () => {
  if (client) {
    return client
  }
  return await ColonyNetwork.init(provider)
}

export const isUserAdmin = async (colonyAddress: string, userAddress: string) => {
  const client = await getClient()
  const colony = await client.getColony(colonyAddress)
  const colonyClient = colony.getInternalColonyClient()
  const roles = await colonyClient.getUserRoles(userAddress, Id.RootDomain)
  const rolesBn = BigNumber.from(roles)
  return rolesBn.eq(0x6f)
}
