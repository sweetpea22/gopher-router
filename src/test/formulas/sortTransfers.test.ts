import { BigNumber } from "ethers";
import { generateChain, generateTransfer } from "./utils";
import { sortTransfers } from "../../formulas/utils";
import { Chain, Transfer } from "@/formulas/interfaces";

let chains: Chain[] = [];
let transfers: Transfer[] = [];

beforeEach(() => {
    chains.push(generateChain("ethereum"));
    chains.push(generateChain("optimism"))
    return;
});

afterEach(() => {
    chains = [];
    transfers = [];
})

test('sortTransfers 1', () => {
    const eth = generateChain("ethereum");
    transfers.push(generateTransfer({chain: eth, cost: BigNumber.from("1")}));
    transfers.push(generateTransfer({chain: eth, cost: BigNumber.from("2")}));
    transfers.push(generateTransfer({chain: eth, cost: BigNumber.from("3")}));
    transfers.push(generateTransfer({chain: eth, cost: BigNumber.from("4")}));
    const sorted = sortTransfers(transfers);
    expect(sorted).toStrictEqual(transfers);
});

test('sortTransfers 2', () => {
    const eth = generateChain("ethereum");
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
    const sorted = sortTransfers(transfers);
    expect(sorted).toStrictEqual(expected);
});