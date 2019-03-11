import readlineSync  from 'readline-sync';

//Menu
import menu from 'node-menu'
import Header from './menu/header.js'
//Functions
import { sendEther, sendEtherUsingPassword, sendEtherUsingPrivateKey } from './functions/send_ether.js'
import createAccount from './functions/create_account.js'
import getBalance from './functions/get_balance.js'
const sendEtherWrapper = () => {
    const sender_account = readlineSync.question("From: ");
    const receiver_account = readlineSync.question("To: ");
    const amount_eth = readlineSync.question("Amount(ETH): ");
    console.log(`SendEthereum from ${sender_account} -> ${receiver_account}: ${amount_eth} ETH`) // eslint-disable-line no-console
    sendEther(sender_account, receiver_account, amount_eth);
}


const sendEtherUsingPasswordWrapper = () => {
    const sender_account = readlineSync.question("From: ");
    const receiver_account = readlineSync.question("To: ");
    const amount_eth = readlineSync.question("Amount(ETH): ");
    const password = readlineSync.question("Password: ");
    console.log(`SendEthereumUsingPassword from ${sender_account} -> ${receiver_account}: ${amount_eth} ETH`) // eslint-disable-line no-console
    sendEtherUsingPassword(sender_account, receiver_account, amount_eth, password);
}

const sendEtherUsingPrivateKeyWrapper = () => {
    const sender_account = readlineSync.question("From: ");
    const receiver_account = readlineSync.question("To: ");
    const amount_eth = readlineSync.question("Amount(ETH): ");
    const private_key = readlineSync.question("PrivateKey: ");
    console.log(`SendEthereumUsingPrivateKey from ${sender_account} -> ${receiver_account}: ${amount_eth} ETH`) // eslint-disable-line no-console
    sendEtherUsingPrivateKey(sender_account, receiver_account, amount_eth, private_key);
}

const getBalanceWrapper = () => {
    const account = readlineSync.question("Account: ");
    getBalance(account)
}
const createAccountWrapper = () => {
    let private_key = readlineSync.question("PrivateKey: ");
    console.log(`Create Account using PK[${private_key}]`) // eslint-disable-line no-console
    createAccount(private_key);
}


menu.addDelimiter('-', 40, '')

    .addItem('Send Ether', sendEtherWrapper)
    .addItem('Send Ether using Password', sendEtherUsingPasswordWrapper)
    .addItem('Send Ether using PrivateKey', sendEtherUsingPrivateKeyWrapper)
    .addItem('Get Balance', getBalanceWrapper)
    .addItem('Create Account', createAccountWrapper)
    .addDelimiter('*', 40)
    .customHeader(Header)
    .disableDefaultHeader()
    .customPrompt(function() {
        process.stdout.write('\nEnter selection:\n')
    })
    .disableDefaultPrompt()
    .continueCallback(() => {
        console.log("callback");
    })
    .start();

    

