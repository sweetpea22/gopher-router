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
        //     providers: [getChain(ChainNames.ethereum).provider],
        // },
        1735353714: { // Goerli domain ID
            providers: [getChain(ChainNames.goerli).provider],
        },
        1735356532: { // Optimism-Goerli domain ID
            providers: [getChain(ChainNames.opGoerli).provider],
        },
    },
};

export const domainMap: {[x: string]: string} = {
    // [ChainNames.ethereum]: "6648936",
    [ChainNames.goerli]: "1735353714",
    [ChainNames.opGoerli]: "1735356532",
}