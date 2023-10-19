import { BigNumber } from "ethers";
import { findCheapestCombination } from "../../formulas/lowestCost";
import { generateChain, generateTransfer } from "./utils";
import { ChainNames, getChain } from "@/app/constants";
import { calculateBaseGasCost } from "@/formulas/gasCosts";

const eth = generateChain(ChainNames.ethereum);

test('calculateBaseGasCost 1', async () => {
    await calculateBaseGasCost(getChain(eth.name))
});