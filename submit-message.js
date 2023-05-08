// const { Client, PrivateKey, AccountCreateTransaction, AccountBalanceQuery, Hbar, AccountId, TransferTransaction } = require("@hashgraph/sdk");

console.clear();
require("dotenv").config();
const {
  AccountId,
  PrivateKey,
  Client,
  TopicCreateTransaction,
  TopicMessageQuery,
  TopicMessageSubmitTransaction,
} = require("@hashgraph/sdk");

// // Grab the OPERATOR_ID and OPERATOR_KEY from the .env file
// const myAccountId = AccountId.fromString("0.0.4575677");
// const myPrivateKey = PrivateKey.fromString("302e020100300506032b657004220420b84efc7b44477dac311ea7ec8eeada5641806e4e691e9221f54b69e205db244a");


// // client.setOperator(myAccountId,myPrivateKey);

// // Build Hedera testnet and mirror node client
// const client = Client.forTestnet();

// // Set the operator account ID and operator private key
// client.setOperator(myAccountId, myPrivateKey);

async function submitFirstMessage() {

    // Grab the OPERATOR_ID and OPERATOR_KEY from the .env file
const myAccountId = AccountId.fromString("0.0.4583432");
const myPrivateKey = PrivateKey.fromString("302e020100300506032b657004220420b84efc7b44477dac311ea7ec8eeada5641806e4e691e9221f54b69e205db244a");


// client.setOperator(myAccountId,myPrivateKey);

// Build Hedera testnet and mirror node client
const client = Client.forTestnet();

// Set the operator account ID and operator private key
client.setOperator(myAccountId, myPrivateKey);
  // Create a new topic
  let txResponse = await new TopicCreateTransaction().execute(client);

  // Grab the newly generated topic ID
  let receipt = await txResponse.getReceipt(client);
  let topicId = receipt.topicId;
  console.log(`Your topic ID is: ${topicId}`);

  // Wait 5 seconds between consensus topic creation and subscription creation
  await new Promise((resolve) => setTimeout(resolve, 5000));

  // Create the topic
  new TopicMessageQuery()
    .setTopicId(topicId)
    .subscribe(client, null, (message) => {
      let messageAsString = Buffer.from(message.contents, "utf8").toString();
      console.log(
        `${message.consensusTimestamp.toDate()} Received: ${messageAsString}`
      );
    });

  // Send message to topic
  let sendResponse = await new TopicMessageSubmitTransaction({
    topicId: topicId,
    message: "Hello, HCS!",
  }).execute(client);
  const getReceipt = await sendResponse.getReceipt(client);

  // Get the status of the transaction
  const transactionStatus = getReceipt.status;
  console.log("The message transaction status: " + transactionStatus.toString());
}

submitFirstMessage();