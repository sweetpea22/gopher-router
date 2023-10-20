import { AxelarAssetTransfer, Environment, SendTokenParams, AxelarQueryAPI,
  CHAINS } from "@axelar-network/axelarjs-sdk";
import * as Axelar from './axelarConfig'; 
import { ChainNames, getChain } from "@/app/constants";
import { FeeData } from "@/formulas/gasCosts";
import {ethers, BigNumber, Wallet} from "ethers";
import { ChainInfo } from "@/app/interfaces";
import { jumpContractAbi } from "./jumpContract";

const api = new AxelarAssetTransfer({ environment: Environment.TESTNET });

const getSigner = () => {
  const privateKey = process.env.PRIVATE_KEY as string;
  return new Wallet(privateKey);
};

export async function getAxelarCost(originChain: ChainInfo, destinationChain: ChainInfo, to?: string): Promise<FeeData> {
  const axelarQuery = new AxelarQueryAPI({environment: Environment.TESTNET});
  const symbol = "eth-wei";
  // need to convert
  const amount = ethers.utils.parseUnits("1", "ether");
  try {
    // get estimated cost
    const { fee } = await axelarQuery.getTransferFee(
      originChain.name,
      destinationChain.name,
      //assuming we're transferring ETH
      symbol,
      1,
    );
    
    if (!fee) {
      return {} as FeeData;
    }
    console.log(fee?.amount); // returns 140000000

      

    // @TODO - Deploy the contracts, this will error
    // @TODO - If we want to unwrap on the destination chain we will need to use GMP
    const originProvider = new ethers.providers.JsonRpcProvider(originChain.rpcUrl);
    const jumpContractAddress = Axelar.axlJumpContractMapping[originChain.name];
    const jumpContract = new ethers.Contract(jumpContractAddress, jumpContractAbi, originProvider);

    // function sendEth(string memory _destChain, string memory _destAddress, string memory _symbol) public payable {
    
    const gasUsed = await jumpContract.estimateGas.sendEth(
      Axelar.domainMap[destinationChain.name],
      to,
      symbol,
      { amount: amount }
    );

    const { gasPrice, maxPriorityFeePerGas } = await originProvider.getFeeData();
    
    // @ts-ignore let the app blow up if gasPrice isn't available yolo
    const cost = BigNumber.from(gasUsed).mul((gasPrice.add(maxPriorityFeePerGas)));

    return {
      cost: cost,
      maxPriorityFeePerGas: BigNumber.from(0),
      gasPrice: BigNumber.from(0)
    } as FeeData;
    
  } catch (err) {
    console.log(err);
    return {} as FeeData;
  }
}