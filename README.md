### 3. `shieldpoint-frontend` (The Interface)
**Focus:** React, Stellar SDK, Wallet Integration, UX.

```markdown
# 📱 ShieldPoint: User Dashboard (Frontend)

The user-facing application for interacting with ShieldPoint. This dApp allows users to connect their Stellar wallets and generate verifiable proofs of their financial status without revealing their identity.

## ✨ Features
- **Wallet Integration:** Native support for Freighter, Lobstr, and xBull.
- **Proof Builder:** A wizard-style UI to select attributes (e.g., "Prove I have > 1000 USDC").
- **Stellar Explorer Link:** View the on-chain verification status in real-time.

## 🛠 Tech Stack
- **Framework:** React / Next.js
- **Styling:** Tailwind CSS
- **Stellar Libs:** `@stellar/stellar-sdk`, `@stellar/freighter-api`

## 🚀 Quick Start
```bash
npm install
npm run dev
```

## ⚙️ Network Configuration
Add a local override in `.env.local` to select the active Stellar network for development.

Example `.env.local`:
```env
NEXT_PUBLIC_STELLAR_NETWORK=FUTURENET
```

Supported values:
- `FUTURENET` (default)
- `TESTNET`

The frontend reads `NEXT_PUBLIC_STELLAR_NETWORK` and uses the configured passphrase and horizon URL for all Stellar SDK calls.

In development mode, the app can also use a runtime network override stored in `localStorage`.

Wallet connection logic should validate the connected wallet network with `src/config/stellarNetwork.ts` helpers such as `isWalletNetworkValid()` and `getWalletNetworkMismatchError()`.

The current network is available for display in the UI using `src/components/NetworkBadge.tsx`, and a development-only network selector is available through `src/components/NetworkSwitcher.tsx`.
