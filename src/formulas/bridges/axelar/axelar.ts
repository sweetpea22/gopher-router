import { AxelarAssetTransfer, Environment, SendTokenParams, AxelarQueryAPI,
  CHAINS } from "@axelar-network/axelarjs-sdk";
import * as Axelar from './axelarConfig'; 
import { ChainNames, getChain } from "@/app/constants";
import { BridgeType, FeeData } from "@/formulas/gasCosts";
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

<<<<<<< HEAD
    const { gasPrice, maxPriorityFeePerGas } = await originProvider.getFeeData();
    
    // @ts-ignore let the app blow up if gasPrice isn't available yolo
    const cost = BigNumber.from(gasEstimate);
    // const cost = BigNumber.from(gasEstimate).mul((gasPrice.add(maxPriorityFeePerGas)));

=======
    const {maxFeePerGas, maxPriorityFeePerGas, gasPrice} = await originProvider.getFeeData();
    let cost: BigNumber;
    if (!maxPriorityFeePerGas) {
        // @ts-ignore let the app blow up if gasPrice isn't available yolo
        cost = BigNumber.from(gasUsed).mul(gasPrice);
    } else {
        // @ts-ignore let the app blow up if gasPrice isn't available yolo
        cost = BigNumber.from(gasUsed).mul((maxFeePerGas.add(maxPriorityFeePerGas)));
    }
>>>>>>> 2b21abd59f99df5bb4c6f74839eac7493492f45a
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
