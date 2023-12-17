import { AevoChainType, AevoConfig, getAevoConfig } from "./config";
import { Web3, Web3BaseWalletAccount } from "web3";
import { AevoRestApi } from "./rest-api";
import { AevoOrderClient } from "./order";
import { AevoWsApi } from "./ws-api";

interface Params {
  signingKey?: string;
  walletAddress?: string;
  apiKey?: string;
  apiSecret?: string;
  chain?: AevoChainType;
  silent?: boolean;
}

const web3 = new Web3("http://127.0.0.1:9999");

export class AevoClient {
  signingKey: string | undefined;
  walletAddress: string | undefined;
  apiKey: string | undefined;
  apiSecret: string | undefined;
  chain: AevoChainType | undefined;
  extraHeaders: Record<string, string | undefined> = {};
  wallet: Web3BaseWalletAccount | undefined;
  config: AevoConfig = getAevoConfig();
  silent = false;

  constructor(params?: Params) {
    this.signingKey = params?.signingKey;
    this.walletAddress = params?.walletAddress;
    this.apiKey = params?.apiKey;
    this.apiSecret = params?.apiSecret;
    this.chain = params?.chain;
    this.extraHeaders = {
      AEVO_KEY: params?.apiKey,
      AEVO_SECRET: params?.apiSecret,
    };
    this.silent = !!params?.silent;

    if (this.signingKey) {
      this.wallet = web3.eth.accounts.wallet.add(this.signingKey).get(0)!;
    }
    this.config = getAevoConfig(this.chain === AevoChainType.MAINNET);
  }

  get signingDomain() {
    return this.config.signing_domain;
  }

  getRestApiClient = () => {
    return new AevoRestApi(this);
  };

  getWsApiClient = () => {
    return new AevoWsApi(this);
  };

  getOrdersClient = () => {
    return new AevoOrderClient(this);
  };
}
