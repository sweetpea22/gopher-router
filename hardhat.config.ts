"use client"
import { config as dotEnvConfig } from "dotenv";
dotEnvConfig();
import type { HardhatUserConfig } from 'hardhat/config';

const GOERLI_RPC_URL =
  process.env.NEXT_PUBLIC_GOERLI_RPC_URL as string;
const OPGOERLI_RPC_URL =
  process.env.NEXT_PUBLIC_OPGOERLI_RPC_URL as string;

const PRIVATE_KEY = process.env.NEXT_PUBLIC_PRIVATE_KEY as string;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY as string;

const config: HardhatUserConfig = {
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {
      chainId: 31337,
      allowUnlimitedContractSize: true,
    },
    localhost: {
      chainId: 31337,
      allowUnlimitedContractSize: true,
    },
    goerli: {
      url: GOERLI_RPC_URL,
      accounts: [PRIVATE_KEY],
      gasPrice: 225000000000,
      chainId: 5,
    },
    scroll_sepolia_testnet: {
      url: "https://rpc.ankr.com/scroll_sepolia_testnet",
      gasPrice: 1000000000,
      accounts: [PRIVATE_KEY],
      chainId: 534351,
    },
    OpGoerli: {
      url: OPGOERLI_RPC_URL,
      accounts: [PRIVATE_KEY],
      gasPrice: 225000000000,
      chainId: 420,
    }
  },
  solidity: {
    version: '0.8.19',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },

  //@ts-ignore
  etherscan: {
    apiKey: {
      goerli: ETHERSCAN_API_KEY,
    },
  },

  //@ts-ignore
  namedAccounts: {
    deployer: {
      default: 0, // here this will by default take the first account as deployer
    },
  },
};

export default config;
