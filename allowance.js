//console.log("The new account balance is: " +accountBalance.hbars.toTinybars() +" tinybar.");
//-----------------------<enter code below>--------------------------------------

const { Client, PrivateKey, AccountCreateTransaction, AccountBalanceQuery, Hbar, AccountId, TransferTransaction } = require("@hashgraph/sdk");


async function main() {

const myAccountId = AccountId.fromString("0.0.4575677");
const myPrivateKey = PrivateKey.fromString("add your key ");

const client = Client.forTestnet()

client.setOperator(myAccountId,myPrivateKey);

//Create new keys
const newAccountPrivateKey = PrivateKey.generateED25519(); 
const newAccountPublicKey = newAccountPrivateKey.publicKey;

//Create a new account with 1,000 tinybar starting balance
const newAccount = await new AccountCreateTransaction()
    .setKey(newAccountPublicKey)
    .setInitialBalance(Hbar.fromTinybars(100))
    .execute(client);

    // Get the new account ID
const getReceipt = await newAccount.getReceipt(client);
const newAccountId = getReceipt.accountId;

console.log("new account id", newAccountId.toString());

     //Create the transfer transaction
const sendHbar = await new TransferTransaction()
     .addHbarTransfer(myAccountId, Hbar.fromTinybars(-100)) //Sending account
     .addHbarTransfer(newAccountId, Hbar.fromTinybars(100)) //Receiving account
     .execute(client);

     //Verify the transaction reached consensus
const transactionReceipt = await sendHbar.getReceipt(client);
console.log("The transfer transaction from my account to the new account was: " + transactionReceipt.status.toString());

//Request the cost of the query
const queryCost = await new AccountBalanceQuery()
     .setAccountId(newAccountId)
     .getCost(client);

console.log("The cost of query is: " +queryCost);

// //Check the new account's balance
const getNewBalance = await new AccountBalanceQuery()
     .setAccountId(newAccountId)
     .execute(client);

console.log("The account balance after the transfer is: " +getNewBalance.hbars.toTinybars() +" tinybar.")
}

main();
// //Create the transfer transaction
// const sendHbar = await new TransferTransaction()
//      .addHbarTransfer(myAccountId, Hbar.fromTinybars(-1000)) //Sending account
//      .addHbarTransfer(newAccountId, Hbar.fromTinybars(1000)) //Receiving account
//      .execute(client);

//      //Verify the transaction reached consensus
// const transactionReceipt = await sendHbar.getReceipt(client);
// console.log("The transfer transaction from my account to the new account was: " + transactionReceipt.status.toString());

// //Request the cost of the query
// const queryCost = await new AccountBalanceQuery()
//      .setAccountId(newAccountId)
//      .getCost(client);

// console.log("The cost of query is: " +queryCost);

// //Check the new account's balance
// const getNewBalance = await new AccountBalanceQuery()
//      .setAccountId(newAccountId)
//      .execute(client);

// console.log("The account balance after the transfer is: " +getNewBalance.hbars.toTinybars() +" tinybar.")

