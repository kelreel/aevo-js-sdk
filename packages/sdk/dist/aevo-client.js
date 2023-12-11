import { AevoChainType, getAevoConfig } from "./config";
import { Web3 } from 'web3';
import WebSocket from 'ws';
import { sleep } from "./utils";
const web3 = new Web3("http://127.0.0.1:9999");
export class AevoClient {
    constructor(params) {
        this.config = getAevoConfig();
        this.openConnection = async () => {
            console.log(`[Aevo-SDK]: Opening Aevo WS connection...`);
            this.ws = new WebSocket(this.config.ws_url, {
                perMessageDeflate: false,
            });
            if (this.apiKey && this.wallet) {
                console.log(`[Aevo-SDK]: Connecting to WS ${this.config.ws_url}`);
                await this.ws.send({ id: 1, op: "auth", data: {
                        key: this.apiKey,
                        secret: this.apiSecret
                    } });
            }
            await sleep(2000); // wait for connection
        };
        this.closeConnection = async () => {
            console.log(`[Aevo-SDK]: Closing WS connection...`);
            await this.ws?.close();
            console.log(`[Aevo-SDK]: WS connection closed`);
        };
        this.readMessages = (listener) => {
            this.ws?.on('message', (rawData) => {
                let data = rawData.toString();
                try {
                    data = JSON.parse(data);
                }
                catch (e) {
                    // empty
                }
                listener(data);
            });
            this.ws?.on('error', (data) => {
                console.log(`[Aevo-SDK]: Aevo connection error, ${data.toString()}`);
            });
            this.ws?.on('unexpected-response', (data) => {
                console.log(`[Aevo-SDK]: Aevo connection unexpected-response, ${data.toString()}`);
            });
            this.ws?.on('close', (data) => {
                console.log(`[Aevo-SDK]: Aevo connection closed (close event), ${data.toString()}`);
            });
        };
        this.subscribeTicker = async (asset) => {
            console.log(`[Aevo-SDK]: WS subscribing to ticker ${asset}`);
            await this.ws?.send(JSON.stringify({ op: "subscribe", data: [asset] }));
        };
        this.signingKey = params.signingKey;
        this.walletAddress = params.walletAddress;
        this.apiKey = params.apiKey;
        this.apiSecret = params.apiSecret;
        this.chain = params.chain;
        this.extraHeaders = params.extraHeaders;
        if (this.signingKey) {
            this.wallet = web3.eth.accounts.wallet.add(this.signingKey).get(0);
        }
        this.config = getAevoConfig(this.chain === AevoChainType.MAINNET);
    }
}
