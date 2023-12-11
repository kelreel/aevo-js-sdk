## Aevo.xyz JS SDK ⚡

<div align="center">
  <img src="https://images.mirror-media.xyz/publication-images/nBg0BS_dWINeiuAf-asFL.jpeg?height=400&width=400" width="100" height="100">
</div>

> [!WARNING]
> The project is under active development and the API is unstable. The project is under active development and the API is unstable. It is recommended to run actions with orders only in the testnet.
> Feel free to create issues and request features


Unofficial JavaScript (TypeScript) Aevo SDK

Please see official the docs for more details:

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
- [x] Private API (Partially)
- [ ] Trade operations (coming soon)
- [ ] Usage examples: trading bot (coming soon)

---

#### Quick start

See also /examples folder


```shell
npm install aevo-js-sdk
```

##### Websocket ticket subscription


```typescript
import { AevoClient } from "aevo-js-sdk";

await client.openConnection();
await client.subscribeTicker("ticker:ETH:PERPETUAL");
client.readMessages();
```

##### Websocket ticket subscription
```typescript
import { AevoClient } from "aevo-js-sdk";

await client.openConnection();
await client.subscribeTicker("ticker:ETH:PERPETUAL");
client.readMessages();
```