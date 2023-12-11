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

- [x] Aevo Client
- [x] Websocket public operations (Partially)
- [x] REST public operations (Partially)
- [ ] Trade operations (coming soon)

---

#### Quick start

See also /examples folder

```typescript
import { AevoClient } from "aevo-js-sdk";

await client.openConnection();
await client.subscribeTicker("ticker:ETH:PERPETUAL");
client.readMessages();
```
