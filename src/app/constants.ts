import { ChainInfo } from "@/app/interfaces";
import { BigNumber } from "ethers";

export const ChainNames: {[x: string]: string} = {
    ethereum: "ETHEREUM",
    goerli: "GOERLI",
    sepolia: "SEPOLIA",
    opGoerli: "OP-GOERLI",
}

export const Chains: ChainInfo[] = [
    { 
        name: ChainNames.goerli, 
        rpcUrl: "https://eth-goerli.api.onfinality.io/public" 
    },
    { 
        name: ChainNames.sepolia, 
        rpcUrl: "https://sepolia.infura.io/v3/5db0726c373b4e99a389e664e4db0d94" 
    },
    { 
        name: ChainNames.ethereum, 
        rpcUrl: "https://mainnet.infura.io/v3/5db0726c373b4e99a389e664e4db0d94" 
    },
    {
        name: ChainNames.opGoerli,
        rpcUrl: "https://goerli.optimism.io"
    }
]

export const getChain = (name: string): ChainInfo => {
    return Chains.find((x) => x.name === name) as ChainInfo;
}