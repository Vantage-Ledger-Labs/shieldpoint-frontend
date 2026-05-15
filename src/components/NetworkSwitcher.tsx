import React, { useEffect, useState } from "react";
import {
  getStellarNetwork,
  setStellarNetworkOverride,
  clearStellarNetworkOverride,
  StellarNetwork,
} from "../config/stellarNetwork";

const NETWORK_OPTIONS: StellarNetwork[] = [StellarNetwork.FUTURENET, StellarNetwork.TESTNET];

export function NetworkSwitcher() {
  const [currentNetwork, setCurrentNetwork] = useState<StellarNetwork>(getStellarNetwork());
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  useEffect(() => {
    if (!isBrowser) {
      return;
    }

    setCurrentNetwork(getStellarNetwork());
  }, [isBrowser]);

  if (process.env.NODE_ENV !== "development") {
    return null;
  }

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = event.target.value as StellarNetwork;

    if (selected === currentNetwork) {
      return;
    }

    if (selected === StellarNetwork.FUTURENET || selected === StellarNetwork.TESTNET) {
      setStellarNetworkOverride(selected);
      setCurrentNetwork(selected);
      return;
    }

    clearStellarNetworkOverride();
    setCurrentNetwork(getStellarNetwork());
  };

  return (
    <div className="flex items-center gap-2 rounded-xl border border-slate-300 bg-slate-50 p-3 text-sm text-slate-900 shadow-sm">
      <span className="font-semibold">Active Stellar Network</span>
      <select
        value={currentNetwork}
        onChange={handleChange}
        className="rounded-md border border-slate-300 bg-white px-2 py-1 text-sm focus:border-sky-500 focus:ring-sky-500"
      >
        {NETWORK_OPTIONS.map((option) => (
          <option key={option} value={option}>
            {option === StellarNetwork.FUTURENET ? "Futurenet" : "Testnet"}
          </option>
        ))}
      </select>
      <span className="text-xs text-slate-500">Runtime override stored in localStorage.</span>
    </div>
  );
}
