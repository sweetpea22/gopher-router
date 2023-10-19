import { BigNumber } from "ethers";
import { findCheapestCombination } from "../../formulas/lowestCost";
import { generateChain, generateTransfer } from "./utils";
import { ChainNames } from "@/app/constants";
import { calculateBaseGasCost } from "@/formulas/gasCosts";

const eth = generateChain(ChainNames.ETHEREUM);
eth.rpcUrl = "https://mainnet.infura.io/v3/5db0726c373b4e99a389e664e4db0d94";

test('calculateBaseGasCost 1', async () => {
    await calculateBaseGasCost(eth)
});