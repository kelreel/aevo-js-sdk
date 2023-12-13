import { AevoClient } from "aevo-js-sdk";
import w3 from "web3";

const testWallet = new w3().eth.accounts.wallet.create(1)[0];
const { address, privateKey } = testWallet;

console.log({ address, privateKey });

// Subscribe ETH ticker WS
const wsData = async () => {
  const client = new AevoClient().getWsApiClient();
  try {
    await client.openConnection();
    client.readMessages((data) => console.log(data.data.tickers[0]));
    // await client.subscribeTicker(`ETH:OPTION`);
    await client.subscribeTicker(`ETH:PERPETUAL`);

    setTimeout(() => {
      client.closeConnection();
    }, 10000);
  } catch (error) {
    console.log(error);
  }
};

// Get markets arr
const getMarkets = async () => {
  const restClient = new AevoClient().getRestApiClient();

  const data = await restClient.getMarkets({
    asset: "ETH",
    instrument_type: "OPTION",
  });

  console.log(data);
};

// Orders sign
const orderTest = async () => {
  const ordersClient = new AevoClient({
    signingKey: privateKey,
  }).getOrdersClient();

  const order = ordersClient.constructOrder({
    instrument: 1,
    isBuy: true,
    amount: "1000",
    limitPrice: "10",
  });

  const signedOrder = await ordersClient.signOrder(order);

  console.log(signedOrder);

  // TODO: make order via REST/WS API
};

wsData();
