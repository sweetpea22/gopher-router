import { faker } from '@faker-js/faker';
import { Chain, Transfer } from "../../formulas/interfaces";
import { ethers, BigNumber } from 'ethers';

export const generateManyFakes = (n: number, fn: Function, fnArgs: any[]) => {
    return new Array(n).fill(0).map(() => fn(...fnArgs));
}

export const generateChain = (name: string, isBridged = false): Chain => {
    const chain: Chain = {
        name,
        rpcUrl: ""
    };
    return chain;
}

export const generateTransfer = (opts: {chain: Chain, balance?: BigNumber, cost?: BigNumber, isBridged?: boolean}): Transfer => {
    const {chain, balance, cost, isBridged} = opts;
    const transfer: Transfer = {
        chain,
        hasFullBalance: false,
        balance: balance || BigNumber.from(faker.number.int(10)),
        cost: cost || BigNumber.from(faker.number.int(100)),
        isBridged: isBridged || false,
        amountToTransfer: undefined
    }
    return transfer;
}