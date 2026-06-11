# EarnIT Protocol

**B2B RWA Yield Infrastructure — Built natively on Arc**

---

## Overview

EarnIT is a yield infrastructure layer that lets any fintech, neobank, or DeFi protocol embed commodity-backed RWA yield in an afternoon. Partners integrate a single SDK. Their users earn 9–12% APY on USDC-denominated deposits, backed by tokenized gold, agricultural receivables, and oil funding rate arbitrage — without the partner ever touching the underlying RWA stack.

EarnIT is not a consumer app. It is the engine consumer apps run on.

---

## The Problem

Traditional banks lend depositor capital at 6–23% across mortgages, personal loans, and credit cards, then return a fraction of a percent to depositors. Opacity is the feature, not a bug.

Fintechs face the same wall. Building a compliant RWA yield product means legal structuring, custody, oracle pricing, smart contracts, and an ongoing compliance function — 9–12 months and $1–3M before a single user earns a cent. Most never start. Those that do pass deposits to the same banks their users are trying to escape.

EarnIT closes this gap.

---

## Architecture

```
  LAYER 4  End Users          deposit · borrow · earn
           ───────────────────────────────────────────
  LAYER 3  Partner Apps       JustHodl · Chipper Cash
           (SDK consumers)    Paga · neobanks · DEXes
           ───────────────────────────────────────────
  LAYER 2  EarnIT SDK         npm install @earnit/sdk
           Partner API        REST + Webhooks
           ───────────────────────────────────────────
  LAYER 1  EarnIT Protocol    ArcVault (ERC-4626)
  ◄ BUILD  (Arc-native)       Allocator · Borrow · CCTP
           ───────────────────────────────────────────
  LAYER 0  Arc Blockchain     USYC · CCTP · xReserve
           (settlement)       Stork Oracle
```

Partners integrate at **Layer 2**. EarnIT owns Layers 0–1. Partners earn a fee share on every dollar of yield their users generate.

---

## Core Products

### arcUSD
ERC-4626 yield-bearing stablecoin. Deposit USDC, receive arcUSD. Commodity yield accretes silently to the share price — no claims, no manual compounding.

### arcBorrow
Self-repaying loan facility against arcUSD collateral. The yield your deposit generates offsets your borrow cost over time. No liquidation risk from price drift; the position heals itself.

### EarnIT SDK
One npm package. One afternoon. Any app gets yield + borrow without building the RWA layer.

```bash
npm install @earnit/sdk
```

---

## Smart Contracts

### USYCStrategyFactory

Deploys and tracks one `USYCStrategy` per underlying asset. Enforces singleton deployment, wires fees, and sets the keeper/management roles.

```solidity
function newUSYCStrategy(address _asset) external returns (address);
```

Key parameters set at deployment:

| Parameter | Value |
|---|---|
| Performance fee | 5% (500 bps) |
| Profit unlock window | 3 days |
| Fee recipient | `performanceFeeRecipient` |
| Emergency admin | `sms` |

### USYCStrategy (ERC-4626)

Routes USDC deposits into the Circle USYC teller on Arc. Yield is realised via `report()`, called by the keeper, which harvests the USYC rate differential and unlocks profit smoothly over the unlock window.

```
deposit(assets, receiver)  →  shares
redeem(shares, receiver, owner)  →  assets
report()  →  (profit, loss)
```

### Deployed Addresses (Testnet)

| Contract | Address |
|---|---|
| MockUSDC | `0x491c9634670214E08208A607F8cA08adD3523205` |
| MockUSYC | `0x6cd4efb775217252543E6a9e42ccD50323727C36` |
| Authority | `0xD8CF089e6389e0605ad7022e7FEa9c3EEd76DF73` |
| Teller | `0x1DC8C46DEF44C89dE572277ffe5Ea15c2C23B8Ef` |
| Factory | `0x34bFd737C2073DCD2913f6bE344e0f626f24aa10` |
| Strategy | `0x2F6470599C0Ee4E29C337C2C26f235a4EBBd6474` |

---

## Partner Integration

### SDK (recommended)

```bash
npm install @earnit/sdk
```

```typescript
import { EarnIT } from "@earnit/sdk";

const client = new EarnIT({ apiKey: process.env.EARNIT_API_KEY });

// Deposit on behalf of a user
const receipt = await client.deposit({
  asset: "USDC",
  amount: "1000",
  receiver: userWalletAddress,
});

// Check current yield position
const position = await client.getPosition(userWalletAddress);
console.log(position.currentValue, position.yieldEarned);

// Withdraw
await client.withdraw({ shares: position.shares, receiver: userWalletAddress });
```

### Direct contract interaction

```typescript
// 1. Approve strategy to spend USDC
await usdc.approve(strategyAddress, amount);

// 2. Deposit
const shares = await strategy.deposit(amount, receiverAddress);

// 3. Redeem
const assets = await strategy.redeem(shares, receiverAddress, ownerAddress);
```

---

## Yield Mechanics

Yield flows from the USYC teller rate differential. The teller publishes a `currentRate` (e.g. `1_000_500` = 1.0005× per period). The keeper calls `report()` on a scheduled basis, crystallising the difference between USYC market value and the strategy's recorded cost basis. Profit is streamed into the share price over three days to prevent sandwich attacks and smooth user-facing APY.

```
currentRate: 1_000_500  →  ~18.3% APY (daily compounding, annualised)
Performance fee: 5% of realised yield
Net to depositors: ~17.4% gross, subject to allocator composition
```

---

## Roles

| Role | Responsibility |
|---|---|
| `management` | Sets fees, updates addresses, accepts strategy ownership |
| `keeper` | Calls `report()` and `tend()` on schedule |
| `performanceFeeRecipient` | Receives the 5% protocol cut |
| `sms` (Safe) | Emergency shutdown authority |

---

## Security

- Singleton deployment enforced per asset — `AlreadyDeployed` reverts on duplicate
- Profit unlock window prevents flash-loan APY manipulation
- Emergency admin can pause strategy without touching user funds
- No upgradeable proxies on the core vault — what you audit is what runs

> This codebase has not yet been audited. Do not deploy to mainnet without a full third-party audit.

---

## Roadmap

- [x] USYC strategy + factory (testnet)
- [x] Mock teller + deposit/redeem flow
- [ ] arcBorrow: self-repaying loan module
- [ ] SDK v0.1 public release
- [ ] CCTP cross-chain deposit routing
- [ ] Stork Oracle integration for commodity pricing
- [ ] Mainnet Arc deployment
- [ ] Partner portal + fee dashboard

---

## Contributing

Pull requests are welcome. For significant changes, open an issue first to align on scope.

```bash
git clone https://github.com/earnit/protocol
cd protocol
forge install
forge test
```

---

## License

GPL-3.0