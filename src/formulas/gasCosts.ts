import {BigNumber, ethers} from "ethers";
import { ChainInfo } from "../app/interfaces";
import {ChainNames, Chains} from "../app/constants";
import * as Connext from "./bridges/connext/connnextConfig";
import { connextGasCosts } from "./bridges/connext/connext";
import * as Axelar from "./bridges/axelar/axelarConfig";
import { getAxelarCost } from "./bridges/axelar/axelar";

// Populate list of common gas costs where available
const standardEVM = [
    ChainNames.ethereum, 
    ChainNames.goerli, 
    ChainNames.sepolia, 
    ChainNames.opGoerli, 
    ChainNames.scrollSepolia, 
    ChainNames.mantle, 
    ChainNames.baseGoerli,
]; // assume 21000 gas

export enum BridgeType {
    connext = "Connext",
    axelar = "Axelar"
}

export interface FeeData {
    maxFeePerGas: BigNumber;
    maxPriorityFeePerGas: BigNumber;
    cost: BigNumber;
    bridgeType: BridgeType;
}

export const calculateBaseGasCost = async (chain: ChainInfo, from: string): Promise<FeeData> => {
    if (standardEVM.includes(chain.name)) {
        const provider = new ethers.providers.JsonRpcProvider(chain.rpcUrl);
        try {
            const {maxFeePerGas, gasPrice, maxPriorityFeePerGas} = await provider.getFeeData();
            const gasUsed = await provider.estimateGas({
                to: from,
                from,
                value: 0
            })
            let cost: BigNumber;
            if (!maxPriorityFeePerGas) {
                // @ts-ignore let the app blow up if gasPrice isn't available yolo
                cost = gasUsed.mul(gasPrice);
            } else {
                // @ts-ignore let the app blow up if gasPrice isn't available yolo
                cost = gasUsed.mul((maxFeePerGas.add(maxPriorityFeePerGas)));
            }

            return {
                // @ts-ignore
                maxFeePerGas,
                // @ts-ignore
                maxPriorityFeePerGas,
                cost
            };
        } catch (e) {
            console.log("Error: ", e)
            return {} as FeeData;
        }
    } else {
        return {} as FeeData;
    }
};

export const calculateBridgeCost = async (originChain: ChainInfo, destinationChain: ChainInfo, to: string): Promise<FeeData> => {
    const bridgeOptions: FeeData[] = [];
    if (typeof Connext.domainMap[originChain.name] !== 'undefined' && typeof Connext.domainMap[destinationChain.name] !== 'undefined') {
        const option = await connextGasCosts(originChain, destinationChain, to);
        if (Object.keys(option).length > 0) {
            option.bridgeType = BridgeType.connext;
            bridgeOptions.push(option)
        }
    }

    if (typeof Axelar.domainMap[originChain.name] !== 'undefined' && typeof Axelar.domainMap[destinationChain.name] !== 'undefined') {
        const option = await getAxelarCost(originChain, destinationChain, to); 
        if (Object.keys(option).length > 0) {
            option.bridgeType = BridgeType.axelar;
            bridgeOptions.push(option)
        }
    }
    console.log('All options: ', bridgeOptions);

    // Sort and return cheapest
    if (bridgeOptions.length > 0) {
        const sorted = bridgeOptions.sort((a,b) => {
            if(a?.cost.gt(b.cost)) {
                return 1;
            } else if (a.cost.lt(b.cost)){
                return -1;
            } else {
                return 0;
            }
        });
        return sorted[0];
    }
    // Nothing available return empty
    return {} as FeeData;
};