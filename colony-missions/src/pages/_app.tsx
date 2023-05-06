import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { createContext } from 'react'
import { WagmiConfig, createClient } from 'wagmi'
import { watchSigner } from '@wagmi/core'
import { getDefaultProvider } from 'ethers'
import { ColonyNetwork } from '@colony/sdk';

const client = createClient({
  // FIXME: how to do autoConnect?
  autoConnect: false,
  provider: getDefaultProvider(),
})

const colonyContextObj: { colonyNetwork: ColonyNetwork | null } = {
  colonyNetwork: null
}

export const ColonyContext = createContext(colonyContextObj)

watchSigner({}, async (signer) => {
  if (!signer) {
    return;
  }
  colonyContextObj.colonyNetwork = new ColonyNetwork(signer)
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={client}>
      <ColonyContext.Provider value={colonyContextObj}>
        <Component {...pageProps} />
      </ColonyContext.Provider>
    </WagmiConfig>
  )

}
