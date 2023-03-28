import { SiweMessage } from 'siwe'
import { useAccount, useNetwork, useSignMessage } from 'wagmi'

function Login() {
  const { address, isConnected } = useAccount()
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
      body: JSON.stringify({ message, signature }),
    })

    console.log(response)
  }

  if (!isConnected) {
    return <button disabled>Can&apos;t login. Connect MetaMask first</button>
  }

  return <button onClick={() => login()}>Login</button>
}

export default Login
