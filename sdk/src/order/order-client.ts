import { AevoClient } from "../aevo-client";

import { Wallet, parseUnits } from "ethers";
import ky from "ky";

export interface AevoOrder {
  isBuy: boolean;
  instrument: number;
  limitPrice: string;
  amount: string;
  timestamp: number;
  salt: string;
}

export interface AevoSignedOrder extends AevoOrder {
  maker: string;
  signature: string;
}

// See https://api-docs.aevo.xyz/reference/signing-orders
export class AevoOrderClient {
  private client: AevoClient;

  constructor(client: AevoClient) {
    this.client = client;
  }

  constructOrder = (
    order: Omit<AevoOrder, "maker" | "salt" | "timestamp">,
  ): AevoOrder => {
    return {
      isBuy: order.isBuy || false,
      instrument: order.instrument || 0,
      limitPrice: order.limitPrice || "",
      amount: order.amount || "",
      timestamp: Date.now(),
      salt: Math.floor(Math.random() * 100000).toString(),
    };
  };

  signOrder = async (order: AevoOrder) => {
    if (!this.client.signingKey) {
      throw "You should provide signing key";
    }

    const signer = new Wallet(this.client.signingKey!);

    const orderMessage = {
      maker: signer.address,
      isBuy: order.isBuy, // true if buy, false if sell
      instrument: order.instrument,

      // Limit price is in 6 decimal places.
      // Eg. $10.00 = "10000000"
      limitPrice: parseUnits(order.limitPrice, 6).toString(),

      // This is the number of contracts
      amount: order.amount,

      // Timestamp in UNIX seconds
      timestamp: order.timestamp,

      // Random number
      salt: order.salt,
    };

    const orderSignature = await signer.signTypedData(
      {
        name: "Aevo Mainnet",
        version: "1",
        chainId: 1,
      },
      {
        Order: [
          { name: "maker", type: "address" },
          { name: "isBuy", type: "bool" },
          { name: "limitPrice", type: "uint256" },
          { name: "amount", type: "uint256" },
          { name: "salt", type: "uint256" },
          { name: "instrument", type: "uint256" },
          { name: "timestamp", type: "uint256" },
        ],
      },
      orderMessage,
    );

    return { ...orderMessage, signature: orderSignature };
  };

  createOrder = async (order: AevoSignedOrder) => {
    const result = await ky
      .post(`${this.client.config.rest_url}/orders`, {
        json: {
          instrument: order.instrument,
          maker: order.maker,
          is_buy: order.isBuy,
          amount: order.amount,
          limit_price: order.limitPrice,
          salt: order.salt,
          timestamp: order.timestamp,
          signature: order.signature,
        },
        headers: this.client.extraHeaders,
      })
      .json();
    return result;
  };

  cancelOrder = async (order_id: string) => {
    const result = await ky
      .delete(`${this.client.config.rest_url}/${order_id}`, {
        headers: this.client.extraHeaders,
      })
      .json();
    return result;
  };
}
