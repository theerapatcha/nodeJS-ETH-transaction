import web3 from '../web3/web3.js'

async function createAccount(password) {
    web3.eth.personal.newAccount(password).then(console.log);
}

export default createAccount;