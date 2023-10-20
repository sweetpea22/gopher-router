import { ChainInfo } from "@/app/interfaces";
import "dotenv/config"

const INFURA_API_KEY = process.env.NEXT_PUBLIC_INFURA_API_KEY as string;

export const ChainNames: {[x: string]: string} = {
    ethereum: "ETHEREUM",
    goerli: "GOERLI",
    sepolia: "SEPOLIA",
    opGoerli: "OP-GOERLI",
    scrollSepolia: "SCROLL-SEPOLIA",
    mantle: "MANTLE",
}

export const Chains: ChainInfo[] = [
    { 
        name: ChainNames.goerli, 
        rpcUrl: `https://goerli.infura.io/v3/${INFURA_API_KEY}`
    },
    {
        name: ChainNames.sepolia,
        rpcUrl: `https://sepolia.infura.io/v3/${INFURA_API_KEY}`
    },
    { 
        name: ChainNames.opGoerli, 
        rpcUrl: `https://optimism-goerli.infura.io/v3/${INFURA_API_KEY}` 
    },
    { 
        // have to find a new provider for scroll 
        name: ChainNames.scrollSepolia, 
        rpcUrl: `https://sepolia.infura.io/v3/${INFURA_API_KEY}`
    },
    { 
        name: ChainNames.ethereum, 
        rpcUrl: `https://mainnet.infura.io/v3/${INFURA_API_KEY}`
    }
]

export const getChain = (name: string): ChainInfo => {
    return Chains.find((x) => x.name === name) as ChainInfo;
}
