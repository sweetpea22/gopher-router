import { BigNumber } from "ethers";
import { findCheapestCombination } from "../../formulas/lowestCost";
import { generateChain, generateTransfer } from "./utils";

const eth = generateChain("eth");

test('findCheapestCombination 1', () => {
    const bundles = [
        generateTransfer({ cost: BigNumber.from('1'), balance: BigNumber.from('2'), chain: eth}),
        generateTransfer({ cost: BigNumber.from('10'), balance: BigNumber.from('8'), chain: eth}),
        generateTransfer({ cost: BigNumber.from('10'), balance: BigNumber.from('10'), chain: eth}),
        generateTransfer({ cost: BigNumber.from('4'), balance: BigNumber.from('1'), chain: eth})
    ];
    const expected = [
        generateTransfer({ cost: BigNumber.from('10'), balance: BigNumber.from('10'), chain: eth}),
    ];
    const selectedBundles = findCheapestCombination(BigNumber.from("10"), bundles);
    expect(selectedBundles).toStrictEqual(expected);
});

test('findCheapestCombination 2', () => {
    const bundles = [
        generateTransfer({ cost: BigNumber.from('1'), balance: BigNumber.from('2'), chain: eth}),
        generateTransfer({ cost: BigNumber.from('10'), balance: BigNumber.from('10'), chain: eth}),
        generateTransfer({ cost: BigNumber.from('4'), balance: BigNumber.from('1'), chain: eth}),
        generateTransfer({ cost: BigNumber.from('1'), balance: BigNumber.from('8'), chain: eth})
    ];
    const expected = [
        generateTransfer({ cost: BigNumber.from('1'), balance: BigNumber.from('2'), chain: eth}),
        generateTransfer({ cost: BigNumber.from('1'), balance: BigNumber.from('8'), chain: eth}),

    ];
    const selectedBundles = findCheapestCombination(BigNumber.from("10"), bundles);
    expect(selectedBundles).toStrictEqual(expected);
});

