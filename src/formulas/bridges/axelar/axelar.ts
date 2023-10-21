import { AxelarAssetTransfer, Environment, SendTokenParams, AxelarQueryAPI,
  CHAINS } from "@axelar-network/axelarjs-sdk";
import * as Axelar from './axelarConfig'; 
import { ChainNames, getChain } from "@/app/constants";
import { FeeData } from "@/formulas/gasCosts";
import {ethers, BigNumber, Wallet} from "ethers";
import { ChainInfo } from "@/app/interfaces";

export async function getAxelarCost(originChain: ChainInfo, destinationChain: ChainInfo, to?: string): Promise<FeeData> {
  const axelarQuery = new AxelarQueryAPI({ environment: Environment.TESTNET });
  
  try {
    // @TODO - Deploy the contracts, this will error
    // @TODO - If we want to unwrap on the destination chain we will need to use GMP
    const originProvider = new ethers.providers.JsonRpcProvider(originChain.rpcUrl);

    const gasEstimate = await axelarQuery.estimateGasFee(
    Axelar.domainMap[originChain.name], Axelar.domainMap[destinationChain.name],
    'WETH',
    3000000,
    )

    const { gasPrice, maxPriorityFeePerGas } = await originProvider.getFeeData();
    
    // @ts-ignore let the app blow up if gasPrice isn't available yolo
    const cost = BigNumber.from(gasEstimate);
    // const cost = BigNumber.from(gasEstimate).mul((gasPrice.add(maxPriorityFeePerGas)));

    return {
      cost: cost,
      maxPriorityFeePerGas: BigNumber.from(0),
      gasPrice: BigNumber.from(0)
    } as FeeData;
    
  } catch (err) {
    console.log("Axelar error: ", err);
    return {} as FeeData;
  }
}
