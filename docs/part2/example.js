const { Contract, JsonRpcProvider, Wallet } = require('ethers');

const { abi } = require('./FishPlethora.json');

const provider = new JsonRpcProvider('https://xdai.colony.io/rpc/');
const wallet = new Wallet(process.env.PRIVATE_KEY);

const start = async () => {
    const signer = wallet.connect(provider);
    const fishNFT = new Contract('0xDd698885Bc9DB36F645aFb19220677913Acf5746', abi, signer);

    const name = await fishNFT.name();
    console.log(name);
    const response = await fishNFT.mint('0x0AEFF664e8d75c13801be16bCfE8143Bf422135A', 1, 'QmaTadkBXtVKy151JZVaJnUv7hz3JyGEhxPguZr4oqFvcp');
    const receipt = await response.wait();
    console.log(receipt);
}

start();
