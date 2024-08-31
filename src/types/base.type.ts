export interface SignedMessage {
  message: string;
  publicKey: string;
  signature: string;
  platform?: Platform;
}

export interface Response<Data> {
  message: string;
  data: Data;
}

export enum Platform {
  Evm = "evm",
  Aptos = "aptos",
}