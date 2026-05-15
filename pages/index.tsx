import { useWallet } from "../contexts/WalletContext";

export default function Home() {
  const {
    walletAddress,
    isConnected,
    network,
    availableWallets,
    activeWallet,
    error,
    connectWallet,
    disconnectWallet,
    clearError,
  } = useWallet();

  return (
    <main style={{ padding: 24, fontFamily: "Arial, sans-serif", maxWidth: 760, margin: "0 auto" }}>
      <h1>ShieldPoint Wallet</h1>
      <p>Connect with Freighter, Lobstr, or xBull to begin.</p>

      <div style={{ marginBottom: 20 }}>
        <button onClick={connectWallet} style={{ marginRight: 12, padding: "10px 16px" }}>
          Connect Wallet
        </button>
        <button onClick={disconnectWallet} style={{ padding: "10px 16px" }}>
          Disconnect
        </button>
      </div>

      <section style={{ marginBottom: 20 }}>
        <h2>Status</h2>
        <div>Connected: {isConnected ? "Yes" : "No"}</div>
        <div>Wallet: {activeWallet ?? "None"}</div>
        <div>Address: {walletAddress ?? "Not connected"}</div>
        <div>Network: {network ?? "Unknown"}</div>
      </section>

      <section style={{ marginBottom: 20 }}>
        <h2>Available Wallets</h2>
        <div>{availableWallets.length > 0 ? availableWallets.join(", ") : "No wallet extension detected."}</div>
      </section>

      {error ? (
        <section style={{ padding: 16, background: "#fdecea", color: "#611a15", borderRadius: 6 }}>
          <strong>Error:</strong> {error}
          <div>
            <button onClick={clearError} style={{ marginTop: 12, padding: "8px 12px" }}>
              Dismiss
            </button>
          </div>
        </section>
      ) : null}
    </main>
  );
}
