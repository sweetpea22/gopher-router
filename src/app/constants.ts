import { ChainInfo } from "@/app/interfaces";
import { BigNumber } from "ethers";

export enum ChainNames {
    ETHEREUM = "ETHREUM",
    GOERLI = "GOERLI",
    SEPOLIA = "SEPOLIA"
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
        rpcUrl: "https://sepolia.infura.io/v3/5db0726c373b4e99a389e664e4db0d94" 
    }
]
