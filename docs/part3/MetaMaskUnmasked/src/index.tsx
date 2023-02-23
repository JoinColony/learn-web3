import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserProvider, Contract, TransactionReceipt } from 'ethers';

import { abi } from './FishPlethora.json';

let provider: BrowserProvider | null;

const connectAccounts = async () => {
  const eip1193Provider = (window as any).ethereum;
  provider = new BrowserProvider(eip1193Provider);

  return provider.send('eth_requestAccounts', []);
}

const addGnosisChain = async () => {
  if (!provider) {
    throw new Error('Please connect MetaMask first');
  }
  return provider.send('wallet_addEthereumChain',
    [
      {
        chainId: '0x64',
        chainName: 'Gnosis Chain via Colony',
        nativeCurrency: {
          name: 'xDAI',
          symbol: 'XDAI',
          decimals: 18,
        },
        rpcUrls: ['https://xdai.colony.io/rpc/'],
        blockExplorerUrls: ['https://blockscout.com/xdai/mainnet'],
      },
    ],
  );
}

const mintNFT = async () => {
  if (!provider) {
    throw new Error('Please connect MetaMask first');
  }
  const signer = await provider.getSigner();;
  const fishNFT = new Contract('0xDd698885Bc9DB36F645aFb19220677913Acf5746', abi, signer);

  const response = await fishNFT.mint('0x0AEFF664e8d75c13801be16bCfE8143Bf422135A', 2, 'QmaTadkBXtVKy151JZVaJnUv7hz3JyGEhxPguZr4oqFvcp');
  return response.wait();
}

interface ConnectMMButtonProps {
  onConnected: (accounts: string[]) => void;
}

const ConnectMMButton = ({ onConnected }: ConnectMMButtonProps) => {
  const connect = async () => {
    const accounts = await connectAccounts();
    onConnected(accounts);
  }

  return <button onClick={connect}>Connect to MetaMask</button>;
}

const AddGnosisChainButton = () => {
  return <button onClick={addGnosisChain}>Add Gnosis Chain to MetaMask</button>;
}

interface MintNFTButtonProps {
  onMinted: (receipt: TransactionReceipt) => void;
}

const MintNFTButton = ({ onMinted }: MintNFTButtonProps) => {
  const mint = async () => {
    const receipt = await mintNFT();
    onMinted(receipt);
  }

  return <button onClick={mint}>Mint an NFT</button>;
}

const App = () => {
  const [addresses, setAddresses] = useState<string[]>([]);
  const [receipt, setReceipt] = useState<TransactionReceipt>();

  const handleConnection = (accounts: string[]) => {
    setAddresses(accounts);
  }
  const handleMinted = (receipt: TransactionReceipt) => {
    setReceipt(receipt);
  }

  return (<div>
    {addresses && addresses.length ? <div>
      <p>Successfully connected</p>
      <ul>
        {addresses.map(addr => <li>{addr}</li>)}
      </ul>
      <AddGnosisChainButton />
      <MintNFTButton onMinted={handleMinted} />
      </div>
    :
    <div>
      <p>Click the button to connect to MetaMask</p>
      <ConnectMMButton onConnected={handleConnection} />
    </div>
    }
    {receipt && <p>{JSON.stringify(receipt)}</p>}
  </div>);
}

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<App />);
}
