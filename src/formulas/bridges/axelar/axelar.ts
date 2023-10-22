import { Environment, SendTokenParams, AxelarQueryAPI,
  AxelarAssetTransfer } from "@axelar-network/axelarjs-sdk";
import * as Axelar from './axelarConfig'; 
import { BridgeType, FeeData } from "@/formulas/gasCosts";
import {ethers, BigNumber } from "ethers";
import { ChainInfo } from "@/app/interfaces";
import {
  IERC20__factory as IERC20,
} from "./types/factories/@axelar-network/axelar-gmp-sdk-solidity/contracts/interfaces";
import { wethMapping } from "@/app/constants";

export async function getAxelarCost(originChain: ChainInfo, destinationChain: ChainInfo, to: string, from: string): Promise<FeeData> {
  const axelarQuery = new AxelarQueryAPI({ environment: Environment.TESTNET });
  
  try {
    // @TODO - Deploy the contracts, this will error
    // @TODO - If we want to unwrap on the destination chain we will need to use GMP
    const originProvider = new ethers.providers.JsonRpcProvider(originChain.rpcUrl);
    
    // This is the fee paid to the relayer
    const relayerFeeWei = await axelarQuery.estimateGasFee(
      Axelar.domainMap[originChain.name], 
      Axelar.domainMap[destinationChain.name],
      'ETH',
      10000000,
    );

    const relayerFee = ethers.utils.parseUnits(relayerFeeWei as string, "wei");
    // Average gas cost for a transfer
    const gasUsed = ethers.utils.parseUnits("50000", "wei");

    const {maxFeePerGas, maxPriorityFeePerGas, gasPrice} = await originProvider.getFeeData();
    let cost: BigNumber;
    if (!maxPriorityFeePerGas) {
        // @ts-ignore let the app blow up if gasPrice isn't available yolo
        cost = BigNumber.from(gasUsed).mul(gasPrice).add(relayerFee);
    } else {
        // @ts-ignore let the app blow up if gasPrice isn't available yolo
        cost = BigNumber.from(gasUsed).mul((maxFeePerGas.add(maxPriorityFeePerGas))).add(BigNumber.from(relayerFee));
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


