import ethers from "ethers";
// See https://api-docs.aevo.xyz/reference/signing-orders
export class AevoOrdersClient {
    constructor(client) {
        this.signOrder = async (instrumentId, isBuy, limitPrice, amount) => {
            if (!this.client.signingKey) {
                throw "You should provide signing key";
            }
            const signer = new ethers.Wallet(this.client.signingKey);
            const orderMessage = {
                maker: signer?.address,
                isBuy: isBuy, // true if buy, false if sell
                instrument: instrumentId,
                // Limit price is in 6 decimal places.
                // Eg. $10.00 = "10000000"
                limitPrice: ethers.parseUnits(limitPrice, 6).toString(),
                // This is the number of contracts
                amount: amount,
                // Timestamp in UNIX seconds
                timestamp: Date.now(),
                // Random number
                salt: Math.floor(Math.random() * 100000).toString(),
            };
            const orderSignature = await signer.signTypedData({
                name: "Aevo Mainnet",
                version: "1",
                chainId: 1,
            }, {
                Order: [
                    { name: "maker", type: "address" },
                    { name: "isBuy", type: "bool" },
                    { name: "limitPrice", type: "uint256" },
                    { name: "amount", type: "uint256" },
                    { name: "salt", type: "uint256" },
                    { name: "instrument", type: "uint256" },
                    { name: "timestamp", type: "uint256" },
                ],
            }, orderMessage);
            return orderSignature;
        };
        this.client = client;
    }
}
