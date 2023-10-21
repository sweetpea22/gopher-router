import { ChainInfo, Token } from "@/app/interfaces";
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
        rpcUrl: `https://sepolia-rpc.scroll.io`
    },
    { 
        name: ChainNames.ethereum, 
        rpcUrl: `https://mainnet.infura.io/v3/${INFURA_API_KEY}`
    }
]

export const getChain = (name: string): ChainInfo => {
    return Chains.find((x) => x.name === name) as ChainInfo;
}

export const wethMapping: {[x: string]: string} = {
    [ChainNames.ethereum]: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    [ChainNames.goerli]: "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6",
    [ChainNames.opGoerli]: "0x74c6FD7D2Bc6a8F0Ebd7D78321A95471b8C2B806",
    [ChainNames.scrollSepolia]: "0xeA700DCe55e72C4C08b97AcFc7dF214EC30F4a64",
    [ChainNames.mantle]: "0xeA700DCe55e72C4C08b97AcFc7dF214EC30F4a64",
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