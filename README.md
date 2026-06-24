# EarnIT Protocol

DEMO VIDEO: https://00234.oneapp.dev/
---

EarnIT is a yield infrastructure layer that lets any fintech, neobank, or DeFi protocol embed commodity-backed RWA yield. Partners integrate a single SDK. Their users deposit **cNGN** — Nigeria's regulated naira stablecoin — and earn 9–12% APY on their naira asset, with the protocol handling the USDC conversion internally via a built-in Curve-style stableswap.

Under the hood: cNGN deposits are routed through an on-chain FX swap (cNGN → USDC), deployed into the USYC yield strategy, and redeemable back to cNGN at any time. Users stay denominated in naira. EarnIT handles the rest.

EarnIT is not a consumer app. It is the engine consumer apps run on.

---

## The Problem

Traditional banks lend depositor capital at 6–23% across mortgages, personal loans, and credit cards, then return a fraction of a percent to depositors. Opacity is the feature, not a bug.

Fintechs face the same wall. Building a compliant RWA yield product means legal structuring, custody, oracle pricing, smart contracts, and an ongoing compliance function — 9–12 months and $1–3M before a single user earns a cent. Most never start. Those that do pass deposits to the same banks their users are trying to escape.

EarnIT closes this gap.

---

## Architecture

```
  LAYER 4  End Users          deposit cNGN · borrow · earn naira yield
           ────────────────────────────────────────────────────────────
  LAYER 3  Partner Apps       JustHodl · Chipper Cash
           (SDK consumers)    Paga · neobanks · DEXes
           ────────────────────────────────────────────────────────────
  LAYER 2  EarnIT SDK         npm install @earnit/sdk
           Partner API        REST + Webhooks
           ────────────────────────────────────────────────────────────
  LAYER 1  EarnIT Protocol    ArcVault (ERC-4626)
  ◄ BUILD  (Arc-native)       EarnITFXSwap (cNGN ⇄ USDC)
                              Allocator · Borrow · CCTP
           ────────────────────────────────────────────────────────────
  LAYER 0  Arc Blockchain     USYC · CCTP · xReserve
           (settlement)       Stork Oracle
```

Partners integrate at **Layer 2**. EarnIT owns Layers 0–1. Partners earn a fee share on every dollar of yield their users generate.

---

## Core Products

### arcNGN
ERC-4626 yield-bearing naira vault. Deposit cNGN, receive arcNGN shares. The protocol swaps your cNGN to USDC internally, deploys it into the USYC strategy, and accretes yield back to your naira position — silently, with no manual compounding. Redeem at any time; you receive cNGN.

