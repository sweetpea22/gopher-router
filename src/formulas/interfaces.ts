import {BigNumber} from "ethers";

export interface Chain {
    name: string;
    rpcUrl: string;
}

export interface AccountDetails {
    chain: Chain;
    balance: BigNumber;
}

export interface Transfer {
    chain: Chain;
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