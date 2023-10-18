import {BigNumber} from "ethers";

export interface ChainInfo {
    name: string;
    rpcUrl: string;
}

export interface AccountDetails {
    chain: ChainInfo;
    balance: BigNumber;
}

export interface Transfer {
    chain: ChainInfo;
    hasFullBalance: boolean;
    balance: BigNumber;
    cost: BigNumber;
    isBridged?: boolean;
    amountToTransfer?: BigNumber;
}

export interface BundledTransfers {
    transfers: Transfer[];
    bundleCost: BigNumber;
}