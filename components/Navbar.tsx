import { useWallet } from "../contexts/WalletContext";
import { useState } from "react";

export default function Navbar() {
  const { isConnected, walletAddress, connectWallet, disconnectWallet } = useWallet();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const truncateAddress = (addr: string | null) => {
    if (!addr) return "";
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-40 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <div className="text-2xl font-bold text-blue-600">ShieldPoint</div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <nav className="flex space-x-6">
              <a href="#" className="text-gray-700 hover:text-blue-600 transition font-medium">
                Dashboard
              </a>
              <a href="#" className="text-gray-700 hover:text-blue-600 transition font-medium">
                Proof Builder
              </a>
              <a href="#" className="text-gray-700 hover:text-blue-600 transition font-medium">
                History
              </a>
            </nav>

            {/* Wallet Button - Desktop */}
            {isConnected ? (
              <div className="flex items-center space-x-3">
                <span className="text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full">
                  {truncateAddress(walletAddress)}
                </span>
                <button
                  onClick={disconnectWallet}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition font-medium text-sm"
                >
                  Disconnect
                </button>
              </div>
            ) : (
              <button
                onClick={connectWallet}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition font-medium text-sm"
              >
                Connect Wallet
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-3">
            {/* Wallet Button - Mobile */}
            {isConnected ? (
              <button
                onClick={disconnectWallet}
                className="px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition font-medium text-xs"
              >
                Disconnect
              </button>
            ) : (
              <button
                onClick={connectWallet}
                className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition font-medium text-xs"
              >
                Connect
              </button>
            )}

            {/* Hamburger Menu */}
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 border-t border-gray-200">
            <nav className="pt-4 space-y-2 flex flex-col">
              <a
                href="#"
                className="text-gray-700 hover:text-blue-600 px-4 py-2 rounded hover:bg-gray-100 transition block"
              >
                Dashboard
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-blue-600 px-4 py-2 rounded hover:bg-gray-100 transition block"
              >
                Proof Builder
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-blue-600 px-4 py-2 rounded hover:bg-gray-100 transition block"
              >
                History
              </a>
            </nav>
            {isConnected && (
              <div className="mt-4 px-4">
                <span className="text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full block text-center">
                  {truncateAddress(walletAddress)}
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
