import { providers } from 'ethers'
import { ColonyNetwork, ColonyRpcEndpoint, ColonyRole } from '@colony/sdk'

export const provider = new providers.JsonRpcProvider(ColonyRpcEndpoint.Gnosis)

export const colonyNetwork = new ColonyNetwork(provider)

export const isUserAdmin = async (colonyAddress: string, userAddress: string) => {
  const colony = await colonyNetwork.getColony(colonyAddress)
  const roles = await colony.getRoles(userAddress)
  return roles.includes(ColonyRole.Administration)
}