### EarnIT-FX Swap
Built-in Curve stableswap AMM for cNGN ⇄ USDC. Uses the StableSwap invariant with an amplification factor `A` and a rate multiplier derived from the live NGN/USD oracle rate. Every deposit and withdrawal routes through this swap — users never touch USDC directly. See [Swap Mechanics](#swap-mechanics) for the full mathematical treatment.

### arcBorrow
Self-repaying loan facility against arcNGN collateral. The yield your deposit generates offsets your borrow cost over time. No liquidation risk from price drift; the position heals itself.

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
| cNGN |
`0x3afDf1831D1FFe96093533aF81120A903DAf0bE0` |
---

## Partner Integration

### SDK (recommended)

```bash
npm install @earnit/sdk
```

```typescript
import { EarnIT } from "@earnit/sdk";

const client = new EarnIT({ apiKey: process.env.EARNIT_API_KEY });

// Deposit cNGN — protocol handles the USDC swap internally
const receipt = await client.deposit({
  asset: "cNGN",
  amount: "150000",        // ₦150,000
  receiver: userWalletAddress,
});

// Check current yield position (valued in cNGN)
const position = await client.getPosition(userWalletAddress);
console.log(position.currentValue, position.yieldEarned);

// Withdraw — receive cNGN, not USDC
await client.withdraw({ shares: position.shares, receiver: userWalletAddress });
```

### Direct contract interaction

```typescript
// 1. Approve vault to spend cNGN
await cNGN.approve(arcNGNVaultAddress, amount);

// 2. Deposit cNGN — vault swaps to USDC and enters strategy
const shares = await arcNGNVault.deposit(amount, receiverAddress);

// 3. Redeem shares — strategy exits USDC, swaps back to cNGN
const assets = await arcNGNVault.redeem(shares, receiverAddress, ownerAddress);
```

---

## Swap Mechanics

EarnIT embeds the **EarnIT Protocol FX Swap** — a two-token StableSwap AMM — to route cNGN ⇄ USDC without leaving the protocol. Because cNGN and USDC have different nominal values, raw balances cannot be compared directly. A rate multiplier (sourced from the Stork oracle) converts both balances into a common virtual denomination before any swap or invariant computation.

### Naming

| Symbol | Meaning |
|---|---|
| `X`, `Y` | Real balances of cNGN and USDC in the pool |
| `X̃`, `Ỹ` | Virtual balances after rate multiplier (equal-value normalised) |
| `dx`, `dy` | Input and output amounts for a swap |
| `A` | Amplification factor — controls price depth |
| `D` | StableSwap invariant constant |
| `n` | Number of tokens (2 for all EarnIT pools) |

### The StableSwap Invariant

The pool satisfies the Curve StableSwap invariant at all times:

```
An²·(X̃ + Ỹ) + D = A·D·n² + D^(n+1) / (n^n · X̃ · Ỹ)
```

When `A → ∞` the pool behaves as a constant-sum market maker (zero slippage at peg). When `A → 0` it collapses to a constant-product AMM. EarnIT pools use a calibrated `A` to keep slippage near-zero around the live NGN/USD rate while still having bounded depth away from peg.

### Computing D (Newton's Method)

`D` cannot be solved algebraically. The protocol applies Newton's method iteratively. Define the residual function `f(D)` as the imbalance under the invariant, then iterate:

```
D_next = (A·n²·S·D + n·D_p) / ((A·n² - 1)·D + (n + 1)·D_p)

where:
  S   = X̃ + Ỹ          (sum of virtual balances)
  D_p = D^(n+1) / (n^n · X̃ · Ỹ)   (product term)
```

Iteration continues until `|D_next - D| < 1` (convergence). D is recomputed before every swap. It only changes permanently when liquidity is added or removed.

### Computing Swap Output

Given a swap input that moves virtual balance `X̃` to a new value `X̃'`, the protocol solves for the new `Ỹ'` that keeps `D` constant — again via Newton's method:

```
Y_next = (j² + b·j - c) / (2j + b)

where:
  b = X̃' + D / (A·n²)
  c = D^(n+1) / (n^n · A · X̃')
```

The real output amount `dy = Y - Y'` (virtual → real via rate multiplier). A swap fee is applied to `dy` before it reaches the user, with the remainder accruing to liquidity providers.

---

## Yield Mechanics

Yield flows from the USYC teller rate differential. When a user deposits cNGN, the EarnITFX Swap converts it to USDC at the live oracle rate. That USDC enters the USYC strategy, which earns the teller's `currentRate` (e.g. `1_000_500` = 1.0005× per period). The keeper calls `report()` on a scheduled basis, crystallising the rate differential as profit. Profit is streamed into the share price over three days to prevent sandwich attacks and smooth the user-facing APY.

On withdrawal, the process reverses: shares redeem to USDC, which swaps back to cNGN via EarnITFX. The user receives naira throughout.

```
User deposits cNGN
  → EarnITFX Swap: cNGN → USDC   (oracle rate, low slippage)
  → USYC Strategy: USDC → yield
  → report(): profit accretes to arcNGN share price
  → User redeems arcNGN → USDC → cNGN

currentRate: 1_000_500  →  ~18.3% APY (daily compounding, annualised)
Performance fee: 5% of realised yield
Net to depositors: ~17.4% gross, before FX swap fee
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
- [x] EarnITFX StableSwap — cNGN ⇄ USDC invariant (spec complete)
- [ ] EarnITFX on-chain deployment + oracle integration (Stork)
- [ ] arcNGN vault: cNGN deposit → swap → yield → redeem flow
- [ ] arcBorrow: self-repaying loan module
- [ ] SDK v0.1 public release
- [ ] CCTP cross-chain deposit routing
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
