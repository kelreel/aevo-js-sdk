import WebSocket from "ws";
import { AevoClient } from "../aevo-client";
import { sleep } from "../utils";

export class AevoWsApi {
  client: AevoClient;
  ws: WebSocket | undefined;
  silent = false;

  constructor(client: AevoClient) {
    this.client = client;
    this.silent = client.silent;
  }

  openConnection = async (): Promise<void> => {
    if (!this.silent) {
      console.log(`[Aevo-SDK]: Opening Aevo WS connection...`);
    }

    this.ws = new WebSocket(this.client.config.ws_url, {
      perMessageDeflate: false,
    });

    if (this.client.apiKey && this.client.wallet) {
      if (!this.silent) {
        console.log(
          `[Aevo-SDK]: Connecting to WS ${this.client.config.ws_url}`,
        );
      }

      await this.ws.send({
        id: 1,
        op: "auth",
        data: {
          key: this.client.apiKey,
          secret: this.client.apiSecret,
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

  /**
   * Subscribe to WS API messages
   */
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
    await this.ws?.send(
      JSON.stringify({ op: "subscribe", data: [`ticker:${asset}`] }),
    );
  };
}
