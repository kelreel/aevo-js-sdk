import { AevoClient } from "aevo-js-sdk";

const privateKeyString =
  "0x1f953dc9b6437fb94fcafa5dabe3faa0c34315b954dd66f41bf53273339c6d26"; // example

// Subscribe ETH ticker WS
const wsData = async () => {
  const client = new AevoClient().getWsApiClient();
  try {
    await client.openConnection();
    client.readMessages((data) => console.log(data.data.tickers));
    await client.subscribeTicker("ticker:ETH:PERPETUAL");

    setTimeout(() => {
      client.closeConnection();
    }, 2000);
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
    signingKey: privateKeyString,
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
