import React from "react";
import { getStellarNetworkConfig } from "../config/stellarNetwork";

export interface ExplorerLinkProps {
  type: "tx" | "account";
  hash?: string;
  address?: string;
  className?: string;
  tooltipText?: string;
}

/**
 * ExplorerLink component that generates a clickable link to Stellar Explorer.
 * Automatically uses the appropriate network (Futurenet or Testnet) based on configuration.
 *
 * @param type - Link type: "tx" for transaction or "account" for account/address
 * @param hash - Transaction hash (required when type="tx")
 * @param address - Account address (required when type="account")
 * @param className - Optional CSS class for styling
 * @param tooltipText - Optional custom tooltip text
 */
export function ExplorerLink({
  type,
  hash,
  address,
  className = "",
  tooltipText,
}: ExplorerLinkProps) {
  const { explorerUrl } = getStellarNetworkConfig();

  // Determine which value to use and validate
  const value = type === "tx" ? hash : address;
  if (!value) {
    console.warn(`ExplorerLink: Missing ${type === "tx" ? "hash" : "address"} for type="${type}"`);
    return null;
  }

  // Build the explorer URL
  const path = type === "tx" ? `/tx/${value}` : `/account/${value}`;
  const url = `${explorerUrl}${path}`;

  // Default tooltip text
  const tooltip = tooltipText || (type === "tx" ? "View transaction on Explorer" : "View account on Explorer");

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center text-blue-600 hover:text-blue-800 transition-colors ${className}`}
      title={tooltip}
      aria-label={tooltip}
    >
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
        />
      </svg>
    </a>
  );
}
