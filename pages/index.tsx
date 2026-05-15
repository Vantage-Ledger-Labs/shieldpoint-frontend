import { useWallet } from "../contexts/WalletContext";
import WalletStatus from "../components/WalletStatus";
import ProofBuilder from "../components/ProofBuilder";

export default function Home() {
  const { isConnected } = useWallet();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
          Welcome to ShieldPoint
        </h1>
        <p className="text-lg text-gray-600">
          Connect with Freighter, Lobstr, or xBull to begin creating proofs.
        </p>
      </div>

      {/* Wallet Status Cards */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 md:p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Wallet Overview</h2>
        <WalletStatus />
      </section>

      {/* Proof Builder Section */}
      {isConnected ? (
        <section className="bg-white rounded-lg shadow-md p-4 md:p-6">
          <ProofBuilder />
        </section>
      ) : (
        <section className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-6 md:p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="text-yellow-600">
              <svg
                className="w-8 h-8"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-yellow-900">
                Connect Your Wallet First
              </h3>
              <p className="text-yellow-700 mt-1">
                Please connect your wallet using the button in the navigation bar to start
                creating and submitting proofs.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Info Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6 border-t-4 border-blue-500">
          <h3 className="text-xl font-bold text-gray-900 mb-3">How It Works</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="text-blue-600 font-bold mr-3">1.</span>
              <span>Connect your Stellar wallet</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 font-bold mr-3">2.</span>
              <span>Select an asset to prove ownership</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 font-bold mr-3">3.</span>
              <span>Generate cryptographic proof</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 font-bold mr-3">4.</span>
              <span>Submit proof to the blockchain</span>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border-t-4 border-green-500">
          <h3 className="text-xl font-bold text-gray-900 mb-3">Supported Wallets</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-center">
              <span className="text-green-600 mr-2">✓</span>
              <span>Freighter</span>
            </li>
            <li className="flex items-center">
              <span className="text-green-600 mr-2">✓</span>
              <span>Lobstr</span>
            </li>
            <li className="flex items-center">
              <span className="text-green-600 mr-2">✓</span>
              <span>xBull</span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
