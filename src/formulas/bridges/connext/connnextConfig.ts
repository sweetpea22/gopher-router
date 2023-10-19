import { ChainNames, getChain } from "@/app/constants";
import { SdkConfig } from "@connext/sdk";

export const sdkConfig: SdkConfig = {
    signerAddress: "0x7AE8b0D6353F0931EB9FaC0A3562fA9e4C6Ff933",
    // Use `mainnet` when you're ready...
    network: "testnet",
    // Add more chains here! Use mainnet domains if `network: mainnet`.
    // This information can be found at https://docs.connext.network/resources/supported-chains
    chains: {
        // 6648936: {
        //     providers: [getChain(ChainNames.ethereum).rpcUrl],
        // },
        1735353714: { // Goerli domain ID
            providers: [getChain(ChainNames.goerli).rpcUrl],
        },
        1735356532: { // Optimism-Goerli domain ID
            providers: [getChain(ChainNames.opGoerli).rpcUrl],
        },
    },
};

export const domainMap: {[x: string]: string} = {
    // [ChainNames.ethereum]: "6648936",
    [ChainNames.goerli]: "1735353714",
    [ChainNames.opGoerli]: "1735356532",
}

export const wethMapping: {[x: string]: string} = {
    // [ChainNames.ethereum]: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    [ChainNames.goerli]: "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6",
    [ChainNames.opGoerli]: "0x74c6FD7D2Bc6a8F0Ebd7D78321A95471b8C2B806",
}