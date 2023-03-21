import { providers } from 'ethers'
import { ColonyNetwork, ColonyRpcEndpoint } from '@colony/sdk'

const provider = new providers.JsonRpcProvider(ColonyRpcEndpoint.Gnosis)

let client: ColonyNetwork

export const getClient = async () => {
  if (client) {
    return client
  }
  return await ColonyNetwork.init(provider)
}
