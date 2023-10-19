import { ChainInfo } from "@/app/interfaces";
import { BigNumber } from "ethers";

export enum ChainNames {
    ETHEREUM = "ETHEREUM",
    GOERLI = "GOERLI",
    SEPOLIA = "SEPOLIA",
    OP_GOERLI = "OP-GOERLI",
    SCROLL = "SCROLL-SEPOLIA",
    MANTLE = "MANTLE",

}

export const NativeTransferCosts = {
    [ChainNames.ETHEREUM]: 21000,
    [ChainNames.GOERLI]: 21000,
    [ChainNames.SEPOLIA]: 21000
};

export const chains: ChainInfo[] = [
    { 
        name: ChainNames.GOERLI, 
        rpcUrl: "https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161" 
    }, 
    { 
        name: ChainNames.SEPOLIA, 
        rpcUrl: "https://sepolia.infura.io/v3/4e6a0901020c4328a241bcf2fc69ca6c" 
    },
    { 
        name: ChainNames.OP_GOERLI, 
        rpcUrl: "https://optimism-goerli.infura.io/v3/4e6a0901020c4328a241bcf2fc69ca6c" 
    },
    { 
        name: ChainNames.SCROLL, 
        rpcUrl: "https://sepolia-rpc.scroll.io/" 
    },
]

