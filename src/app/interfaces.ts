import {BigNumber} from "ethers";
import { ChainNames, TokenNames } from "./constants";
import { FeeData } from "@/formulas/gasCosts";

export interface Token {
    name: TokenNames;
    chainMap: {[x: string]: string};
    balacnes?: TokenBalance[];
}
export interface TokenBalance {
    chain: ChainInfo;
    balance: BigNumber;
}

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
    feeData: FeeData;
    amountToTransfer: BigNumber;
    isBridged?: boolean;
}

export interface BundledTransfers {
    transfers: Transfer[];
    bundleCost: BigNumber;
}