import { ChainNames } from "@/app/constants"

export const domainMap: { [x: string]: string } = {
    [ChainNames.goerli]: "ethereum-2",
    [ChainNames.opGoerli]: "optimism",
    [ChainNames.scrollSepolia]: "scroll",
    [ChainNames.mantle]: "mantle",
}

export const axlWethMapping: {[x: string]: string} = {
    [ChainNames.goerli]: "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6",
    [ChainNames.opGoerli]: "0xeA700DCe55e72C4C08b97AcFc7dF214EC30F4a64",
    [ChainNames.scrollSepolia]: "0xeA700DCe55e72C4C08b97AcFc7dF214EC30F4a64",
    [ChainNames.mantle]: "0xeA700DCe55e72C4C08b97AcFc7dF214EC30F4a64",
}

export const axlJumpContractMapping: {[x: string]: string} = {
    // @TODO deploy contracts
    [ChainNames.goerli]: "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6",
    [ChainNames.opGoerli]: "0xeA700DCe55e72C4C08b97AcFc7dF214EC30F4a64",
    [ChainNames.scrollSepolia]: "0xeA700DCe55e72C4C08b97AcFc7dF214EC30F4a64",
    [ChainNames.mantle]: "0xeA700DCe55e72C4C08b97AcFc7dF214EC30F4a64",
}