import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

type WalletName = "Freighter" | "Lobstr" | "xBull";

type WalletContextValue = {
  walletAddress: string | null;
  isConnected: boolean;
  network: string | null;
  availableWallets: WalletName[];
  activeWallet: WalletName | null;
  error: string | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => Promise<void>;
  clearError: () => void;
};

const WalletContext = createContext<WalletContextValue | undefined>(undefined);

const EXPECTED_NETWORK = process.env.NEXT_PUBLIC_STELLAR_NETWORK?.toUpperCase() ?? "PUBLIC";

function detectAvailableWallets(): WalletName[] {
  if (typeof window === "undefined") {
    return [];
  }

  const wallets: WalletName[] = [];

  if (window.freighterApi) wallets.push("Freighter");
  if (window.lobstr) wallets.push("Lobstr");
  if (window.xbull) wallets.push("xBull");

  return wallets;
}

function getPreferredWallet(wallets: WalletName[]): WalletName | null {
  if (wallets.includes("Freighter")) {
    return "Freighter";
  }

  return wallets.length > 0 ? wallets[0] : null;
}

function normalizePublicKey(value: unknown): string | null {
  if (typeof value === "string" && value.length > 0) {
    return value;
  }

  if (typeof value === "object" && value !== null && "publicKey" in value) {
    const pk = (value as { publicKey?: string }).publicKey;
    return typeof pk === "string" && pk.length > 0 ? pk : null;
  }

  return null;
}

async function getProviderNetwork(provider: any): Promise<string | null> {
  if (!provider) return null;

  if (typeof provider.getNetwork === "function") {
    const network = await provider.getNetwork();
    return typeof network === "string" ? network : null;
  }

  if (provider.network && typeof provider.network === "string") {
    return provider.network;
  }

  return null;
}

async function getProviderPublicKey(provider: any, connectResult: unknown): Promise<string | null> {
  const fromConnect = normalizePublicKey(connectResult);
  if (fromConnect) return fromConnect;

  if (typeof provider.getPublicKey === "function") {
    const publicKey = await provider.getPublicKey();
    return typeof publicKey === "string" ? publicKey : null;
  }

  return null;
}

function getProviderByName(walletName: WalletName): any {
  if (typeof window === "undefined") return null;

  switch (walletName) {
    case "Freighter":
      return window.freighterApi;
    case "Lobstr":
      return window.lobstr;
    case "xBull":
      return window.xbull;
    default:
      return null;
  }
}

function displayError(message: string) {
  if (typeof window !== "undefined") {
    window.alert(message);
  }
}

export const WalletProvider = ({ children }: { children: React.ReactNode }) => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [network, setNetwork] = useState<string | null>(null);
  const [activeWallet, setActiveWallet] = useState<WalletName | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [availableWallets, setAvailableWallets] = useState<WalletName[]>([]);

  const isConnected = Boolean(walletAddress && activeWallet);

  useEffect(() => {
    setAvailableWallets(detectAvailableWallets());
  }, []);

  const handleError = (message: string) => {
    setError(message);
    displayError(message);
  };

  const clearError = () => setError(null);

  const connectWallet = async () => {
    try {
      const wallets = detectAvailableWallets();
      if (wallets.length === 0) {
        throw new Error("No wallet detected. Please install Freighter, Lobstr, or xBull.");
      }

      const walletName = getPreferredWallet(wallets);
      if (!walletName) {
        throw new Error("No supported wallet is available.");
      }

      const provider = getProviderByName(walletName);
      if (!provider) {
        throw new Error(`Could not resolve provider for ${walletName}.`);
      }

      let connectResult: unknown;
      if (typeof provider.connect === "function") {
        connectResult = await provider.connect();
      }

      const publicKey = await getProviderPublicKey(provider, connectResult);
      const providerNetwork = await getProviderNetwork(provider);

      if (!publicKey) {
        throw new Error("Wallet connected, but public key could not be retrieved.");
      }

      if (providerNetwork && providerNetwork.toUpperCase() !== EXPECTED_NETWORK) {
        throw new Error(`Connected to wrong network: ${providerNetwork}. Expected ${EXPECTED_NETWORK}.`);
      }

      setWalletAddress(publicKey);
      setNetwork(providerNetwork ?? EXPECTED_NETWORK);
      setActiveWallet(walletName);
      setAvailableWallets(wallets);
      setError(null);
    } catch (caught) {
      const message = caught instanceof Error ? caught.message : "An unknown wallet error occurred.";
      handleError(message);
    }
  };

  const disconnectWallet = async () => {
    if (activeWallet) {
      const provider = getProviderByName(activeWallet);
      if (provider && typeof provider.disconnect === "function") {
        try {
          await provider.disconnect();
        } catch {
          // Ignore disconnect errors, clear local state anyway.
        }
      }
    }

    setWalletAddress(null);
    setNetwork(null);
    setActiveWallet(null);
    setError(null);
  };

  const value = useMemo(
    () => ({
      walletAddress,
      isConnected,
      network,
      availableWallets,
      activeWallet,
      error,
      connectWallet,
      disconnectWallet,
      clearError,
    }),
    [walletAddress, isConnected, network, availableWallets, activeWallet, error]
  );

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
};

export function useWallet() {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWallet must be used within WalletProvider");
  }
  return context;
}
