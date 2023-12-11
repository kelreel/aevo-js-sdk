export declare enum AevoChainType {
    MAINNET = "mainnet",
    TESTNET = "testnet"
}
export interface AevoConfig {
    rest_url: string;
    ws_url: string;
    type: AevoChainType;
    signing_domain: {
        name: string;
        version: string;
        chainId: string;
    };
}
export declare const TESTNET_CONFIG: AevoConfig;
export declare const MAINNET_CONFIG: AevoConfig;
export declare const getAevoConfig: (isMainnet?: boolean) => AevoConfig;
