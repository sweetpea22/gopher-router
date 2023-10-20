import { AxelarAssetTransfer, Environment, SendTokenParams, AxelarQueryAPI,
  CHAINS } from "@axelar-network/axelarjs-sdk";
import * as Axelar from './axelarConfig'; 
import { ChainNames, getChain } from "@/app/constants";
import { FeeData } from "@/formulas/gasCosts";
import {ethers, BigNumber, Wallet} from "ethers";
import { ChainInfo } from "@/app/interfaces";

const api = new AxelarAssetTransfer({ environment: Environment.TESTNET });

const getSigner = () => {
  const privateKey = process.env.PRIVATE_KEY as string;
  return new Wallet(privateKey);
};

export async function getAxelarCost(originChain: ChainInfo, destinationChain: ChainInfo, to?: string): Promise<FeeData> {
  const axelarQuery = new AxelarQueryAPI({
    environment: Environment.TESTNET,
  });
  try {
    // get estimated cost
    const {fee} = await axelarQuery.getTransferFee(
      originChain.name,
      destinationChain.name,
      //assuming we're transferring ETH
      "eth-wei",
      1000000
    );
    if (!fee) {
      return {} as FeeData;
    }
    
    // create the transaction
    const provider = new ethers.providers.JsonRpcProvider(
      originChain.rpcUrl
    );
    const signer = getSigner().connect(provider);
    const requestOptions: SendTokenParams = {
      fromChain: originChain.name,
      toChain: destinationChain.name,
      destinationAddress: to as string,
      // todo map token string to symbol or denom
      asset: { symbol: "aUSDC" },
      //todo 
      amountInAtomicUnits: "5000000",
      options: {
        evmOptions: {
          signer,
          provider,
          txOptions: null as any,
          approveSendForMe: true,
        },
      },
    };

    // don't actually send it yet
    // api.sendToken(requestOptions)
  
    return {
      cost: BigNumber.from(fee.amount),
      maxPriorityFeePerGas: BigNumber.from(0),
      gasPrice: BigNumber.from(0)
    } as FeeData;
    
  } catch (err) {
    console.log(err);
    return {} as FeeData;
  }
}

