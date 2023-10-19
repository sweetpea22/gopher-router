import {BigNumber, ethers} from "ethers";
import { ChainInfo } from "../app/interfaces";
import {ChainNames} from "../app/constants";
import * as Connext from "./bridges/connext/connnextConfig";
import { connextGasCosts } from "./bridges/connext/connext";

// Populate list of common gas costs where available
const standardEVM = [ChainNames.ethereum, ChainNames.goerli, ChainNames.sepolia, ChainNames.opGoerli]; // assume 21000 gas

export interface FeeData {
    gasPrice: BigNumber;
    maxPriorityFeePerGas: BigNumber;
    cost: BigNumber;
}

export const calculateBaseGasCost = async (chain: ChainInfo): Promise<FeeData> => {
    if (standardEVM.includes(chain.name)) {
        // Usage of 21000 gas
        const provider = new ethers.providers.JsonRpcProvider(chain.rpcUrl);
        const {gasPrice, maxPriorityFeePerGas} = await provider.getFeeData();
        // @ts-ignore let the app blow up if gasPrice isn't available yolo
        const cost = BigNumber.from(21000).mul((gasPrice.add(maxPriorityFeePerGas)));
        return {
            // @ts-ignore
            gasPrice,
            // @ts-ignore
            maxPriorityFeePerGas,
            cost
        };
    } else {
        return {} as FeeData;
    }
};

export const calculateBridgeCost = async (originChain: ChainInfo, destinationChain: ChainInfo, to: string): Promise<FeeData | undefined> => {
    if (Connext.domainMap[originChain.name] &&  Connext.domainMap[destinationChain.name]) {
        return await connextGasCosts(originChain, destinationChain, to);
    }
    // getFeeDataAndGas()
    return {} as FeeData;
};