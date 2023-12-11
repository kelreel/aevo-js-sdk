import { AevoChainType, AevoConfig, getAevoConfig } from "./config";
import { Web3, Web3BaseWalletAccount } from "web3";
import WebSocket from "ws";
import { sleep } from "./utils";
import { AevoRestApi } from "./rest-api/rest-api";

interface Params {
  signingKey?: string;
  walletAddress?: string;
  apiKey?: string;
  apiSecret?: string;
  chain?: AevoChainType;
  extraHeaders?: Record<string, string>;
  silent?: boolean;
}

const web3 = new Web3("http://127.0.0.1:9999");

export class AevoClient {
  signingKey: string | undefined;
  walletAddress: string | undefined;
  apiKey: string | undefined;
  apiSecret: string | undefined;
  chain: AevoChainType | undefined;
  extraHeaders: Record<string, string> | undefined;
  wallet: Web3BaseWalletAccount | undefined;
  ws: WebSocket | undefined;
  config: AevoConfig = getAevoConfig();
  silent = false;

  constructor(params?: Params) {
    this.signingKey = params?.signingKey;
    this.walletAddress = params?.walletAddress;
    this.apiKey = params?.apiKey;
    this.apiSecret = params?.apiSecret;
    this.chain = params?.chain;
    this.extraHeaders = params?.extraHeaders;
    this.silent = !!params?.silent;

    if (this.signingKey) {
      this.wallet = web3.eth.accounts.wallet.add(this.signingKey).get(0)!;
    }
    this.config = getAevoConfig(this.chain === AevoChainType.MAINNET);
  }

  openConnection = async (): Promise<void> => {
    if (!this.silent) {
      console.log(`[Aevo-SDK]: Opening Aevo WS connection...`);
    }

    this.ws = new WebSocket(this.config.ws_url, {
      perMessageDeflate: false,
    });

    if (this.apiKey && this.wallet) {
      if (!this.silent) {
        console.log(`[Aevo-SDK]: Connecting to WS ${this.config.ws_url}`);
      }

      await this.ws.send({
        id: 1,
        op: "auth",
        data: {
          key: this.apiKey,
          secret: this.apiSecret,
        },
      });
    }
    await sleep(2000); // wait for connection
  };

  closeConnection = async (): Promise<void> => {
    if (!this.silent) {
      console.log(`[Aevo-SDK]: Closing WS connection...`);
    }
    await this.ws?.close();
    if (!this.silent) {
      console.log(`[Aevo-SDK]: WS connection closed`);
    }
  };

  readMessages = (listener: (data: any) => void) => {
    this.ws?.on("message", (rawData) => {
      let data = rawData.toString();
      try {
        data = JSON.parse(data);
      } catch (e) {
        // empty
      }
      listener(data);
    });

    this.ws?.on("error", (data) => {
      if (!this.silent) {
        console.log(`[Aevo-SDK]: Aevo connection error, ${data.toString()}`);
      }
    });

    this.ws?.on("unexpected-response", (data) => {
      if (!this.silent) {
        console.log(
          `[Aevo-SDK]: Aevo connection unexpected-response, ${data.toString()}`,
        );
      }
    });

    this.ws?.on("close", (data) => {
      if (!this.silent) {
        console.log(
          `[Aevo-SDK]: Aevo connection closed (close event), ${data.toString()}`,
        );
      }
    });
  };

  subscribeTicker = async (asset: string): Promise<void> => {
    if (!this.silent) {
      console.log(`[Aevo-SDK]: WS subscribing to ticker ${asset}`);
    }
    await this.ws?.send(JSON.stringify({ op: "subscribe", data: [asset] }));
  };

  getRestApiClient = () => {
    return new AevoRestApi(this);
  };
}
