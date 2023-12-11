import {AevoClient} from 'aevo-js-sdk';
// import {Web3} from 'web3';

// const web3 = new Web3("http://127.0.0.1:9999");

// const privateKeyString = '0x1f953dc9b6437fb94fcafa5dabe3faa0c34315b954dd66f41bf53273339c6d26'; // example
// const account = web3.eth.accounts.wallet.add(privateKeyString).get(0)
// console.log(account)

const main = async () => {
  const client = new AevoClient({})
  try {
    await client.openConnection();
    client.readMessages((data) => console.log(data.data.tickers))
    await client.subscribeTicker("ticker:ETH:PERPETUAL")


    setTimeout(() => {
      client.closeConnection();
    }, 4000)
  } catch (error) {
    console.log(error);
  }
};

main()
