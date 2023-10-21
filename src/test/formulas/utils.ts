import { faker } from '@faker-js/faker';
import { ChainInfo, Transfer } from "../../app/interfaces";
import { ethers, BigNumber } from 'ethers';
import { ChainNames } from '@/app/constants';
import { BridgeType } from '@/formulas/gasCosts';

export const generateManyFakes = (n: number, fn: Function, fnArgs: any[]) => {
    return new Array(n).fill(0).map(() => fn(...fnArgs));
}

export const generateChain = (name: string, isBridged = false): ChainInfo => {
    const chain: ChainInfo = {
        name,
        rpcUrl: ""
    };
    return chain;
}

export const generateTransfer = (opts: {
    chain: ChainInfo, balance?: BigNumber, cost?: BigNumber, isBridged?: boolean, amountToTransfer?: BigNumber,
    maxPriorityFeePerGas?: BigNumber, maxFeePerGas?: BigNumber
}): Transfer => {
    const {chain, balance, cost, isBridged, amountToTransfer, maxPriorityFeePerGas, maxFeePerGas} = opts;
    const transfer: Transfer = {
        chain,
        hasFullBalance: false,
        balance: balance || BigNumber.from(faker.number.int(10)),
        feeData: {
            cost: cost || BigNumber.from(faker.number.int(0)),
            maxPriorityFeePerGas: maxPriorityFeePerGas || BigNumber.from(faker.number.int(0)),
            maxFeePerGas: maxFeePerGas || BigNumber.from(faker.number.int(0)),
            bridgeType: "" as BridgeType
        },
        isBridged: isBridged || false,
        amountToTransfer: amountToTransfer || BigNumber.from(0)
    }
    return transfer;
}