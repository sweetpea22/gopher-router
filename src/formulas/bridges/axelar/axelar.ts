import { AxelarAssetTransfer, Environment,   AxelarQueryAPI,
  CHAINS } from "@axelar-network/axelarjs-sdk";
import * as Axelar from './axelarConfig'; 
import { ChainNames, getChain } from "@/app/constants";
import { FeeData } from "@/formulas/gasCosts";
import {ethers, BigNumber} from "ethers";
import { ChainInfo } from "@/app/interfaces";


// const axelarAssetTransfer = new AxelarAssetTransfer({
//   environment: Environment.TESTNET,
// });


export async function getAxelarCost(originChain: ChainInfo, destinationChain: ChainInfo, to?: string) {
  const axelarQuery = new AxelarQueryAPI({
    environment: Environment.TESTNET,
  });
  try {
    const originProvider = new ethers.providers.JsonRpcProvider(originChain.rpcUrl);
    const fee = await axelarQuery.getTransferFee(
        originChain.name,
        destinationChain.name,
        //assuming we're transferring ETH
        "eth-wei",
        1000000
      );
      return Object.values(fee)[0]["amount"]

  } catch (err) {
    console.log(err);
  }
}

// getAxelarCost(getChain('goerli'), getChain('optimism'));