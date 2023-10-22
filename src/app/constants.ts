import { ChainInfo, Token } from "@/app/interfaces";
import "dotenv/config"
import { ethers } from "ethers";

const INFURA_API_KEY = process.env.NEXT_PUBLIC_INFURA_API_KEY as string;

export const ChainNames: {[x: string]: string} = {
    ethereum: "ETHEREUM",
    goerli: "GOERLI",
    sepolia: "SEPOLIA",
    opGoerli: "OP-GOERLI",
    baseGoerli: "BASE-GOERLI",
    scrollSepolia: "SCROLL-SEPOLIA",
    mantle: "MANTLE",
}

export const Chains: ChainInfo[] = [
    { 
        name: ChainNames.goerli, 
        provider: new ethers.providers.JsonRpcProvider(`https://goerli.infura.io/v3/${INFURA_API_KEY}`),
        chainId: 5
    },
    {
        name: ChainNames.sepolia,
        provider: new ethers.providers.JsonRpcProvider(`https://sepolia.infura.io/v3/${INFURA_API_KEY}`),
        chainId: 11155111
    },
    { 
        name: ChainNames.opGoerli, 
        provider: new ethers.providers.JsonRpcProvider(`https://optimism-goerli.infura.io/v3/${INFURA_API_KEY}`),
        chainId: 420
    },
    { 
        // have to find a new provider for scroll 
        name: ChainNames.scrollSepolia, 
        provider: new ethers.providers.JsonRpcProvider(`https://sepolia-rpc.scroll.io`),
        chainId: 534351
    },
    { 
        name: ChainNames.ethereum, 
        provider: new ethers.providers.JsonRpcProvider(`https://mainnet.infura.io/v3/${INFURA_API_KEY}`),
        chainId: 1
    },
    { 
        name: ChainNames.baseGoerli , 
        provider: new ethers.providers.JsonRpcProvider(`https://goerli.base.org`),
        chainId: 84531
    }
]

export const getChain = (name: string): ChainInfo => {
    return Chains.find((x) => x.name === name) as ChainInfo;
}

export const wethMapping: {[x: string]: string} = {
    [ChainNames.ethereum]: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    [ChainNames.goerli]: "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6",
    [ChainNames.sepolia]: "0x7b79995e5f793A07Bc00c21412e50Ecae098E7f9",
    [ChainNames.opGoerli]: "0x74c6FD7D2Bc6a8F0Ebd7D78321A95471b8C2B806",
    [ChainNames.scrollSepolia]: "0xeA700DCe55e72C4C08b97AcFc7dF214EC30F4a64",
    [ChainNames.mantle]: "0xeA700DCe55e72C4C08b97AcFc7dF214EC30F4a64",
    [ChainNames.baseGoerli]: "0x4200000000000000000000000000000000000006",
}

export enum TokenNames {
    weth = "WETH",
}

export const Tokens: Token[] = [
    {
        name: TokenNames.weth,
        chainMap: wethMapping,
    },
];

export const getToken = (name: TokenNames): Token => {
    return Tokens.find((x) => x.name === name) as Token;
}