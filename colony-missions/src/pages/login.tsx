import { SiweMessage } from 'siwe'
import { useAccount, useConnect, useDisconnect, useNetwork, useSignMessage } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'

interface Props {
  nonce: string
}

function Login({ nonce }: Props) {
  const { address, isConnected } = useAccount()
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })
  const { disconnect } = useDisconnect()
  const { chain } = useNetwork();
  const { signMessageAsync } = useSignMessage();

  const login = async () => {
    if (!isConnected || !chain) {
      throw new Error('Not connected to Wallet')
    }

    const nonceResponse = await fetch('/api/nonce')
    const nonce = await nonceResponse.text()

    const message = new SiweMessage({
      domain: window.location.host,
      address,
      statement: 'Sign in with Ethereum',
      uri: window.location.origin,
      version: '1',
      chainId: chain.id,
      nonce,
    })

    const signature = await signMessageAsync({
      message: message.prepareMessage(),
    })

    const response = await fetch('/api/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message, signature}),
    })

    console.log(response)
  }

  if (isConnected) {
    return (
        <div>
          Connected to {address}
          <button onClick={() => login()}>Login</button>
          <button onClick={() => disconnect()}>Disconnect</button>
        </div>
    );
  }
  return <button onClick={() => connect()}>Connect</button>
}

export default Login
