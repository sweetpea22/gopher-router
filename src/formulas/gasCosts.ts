import {BigNumber, ethers} from "ethers";
import { ChainInfo } from "../app/interfaces";
import {ChainNames} from "../app/constants";

// Populate list of common gas costs where available
const standardEVM = [ChainNames.ETHEREUM, ChainNames.GOERLI, ChainNames.SEPOLIA]; // assume 21000 gas

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

const getFeeDataAndGas = async (chain: ChainInfo, contractAddress: string, methodName: string, params: any[], abi: []) => {
    const provider = new ethers.providers.JsonRpcProvider(chain.rpcUrl);
    const {gasPrice, maxPriorityFeePerGas} = await provider.getFeeData();
    const contract = new ethers.Contract(contractAddress, abi, provider);
    const gasUsed = await contract.estimateGas[methodName](...params);
    // @ts-ignore let the app blow up if gasPrice isn't available yolo
        const cost = BigNumber.from(gasUsed).mul((gasPrice.add(maxPriorityFeePerGas)));
}

export const calculateBridgeCost = async (chain: ChainInfo): Promise<FeeData> => {
    // getFeeDataAndGas()
    return {} as FeeData;
};