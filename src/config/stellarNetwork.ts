export enum StellarNetwork {
  FUTURENET = "FUTURENET",
  TESTNET = "TESTNET",
}

export type StellarNetworkConfig = {
  name: string;
  passphrase: string;
  horizonUrl: string;
  badgeLabel: string;
  explorerUrl: string;
};

const NETWORK_CONFIGS: Record<StellarNetwork, StellarNetworkConfig> = {
  [StellarNetwork.FUTURENET]: {
    name: "Futurenet",
    passphrase: "Futurenet ; February 2024",
    horizonUrl: "https://horizon-futurenet.stellar.org",
    badgeLabel: "Futurenet",
    explorerUrl: "https://futurenet.stellarexplorer.com",
  },
  [StellarNetwork.TESTNET]: {
    name: "Testnet",
    passphrase: "Test SDF Network ; September 2015",
    horizonUrl: "https://horizon-testnet.stellar.org",
    badgeLabel: "Testnet",
    explorerUrl: "https://testnet.stellarexplorer.com",
  },
};

const DEFAULT_NETWORK = StellarNetwork.FUTURENET;
const NETWORK_OVERRIDE_KEY = "shieldpoint:stellar-network-override";

function isValidStellarNetwork(value: string | undefined): value is StellarNetwork {
  return value === StellarNetwork.FUTURENET || value === StellarNetwork.TESTNET;
}

export function getStellarNetworkFromEnv(): StellarNetwork {
  const raw = process.env.NEXT_PUBLIC_STELLAR_NETWORK?.toUpperCase();
  if (raw === StellarNetwork.TESTNET) {
    return StellarNetwork.TESTNET;
  }
  return DEFAULT_NETWORK;
}

export function getStellarNetworkOverride(): StellarNetwork | undefined {
  if (typeof window === "undefined") {
    return undefined;
  }

  const raw = window.localStorage.getItem(NETWORK_OVERRIDE_KEY)?.toUpperCase();
  return isValidStellarNetwork(raw) ? raw : undefined;
}

export function setStellarNetworkOverride(network: StellarNetwork): void {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(NETWORK_OVERRIDE_KEY, network);
}

export function clearStellarNetworkOverride(): void {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(NETWORK_OVERRIDE_KEY);
}

export function getStellarNetwork(): StellarNetwork {
  if (process.env.NODE_ENV === "development") {
    const override = getStellarNetworkOverride();
    if (override) {
      return override;
    }
  }

  return getStellarNetworkFromEnv();
}

export function getStellarNetworkConfig(): StellarNetworkConfig {
  const network = getStellarNetwork();
  return NETWORK_CONFIGS[network];
}

export function getExpectedStellarNetworkPassphrase(): string {
  return getStellarNetworkConfig().passphrase;
}

export function getExpectedStellarHorizonUrl(): string {
  return getStellarNetworkConfig().horizonUrl;
}

export function getStellarNetworkName(): string {
  return getStellarNetworkConfig().name;
}

export function getStellarNetworkRpcUrl(): string {
  return getExpectedStellarHorizonUrl();
}

export function isWalletNetworkValid(walletNetworkPassphrase: string): boolean {
  return walletNetworkPassphrase === getExpectedStellarNetworkPassphrase();
}

export function getWalletNetworkMismatchError(walletNetworkPassphrase: string): string | null {
  if (isWalletNetworkValid(walletNetworkPassphrase)) {
    return null;
  }

  const expected = getStellarNetworkConfig();
  return `Connected wallet network does not match configured network. Expected ${expected.name} (${expected.passphrase}).`;
}

export function getFallbackStellarNetworkConfig(): StellarNetworkConfig {
  return NETWORK_CONFIGS[StellarNetwork.TESTNET];
}
