const axios = require('axios');
const BN = require('bn.js');

axios.post('https://xdai.colony.io/rpc/', {
    jsonrpc: '2.0',
    method: 'eth_call',
    params: [{
        // CLNY on Gnosis chain
        to: '0xc9B6218AffE8Aba68a13899Cbf7cF7f14DDd304C', 
        // Method ID (first 4 bytes of keccak256 hash of the method signature)
        // plus 32 byte padded first argument
        data: '0x70a08231000000000000000000000000dbfb0e80143dd737e04925ffd7af8c355c0d25f9',
    }, 'latest'],
}).then(response => {
    const eth = new BN(10).pow(new BN(18));
    const balance = new BN(response.data.result.substr(2), 16);
    console.log(balance.div(eth).toString(10));
});
