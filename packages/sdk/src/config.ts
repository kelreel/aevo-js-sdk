export enum AevoChainType {
  MAINNET = "mainnet",
  TESTNET = "testnet",
}

export interface AevoConfig {
  rest_url: string;
  ws_url: string;
  chain: {
    type: AevoChainType;
    name: string;
    version: string;
    chainId: string;
  }
}

export const TESTNET_CONFIG: AevoConfig = {
  rest_url: "https://api-testnet.aevo.xyz",
  ws_url: "wss://ws-testnet.aevo.xyz",
  chain: {
    type: AevoChainType.TESTNET,
    name: "Aevo Testnet",
    version: "1",
    chainId: "11155111",
  },
}

export const MAINNET_CONFIG: AevoConfig = {
  rest_url: "https://api.aevo.xyz",
  ws_url: "wss://ws.aevo.xyz",
  chain: {
    type: AevoChainType.MAINNET,
    name: "Aevo Mainnet",
    version: "1",
    chainId: "1",
  },
}

export const getAevoConfig = (isMainnet?: boolean) => isMainnet ? MAINNET_CONFIG : TESTNET_CONFIG
