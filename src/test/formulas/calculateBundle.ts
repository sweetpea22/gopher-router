import { Chain, Transfer } from "../../formulas/interfaces";
import { BigNumber } from "ethers";
import { calculateBundledTransactions, calculate_native_transfer } from "../../formulas/send";
import { generateChain, generateManyFakes, generateTransfer } from "./utils";

let chains: Chain[] = [];
let transfers: Transfer[] = [];
const transferAmount = BigNumber.from("10");

beforeEach(() => {
    chains.push(generateChain("ethereum"));
    chains.push(generateChain("optimism"))
    return;
});

afterEach(() => {
    chains = [];
    transfers = [];
})

test('calculateBundledTransactions :: single chain 1', () => {
    const eth: Chain = chains[0];
    transfers.push(generateTransfer({chain: eth, balance: BigNumber.from("1"), cost: BigNumber.from("1")}));
    transfers.push(generateTransfer({chain: eth, balance: BigNumber.from("1"), cost: BigNumber.from("2")}));
    transfers.push(generateTransfer({chain: eth, balance: BigNumber.from("5"), cost: BigNumber.from("3")}));
    transfers.push(generateTransfer({chain: eth, balance: BigNumber.from("5"), cost: BigNumber.from("4")}));
    const bundle = calculateBundledTransactions(transferAmount, transfers);
    const expected = [
        generateTransfer({chain: eth, balance: BigNumber.from("5"), cost: BigNumber.from("3")}),
        generateTransfer({chain: eth, balance: BigNumber.from("5"), cost: BigNumber.from("4")})
    ];
    expect(bundle.bundleCost.toString()).toBe("7");
    expect(bundle.transfers).toStrictEqual(transfers);
});


test('calculateBundledTransactions :: single chain 2', () => {
    const eth: Chain = chains[0];
    transfers.push(generateTransfer({chain: eth, balance: BigNumber.from("1"), cost: BigNumber.from("1")}));
    transfers.push(generateTransfer({chain: eth, balance: BigNumber.from("1"), cost: BigNumber.from("2")}));
    transfers.push(generateTransfer({chain: eth, balance: BigNumber.from("8"), cost: BigNumber.from("3")}));
    transfers.push(generateTransfer({chain: eth, balance: BigNumber.from("5"), cost: BigNumber.from("4")}));
    const bundle = calculateBundledTransactions(transferAmount, transfers);
    expect(bundle.bundleCost.toString()).toBe("6");
    // Remove the last transfer which should have been ignored because transfer amnount reached prior to it being used.
    transfers.pop();
    expect(bundle.transfers).toStrictEqual(transfers);
 });

 test('calculateBundledTransactions :: single chain 3', () => {
    const eth: Chain = chains[0];
    transfers.push(generateTransfer({chain: eth, balance: BigNumber.from("10"), cost: BigNumber.from("1")}));
    transfers.push(generateTransfer({chain: eth, balance: BigNumber.from("1"), cost: BigNumber.from("2")}));
    transfers.push(generateTransfer({chain: eth, balance: BigNumber.from("8"), cost: BigNumber.from("3")}));
    transfers.push(generateTransfer({chain: eth, balance: BigNumber.from("5"), cost: BigNumber.from("4")}));
    const bundle = calculateBundledTransactions(transferAmount, transfers);
    expect(bundle.bundleCost.toString()).toBe("1");
    expect(bundle.transfers).toStrictEqual([transfers[0]]);
 });