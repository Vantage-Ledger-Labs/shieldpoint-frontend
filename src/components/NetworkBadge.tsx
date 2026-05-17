import React from "react";
import { getStellarNetworkConfig } from "../config/stellarNetwork";

export function NetworkBadge() {
  const { badgeLabel } = getStellarNetworkConfig();

  return (
    <span className="inline-flex items-center rounded-full bg-slate-900 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide text-white">
      {badgeLabel}
    </span>
  );
}
