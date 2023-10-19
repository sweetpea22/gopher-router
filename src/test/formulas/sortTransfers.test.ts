import { BigNumber } from "ethers";
import { generateChain, generateTransfer } from "./utils";
import { sortByTransfersByBalance, sortByTransfersByCost } from "../../formulas/utils";
import { ChainInfo, Transfer } from "@/app/interfaces";
import { ChainNames } from "@/app/constants";

let chains: ChainInfo[] = [];
let transfers: Transfer[] = [];

beforeEach(() => {
    chains.push(generateChain(ChainNames.ethereum));
    chains.push(generateChain(ChainNames.goerli))
    return;
});

afterEach(() => {
    chains = [];
    transfers = [];
})

test('sortByTransfersByCost 1', () => {
    const eth = generateChain(ChainNames.ethereum);
    transfers.push(generateTransfer({chain: eth, cost: BigNumber.from("1")}));
    transfers.push(generateTransfer({chain: eth, cost: BigNumber.from("2")}));
    transfers.push(generateTransfer({chain: eth, cost: BigNumber.from("3")}));
    transfers.push(generateTransfer({chain: eth, cost: BigNumber.from("4")}));
    const sorted = sortByTransfersByCost(transfers);
    expect(sorted).toStrictEqual(transfers);
});

test('sortByTransfersByCost 1', () => {
    const eth = generateChain(ChainNames.ethereum);
    transfers.push(generateTransfer({chain: eth, cost: BigNumber.from("5"), balance: BigNumber.from("1")}));
    transfers.push(generateTransfer({chain: eth, cost: BigNumber.from("2"), balance: BigNumber.from("1")}));
    transfers.push(generateTransfer({chain: eth, cost: BigNumber.from("1"), balance: BigNumber.from("1")}));
    transfers.push(generateTransfer({chain: eth, cost: BigNumber.from("6"), balance: BigNumber.from("1")}));
    transfers.push(generateTransfer({chain: eth, cost: BigNumber.from("5"), balance: BigNumber.from("1")}));
    const expected = [
        generateTransfer({chain: eth, cost: BigNumber.from("1"), balance: BigNumber.from("1")}),
        generateTransfer({chain: eth, cost: BigNumber.from("2"), balance: BigNumber.from("1")}),
        generateTransfer({chain: eth, cost: BigNumber.from("5"), balance: BigNumber.from("1")}),
        generateTransfer({chain: eth, cost: BigNumber.from("5"), balance: BigNumber.from("1")}),
        generateTransfer({chain: eth, cost: BigNumber.from("6"), balance: BigNumber.from("1")}),
    ];
    const sorted = sortByTransfersByCost(transfers);
    expect(sorted).toStrictEqual(expected);
});

test('sortByTransfersByBalance 1', () => {
    const eth = generateChain(ChainNames.ethereum);
    transfers.push(generateTransfer({chain: eth, cost: BigNumber.from("1"), balance: BigNumber.from("1")}));
    transfers.push(generateTransfer({chain: eth, cost: BigNumber.from("2"), balance: BigNumber.from("2")}));
    transfers.push(generateTransfer({chain: eth, cost: BigNumber.from("3"), balance: BigNumber.from("3")}));
    transfers.push(generateTransfer({chain: eth, cost: BigNumber.from("4"), balance: BigNumber.from("4")}));
    const sorted = sortByTransfersByBalance(transfers);
    expect(sorted).toStrictEqual(transfers);
});

test('sortByTransfersByBalance 2', () => {
    const eth = generateChain(ChainNames.ethereum);
    transfers.push(generateTransfer({chain: eth, cost: BigNumber.from("5"), balance: BigNumber.from("4")}));
    transfers.push(generateTransfer({chain: eth, cost: BigNumber.from("2"), balance: BigNumber.from("3")}));
    transfers.push(generateTransfer({chain: eth, cost: BigNumber.from("1"), balance: BigNumber.from("2")}));
    transfers.push(generateTransfer({chain: eth, cost: BigNumber.from("6"), balance: BigNumber.from("1")}));
    const expected = [
        generateTransfer({chain: eth, cost: BigNumber.from("6"), balance: BigNumber.from("1")}),
        generateTransfer({chain: eth, cost: BigNumber.from("1"), balance: BigNumber.from("2")}),
        generateTransfer({chain: eth, cost: BigNumber.from("2"), balance: BigNumber.from("3")}),
        generateTransfer({chain: eth, cost: BigNumber.from("5"), balance: BigNumber.from("4")})
    ];
    const sorted = sortByTransfersByBalance(transfers);
    expect(sorted).toStrictEqual(expected);
});