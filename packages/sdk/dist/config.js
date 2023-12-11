export var AevoChainType;
(function (AevoChainType) {
    AevoChainType["MAINNET"] = "mainnet";
    AevoChainType["TESTNET"] = "testnet";
})(AevoChainType || (AevoChainType = {}));
export const TESTNET_CONFIG = {
    rest_url: "https://api-testnet.aevo.xyz",
    ws_url: "wss://ws-testnet.aevo.xyz",
    chain: {
        type: AevoChainType.TESTNET,
        name: "Aevo Testnet",
        version: "1",
        chainId: "11155111",
    },
};
export const MAINNET_CONFIG = {
    rest_url: "https://api.aevo.xyz",
    ws_url: "wss://ws.aevo.xyz",
    chain: {
        type: AevoChainType.MAINNET,
        name: "Aevo Mainnet",
        version: "1",
        chainId: "1",
    },
};
export const getAevoConfig = (isMainnet) => isMainnet ? MAINNET_CONFIG : TESTNET_CONFIG;
