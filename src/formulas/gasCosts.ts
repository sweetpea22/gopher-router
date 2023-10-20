import {BigNumber, ethers} from "ethers";
import { ChainInfo } from "../app/interfaces";
import {ChainNames} from "../app/constants";
import * as Connext from "./bridges/connext/connnextConfig";
import { connextGasCosts } from "./bridges/connext/connext";
import * as Axelar from "./bridges/axelar/axelar";

// Populate list of common gas costs where available
const standardEVM = [ChainNames.ethereum, ChainNames.goerli, ChainNames.sepolia, ChainNames.opGoerli, ChainNames.scrollSepolia, ChainNames.mantle]; // assume 21000 gas

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
    const bridgeOptions = [];
    if (typeof Connext.domainMap[originChain.name] !== 'undefined' && typeof Connext.domainMap[destinationChain.name] !== 'undefined') {
        const option = await connextGasCosts(originChain, destinationChain, to);
        option ? bridgeOptions.push(option) : null;
    }

    // Sort
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