## Aevo.xyz JS SDK ⚡

<div align="center">
  <img src="https://images.mirror-media.xyz/publication-images/nBg0BS_dWINeiuAf-asFL.jpeg?height=400&width=400" width="100" height="100">
</div>

> [!WARNING]
> The project is under active development and the API is unstable. It is recommended to run actions with private API (e.g. orders creating) only in the testnet.
> Feel free to create issues and request features

Unofficial JavaScript (TypeScript) Aevo SDK. Inspired by [Aevo SDK Python](https://github.com/aevoxyz/aevo-sdk).

<strong>Please see official the docs for more details:</strong>

[Aevo REST & Websocket API docs](https://api-docs.aevo.xyz/reference/overview)

Signing and API Keys can be generated through the Aevo UI:

Signing Keys: https://app.aevo.xyz/settings or https://testnet.aevo.xyz/settings

API Keys: https://app.aevo.xyz/settings/api-keys or https://testnet.aevo.xyz/settings/api-keys

---

#### Features and roadmap

- [x] Aevo Client instance
- [x] Well-typed REST responses
- [x] Websocket public operations (Partially)
- [x] REST API operations (Partially)
- [x] Trade operations (Partially)
- [ ] Instruments database
- [ ] Advanced typings
- [ ] Tutorials: trading bot (coming soon)
- [ ] Tutorials: order & liquidity management (coming soon)
- [ ] Web utils (browser environment support)
- [ ] Advanced docs

---

#### Quick start

See also [examples](./examples) folder

```shell
npm install aevo-js-sdk
```

Create client instance.
For Public api usage, you can skip all client params.

```typescript
import { AevoClient } from "aevo-js-sdk";

const client = new AevoClient({
  signingKey?: string; // private key
  walletAddress?: string; // wallet address
  apiKey?: string; // Aevo API key
  apiSecret?: string; // Aevo Secret key
  chain?: AevoChainType; // mainnet/testnet, testnet by default
  silent?: boolean; // silent logs
})
```

##### Ticker subscription (Websocket)

```typescript
import { AevoClient } from "aevo-js-sdk";

await client.openConnection();
await client.subscribeTicker("ticker:ETH:PERPETUAL");
client.readMessages((data) => {
  console.log(data.data.tickers)
});
```

##### Get markets (REST API)

```typescript
import { AevoClient } from "aevo-js-sdk";

const restClient = new AevoClient().getRestApiClient();

const data = await restClient.getMarkets({
  asset: "ETH",
  instrument_type: "OPTION",
});
```

##### Create order

```typescript
import { AevoClient } from "aevo-js-sdk";

//! Use in testnet only!
const ordersClient = new AevoClient({
  signingKey: privateKeyString,
}).getOrdersClient();

const order = ordersClient.constructOrder({
  instrument: 1, // Instrument ID
  isBuy: true,
  amount: "1000",
  limitPrice: "10",
});
```

...

Docs WIP
