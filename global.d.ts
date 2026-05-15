export {};

declare global {
  interface FreighterApi {
    connect: () => Promise<void>;
    getPublicKey: () => Promise<string>;
    getNetwork: () => Promise<string>;
    disconnect?: () => Promise<void>;
  }

  interface LobstrWallet {
    connect: () => Promise<string | { publicKey?: string }>;
    getPublicKey?: () => Promise<string>;
    getNetwork?: () => Promise<string>;
    disconnect?: () => Promise<void>;
  }

  interface xBullWallet {
    connect: () => Promise<string | { publicKey?: string }>;
    getPublicKey?: () => Promise<string>;
    getNetwork?: () => Promise<string>;
    disconnect?: () => Promise<void>;
  }

  interface Window {
    freighterApi?: FreighterApi;
    lobstr?: LobstrWallet;
    xbull?: xBullWallet;
  }
}
