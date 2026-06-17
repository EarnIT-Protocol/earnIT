import type { Address } from "viem";

// Reads a contract address from env, falling back to the deployed testnet address.
// Rejects malformed values at module load so a bad config never reaches a transaction.
function envAddress(key: string, fallback: Address): Address {
  const value = process.env[key] ?? fallback;
  if (!/^0x[0-9a-fA-F]{40}$/.test(value)) {
    throw new Error(`Invalid address for ${key}: "${value}"`);
  }
  return value as Address;
}

// Arc testnet deployment. Override per-environment via NEXT_PUBLIC_* env vars.
export const CONTRACTS = {
  usdc: envAddress("NEXT_PUBLIC_USDC_ADDRESS", "0x491c9634670214E08208A607F8cA08adD3523205"),
  usyc: envAddress("NEXT_PUBLIC_USYC_ADDRESS", "0x6cd4efb775217252543E6a9e42ccD50323727C36"),
  teller: envAddress("NEXT_PUBLIC_TELLER_ADDRESS", "0x1DC8C46DEF44C89dE572277ffe5Ea15c2C23B8Ef"),
  factory: envAddress("NEXT_PUBLIC_FACTORY_ADDRESS", "0x34bFd737C2073DCD2913f6bE344e0f626f24aa10"),
  vault: envAddress("NEXT_PUBLIC_VAULT_ADDRESS", "0x2F6470599C0Ee4E29C337C2C26f235a4EBBd6474"),
} as const;

export const ERC20_ABI = [
  { inputs: [], name: "name", outputs: [{ type: "string" }], stateMutability: "view", type: "function" },
  { inputs: [], name: "symbol", outputs: [{ type: "string" }], stateMutability: "view", type: "function" },
  { inputs: [], name: "decimals", outputs: [{ type: "uint8" }], stateMutability: "view", type: "function" },
  { inputs: [], name: "totalSupply", outputs: [{ type: "uint256" }], stateMutability: "view", type: "function" },
  { inputs: [{ name: "owner", type: "address" }], name: "balanceOf", outputs: [{ type: "uint256" }], stateMutability: "view", type: "function" },
  { inputs: [{ name: "spender", type: "address" }, { name: "amount", type: "uint256" }], name: "approve", outputs: [{ type: "bool" }], stateMutability: "nonpayable", type: "function" },
  { inputs: [{ name: "owner", type: "address" }, { name: "spender", type: "address" }], name: "allowance", outputs: [{ type: "uint256" }], stateMutability: "view", type: "function" },
] as const;

// ERC-4626 surface exposed by the USYC strategy (Yearn TokenizedStrategy).
export const VAULT_ABI = [
  { inputs: [], name: "asset", outputs: [{ type: "address" }], stateMutability: "view", type: "function" },
  { inputs: [], name: "name", outputs: [{ type: "string" }], stateMutability: "view", type: "function" },
  { inputs: [], name: "symbol", outputs: [{ type: "string" }], stateMutability: "view", type: "function" },
  { inputs: [], name: "decimals", outputs: [{ type: "uint8" }], stateMutability: "view", type: "function" },
  { inputs: [], name: "totalAssets", outputs: [{ type: "uint256" }], stateMutability: "view", type: "function" },
  { inputs: [], name: "totalSupply", outputs: [{ type: "uint256" }], stateMutability: "view", type: "function" },
  { inputs: [], name: "pricePerShare", outputs: [{ type: "uint256" }], stateMutability: "view", type: "function" },
  { inputs: [], name: "performanceFee", outputs: [{ type: "uint16" }], stateMutability: "view", type: "function" },
  { inputs: [{ name: "owner", type: "address" }], name: "balanceOf", outputs: [{ type: "uint256" }], stateMutability: "view", type: "function" },
  { inputs: [{ name: "owner", type: "address" }], name: "maxWithdraw", outputs: [{ type: "uint256" }], stateMutability: "view", type: "function" },
  { inputs: [{ name: "owner", type: "address" }], name: "maxRedeem", outputs: [{ type: "uint256" }], stateMutability: "view", type: "function" },
  { inputs: [{ name: "assets", type: "uint256" }], name: "convertToShares", outputs: [{ type: "uint256" }], stateMutability: "view", type: "function" },
  { inputs: [{ name: "shares", type: "uint256" }], name: "convertToAssets", outputs: [{ type: "uint256" }], stateMutability: "view", type: "function" },
  { inputs: [{ name: "assets", type: "uint256" }], name: "previewDeposit", outputs: [{ type: "uint256" }], stateMutability: "view", type: "function" },
  { inputs: [{ name: "shares", type: "uint256" }], name: "previewRedeem", outputs: [{ type: "uint256" }], stateMutability: "view", type: "function" },
  { inputs: [{ name: "assets", type: "uint256" }, { name: "receiver", type: "address" }], name: "deposit", outputs: [{ name: "shares", type: "uint256" }], stateMutability: "nonpayable", type: "function" },
  { inputs: [{ name: "shares", type: "uint256" }, { name: "receiver", type: "address" }, { name: "owner", type: "address" }], name: "redeem", outputs: [{ name: "assets", type: "uint256" }], stateMutability: "nonpayable", type: "function" },
  { inputs: [{ name: "assets", type: "uint256" }, { name: "receiver", type: "address" }, { name: "owner", type: "address" }], name: "withdraw", outputs: [{ name: "shares", type: "uint256" }], stateMutability: "nonpayable", type: "function" },
] as const;

// Mock USYC teller. `currentRate` is the per-period accrual factor (1e6 == 1.0x).
export const TELLER_ABI = [
  { inputs: [], name: "currentRate", outputs: [{ type: "uint256" }], stateMutability: "view", type: "function" },
  { inputs: [], name: "asset", outputs: [{ type: "address" }], stateMutability: "view", type: "function" },
  { inputs: [], name: "share", outputs: [{ type: "address" }], stateMutability: "view", type: "function" },
  { inputs: [{ name: "assets", type: "uint256" }], name: "previewWithdraw", outputs: [{ type: "uint256" }], stateMutability: "view", type: "function" },
  { inputs: [{ name: "shares", type: "uint256" }], name: "previewRedeem", outputs: [{ type: "uint256" }], stateMutability: "view", type: "function" },
] as const;
