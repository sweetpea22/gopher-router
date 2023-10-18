import { faker } from '@faker-js/faker';
import { ChainInfo, Transfer } from "../../app/interfaces";
import { ethers, BigNumber } from 'ethers';

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

export const generateTransfer = (opts: {chain: ChainInfo, balance?: BigNumber, cost?: BigNumber, isBridged?: boolean, amountToTransfer?: BigNumber}): Transfer => {
    const {chain, balance, cost, isBridged, amountToTransfer} = opts;
    const transfer: Transfer = {
        chain,
        hasFullBalance: false,
        balance: balance || BigNumber.from(faker.number.int(10)),
        cost: cost || BigNumber.from(faker.number.int(100)),
        isBridged: isBridged || false,
        amountToTransfer: amountToTransfer || undefined
    }
    return transfer;
}