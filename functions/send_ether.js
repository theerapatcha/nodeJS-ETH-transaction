import web3 from '../web3/web3.js'
import txBuilder from './tx_builder';

export async function sendEther(sender_account, receiver_account, amount_eth) {
    //make the value dynamic if you like
    const value = web3.utils.toWei(amount_eth, 'ether')
    const tx = {
        from: sender_account,
        to: receiver_account,
        value: value
    };
    try {
        await web3.eth.sendTransaction(tx)
            .on('receipt', console.log) // eslint-disable-line no-console
    } catch (error) {
        console.log(error) // eslint-disable-line no-console
    }

}

export async function sendEtherUsingPassword(sender_account, receiver_account, amount_eth, password) {
    //make the value dynamic if you like
    const value = web3.utils.toWei(amount_eth, 'ether')
    const tx = {
        from: sender_account,
        to: receiver_account,
        value: value
    };
    try {
        await web3.eth.personal.unlockAccount(sender_account, password, 600);
        await web3.eth.sendTransaction(tx, (error, res) => {
                web3.eth.personal.lockAccount(sender_account);
            })
            .on('receipt', console.log) // eslint-disable-line no-console
    } catch (error) {
        console.log(error) // eslint-disable-line no-console
    }

}

export async function sendEtherUsingPrivateKey(sender_account, receiver_account, amount_eth, private_key) {
    //make the value dynamic if you like
    const value = web3.utils.toWei(amount_eth, 'ether')

    //get the gas limit by using estimageGas function (wei)
    const gasLimit = await web3.eth.estimateGas({
        from: sender_account,
        to: receiver_account,
        amount: value
    })
    //get the current gas price (wei)
    const gasPrice = await web3.eth.getGasPrice()
    //get the nonce for the sending account
    const nonce = await web3.eth.getTransactionCount(sender_account)
    //Specifiy private key
    //optional logs for sanity checks
    console.log('Building Transaction') // eslint-disable-line no-console
    //build transaction object -- see tx_builder.js for input parameters
    let txData = {
        method: 'sendEther',
        toAddress: receiver_account,
        nonce: nonce,
        value: value,
        gasLimit: gasLimit,
        gasPrice: gasPrice,
        privateKey: private_key
    }

    try {
        //pass transaction object to txBuilder to construct and sign using private key
        let rawTx = txBuilder(txData)
        //optional logs for sanity checks
        console.log('Sending Signed Transaction') // eslint-disable-line no-console
        //send tx that was signed offline by txbuilder
        web3.eth.signTransaction()
        await web3.eth.sendSignedTransaction('0x' + rawTx.toString('hex'))
            .on('receipt', console.log) // eslint-disable-line no-console
    } catch (error) {
        console.log(error) // eslint-disable-line no-console
    }

}