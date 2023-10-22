import { Environment, SendTokenParams, AxelarQueryAPI,
  AxelarAssetTransfer } from "@axelar-network/axelarjs-sdk";
import * as Axelar from './axelarConfig'; 
import { BridgeType, FeeData } from "@/formulas/gasCosts";
import {ethers, BigNumber } from "ethers";
import { ChainInfo } from "@/app/interfaces";


export async function getAxelarCost(originChain: ChainInfo, destinationChain: ChainInfo, to?: string): Promise<FeeData> {
  const axelarQuery = new AxelarQueryAPI({ environment: Environment.TESTNET });
  
  try {
    // @TODO - Deploy the contracts, this will error
    // @TODO - If we want to unwrap on the destination chain we will need to use GMP
    const originProvider = new ethers.providers.JsonRpcProvider(originChain.rpcUrl);
    
    // only estimates gas for ETH
    const gasEstimate = await axelarQuery.estimateGasFee(
    Axelar.domainMap[originChain.name], Axelar.domainMap[destinationChain.name],
    'ETH',
    3000000,
    )

    const {maxFeePerGas, maxPriorityFeePerGas, gasPrice} = await originProvider.getFeeData();
    let cost: BigNumber;
    if (!maxPriorityFeePerGas) {
        // @ts-ignore let the app blow up if gasPrice isn't available yolo
        cost = BigNumber.from(gasEstimate).mul(gasPrice);
    } else {
        // @ts-ignore let the app blow up if gasPrice isn't available yolo
        cost = BigNumber.from(gasEstimate).mul((maxFeePerGas.add(maxPriorityFeePerGas)));
    }
    return {
      cost,
      maxFeePerGas: BigNumber.from(0),
      maxPriorityFeePerGas: BigNumber.from(0),
      bridgeType: BridgeType.axelar
    }
    
  } catch (err) {
    console.log("Axelar error: ", err);
    return {} as FeeData;
  }
}


