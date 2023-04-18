import { providers } from 'ethers'
import { ColonyNetwork, ColonyRpcEndpoint, ColonyRole } from '@colony/sdk'

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
  const roles = await colony.getRoles(userAddress)
  return roles.includes(ColonyRole.Administration)
}
