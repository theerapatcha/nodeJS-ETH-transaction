import web3 from '../web3/web3.js';

export default async function getBalance(account) {
    await web3.eth.getBalance(account).then(console.log);
}