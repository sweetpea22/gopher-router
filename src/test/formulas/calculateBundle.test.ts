import { ChainInfo, Transfer } from "../../app/interfaces";
import { BigNumber } from "ethers";
import { calculateBundledTransactions, calculateNativeTransfer } from "../../formulas/calculateNative";
import { generateChain, generateManyFakes, generateTransfer } from "./utils";
import { ChainNames } from "@/app/constants";

let chains: ChainInfo[] = [];
let transfers: Transfer[] = [];
const transferAmount = BigNumber.from("10");

beforeEach(() => {
    chains.push(generateChain(ChainNames.ethereum));
    chains.push(generateChain(ChainNames.goerli))
    return;
});

afterEach(() => {
    chains = [];
    transfers = [];
})

test('calculateBundledTransactions :: single chain 1', () => {
    const eth: ChainInfo = chains[0];
    transfers.push(generateTransfer({chain: eth, balance: BigNumber.from("1"), cost: BigNumber.from("1")}));
    transfers.push(generateTransfer({chain: eth, balance: BigNumber.from("1"), cost: BigNumber.from("2")}));
    transfers.push(generateTransfer({chain: eth, balance: BigNumber.from("5"), cost: BigNumber.from("3")}));
    transfers.push(generateTransfer({chain: eth, balance: BigNumber.from("5"), cost: BigNumber.from("4")}));
    const bundle = calculateBundledTransactions(transferAmount, transfers);
    const expected = [
        generateTransfer({chain: eth, balance: BigNumber.from("5"), cost: BigNumber.from("4"), amountToTransfer: BigNumber.from(5)}),
        generateTransfer({chain: eth, balance: BigNumber.from("5"), cost: BigNumber.from("3"), amountToTransfer: BigNumber.from(5)})
    ];
    expect(bundle.bundleCost.toString()).toBe("7");
    expect(bundle.transfers).toStrictEqual(expected);
});


test('calculateBundledTransactions :: single chain 2', () => {
    const eth: ChainInfo = chains[0];
    transfers.push(generateTransfer({chain: eth, balance: BigNumber.from("1"), cost: BigNumber.from("1")}));
    transfers.push(generateTransfer({chain: eth, balance: BigNumber.from("1"), cost: BigNumber.from("2")}));
    transfers.push(generateTransfer({chain: eth, balance: BigNumber.from("8"), cost: BigNumber.from("3")}));
    transfers.push(generateTransfer({chain: eth, balance: BigNumber.from("5"), cost: BigNumber.from("4")}));
    const bundle = calculateBundledTransactions(transferAmount, transfers);
    
    const expected = [
        generateTransfer({chain: eth, balance: BigNumber.from("8"), cost: BigNumber.from("3"), amountToTransfer: BigNumber.from("8")}),
        generateTransfer({chain: eth, balance: BigNumber.from("1"), cost: BigNumber.from("2"), amountToTransfer: BigNumber.from("1")}),
        generateTransfer({chain: eth, balance: BigNumber.from("1"), cost: BigNumber.from("1"), amountToTransfer: BigNumber.from("1")}),
    ]
    expect(bundle.bundleCost.toString()).toBe("6");
    expect(bundle.transfers).toStrictEqual(expected);
 });

 test('calculateBundledTransactions :: single chain 3', () => {
    const eth: ChainInfo = chains[0];
    transfers.push(generateTransfer({chain: eth, balance: BigNumber.from("10"), cost: BigNumber.from("1")}));
    transfers.push(generateTransfer({chain: eth, balance: BigNumber.from("1"), cost: BigNumber.from("2")}));
    transfers.push(generateTransfer({chain: eth, balance: BigNumber.from("8"), cost: BigNumber.from("3")}));
    transfers.push(generateTransfer({chain: eth, balance: BigNumber.from("5"), cost: BigNumber.from("4")}));
    const bundle = calculateBundledTransactions(transferAmount, transfers);
    
    const expected = [
        generateTransfer({chain: eth, balance: BigNumber.from("10"), cost: BigNumber.from("1"), amountToTransfer: BigNumber.from("10")})
    ]
    expect(bundle.bundleCost.toString()).toBe("1");
    expect(bundle.transfers).toStrictEqual(expected);
 });

 test('calculateBundledTransactions :: single chain 4', () => {
    const eth: ChainInfo = chains[0];
    transfers.push(generateTransfer({chain: eth, balance: BigNumber.from("1"), cost: BigNumber.from("1")}));
    transfers.push(generateTransfer({chain: eth, balance: BigNumber.from("1"), cost: BigNumber.from("2")}));
    transfers.push(generateTransfer({chain: eth, balance: BigNumber.from("11"), cost: BigNumber.from("3")}));
    transfers.push(generateTransfer({chain: eth, balance: BigNumber.from("5"), cost: BigNumber.from("4")}));
    const bundle = calculateBundledTransactions(transferAmount, transfers);
    
    const expected = [
        generateTransfer({chain: eth, balance: BigNumber.from("11"), cost: BigNumber.from("3"), amountToTransfer: BigNumber.from("10")}),
    ]
    expect(bundle.bundleCost.toString()).toBe("3");
    expect(bundle.transfers).toStrictEqual(expected);
 });