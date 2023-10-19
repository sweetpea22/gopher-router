import { ChainInfo } from "@/app/interfaces";


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
        rpcUrl: "https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161" 
    },
    {
        name: ChainNames.sepolia,
        rpcUrl: "https://sepolia.infura.io/v3/5db0726c373b4e99a389e664e4db0d94"
    },
    { 
        name: ChainNames.opGoerli, 
        rpcUrl: "https://optimism-goerli.infura.io/v3/4e6a0901020c4328a241bcf2fc69ca6c" 
    },
    { 
        name: ChainNames.scrollSepolia, 
        rpcUrl: "https://sepolia-rpc.scroll.io/" 
    },
    { 
        name: ChainNames.ethereum, 
        rpcUrl: "https://mainnet.infura.io/v3/5db0726c373b4e99a389e664e4db0d94" 
    }
]

export const getChain = (name: string): ChainInfo => {
    return Chains.find((x) => x.name === name) as ChainInfo;
}
