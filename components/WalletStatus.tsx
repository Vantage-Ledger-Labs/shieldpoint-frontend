import { useWallet } from "../contexts/WalletContext";

export default function WalletStatus() {
  const { walletAddress, isConnected, network, activeWallet, availableWallets, error, clearError } =
    useWallet();

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Status Card */}
      <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
        <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
          Connection Status
        </h3>
        <div className="mt-2">
          <p
            className={`text-2xl font-bold ${
              isConnected ? "text-green-600" : "text-gray-500"
            }`}
          >
            {isConnected ? "Connected" : "Disconnected"}
          </p>
        </div>
        {isConnected && (
          <p className="mt-2 text-xs text-gray-600">
            {new Date().toLocaleTimeString()}
          </p>
        )}
      </div>

      {/* Active Wallet Card */}
      <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
        <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
          Active Wallet
        </h3>
        <div className="mt-2">
          <p className="text-2xl font-bold text-gray-900">
            {activeWallet || "None"}
          </p>
        </div>
      </div>

      {/* Network Card */}
      <div className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-500">
        <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
          Network
        </h3>
        <div className="mt-2">
          <p className="text-2xl font-bold text-gray-900">
            {network || "Unknown"}
          </p>
        </div>
      </div>

      {/* Available Wallets Card */}
      <div className="bg-white rounded-lg shadow p-6 border-l-4 border-orange-500">
        <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
          Wallets Found
        </h3>
        <div className="mt-2">
          <p className="text-2xl font-bold text-gray-900">
            {availableWallets.length}
          </p>
        </div>
        {availableWallets.length > 0 && (
          <p className="mt-2 text-xs text-gray-600">
            {availableWallets.join(", ")}
          </p>
        )}
      </div>

      {/* Address Card - Full Width on Small Screens */}
      <div className="col-span-1 md:col-span-2 lg:col-span-4 bg-white rounded-lg shadow p-6 border-l-4 border-indigo-500">
        <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
          Wallet Address
        </h3>
        <div className="mt-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-lg font-mono text-gray-900 break-all">
            {walletAddress || "Not connected"}
          </p>
          {walletAddress && (
            <button
              onClick={() => {
                if (walletAddress) {
                  navigator.clipboard.writeText(walletAddress);
                }
              }}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition font-medium text-sm whitespace-nowrap"
            >
              Copy Address
            </button>
          )}
        </div>
      </div>

      {/* Error Message - Full Width */}
      {error && (
        <div className="col-span-1 md:col-span-2 lg:col-span-4 bg-red-50 border-l-4 border-red-500 p-6 rounded-lg">
          <h3 className="text-sm font-semibold text-red-800 uppercase tracking-wide">
            Error
          </h3>
          <p className="mt-2 text-red-700">{error}</p>
          <button
            onClick={clearError}
            className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition font-medium text-sm"
          >
            Dismiss
          </button>
        </div>
      )}
    </div>
  );
}
