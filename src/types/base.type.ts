import { ChainNotFoundException } from "@/exceptions"

export interface SignedMessage {
  message: string;
  publicKey: string;
  signature: string;
  chain?: Chain;
}

export interface Response<Data> {
  message: string;
  data: Data;
}

export enum Chain {
  Avalanche = "avalanche",
  Aptos = "aptos",
}

export enum Platform {
  Evm = "evm",
  Aptos = "aptos",
}

export const chainToPlatform = (chain: Chain): Platform => {
    switch (chain) {
    case Chain.Aptos:
        return Platform.Aptos
    case Chain.Avalanche:
        return Platform.Evm
    default:
        throw new ChainNotFoundException(chain)
    }
}
