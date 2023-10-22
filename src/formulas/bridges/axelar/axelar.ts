import { Environment, SendTokenParams, AxelarQueryAPI,
  AxelarAssetTransfer } from "@axelar-network/axelarjs-sdk";
import * as Axelar from './axelarConfig'; 
import { BridgeType, FeeData } from "@/formulas/gasCosts";
import {ethers, BigNumber, providers} from "ethers";
import { ChainInfo } from "@/app/interfaces";
import { Chains } from "@/app/constants";
import { getTransferFee } from "./getTransferFee";
import {
  IERC20__factory as IERC20,
  IAxelarGateway__factory as IAxelarGateway,
} from "./types/factories/@axelar-network/axelar-gmp-sdk-solidity/contracts/interfaces";
import { toASCII } from "punycode";

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

    console.log(gasEstimate)

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

// test this out

//@ts-ignore
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();

const srcGatewayContract = IAxelarGateway.connect(
  Axelar.gatewayMapping['ethereum-2'],
  signer
);
const destGatewayContract = IAxelarGateway.connect(
  Axelar.gatewayMapping['optimism'],
  signer
);

export function sleep(ms: number) {
  return new Promise((resolve) => {
      setTimeout(() => {
          resolve(null);
      }, ms);
  });
}



export const axelarSend = async (
  originChain: ChainInfo, destinationChain: ChainInfo, to: string, amount:string, onSent?: (data: {
    txHash: string;
    depositAddress: string;
    transferFee: number;
  }) => void
) => {
  const api = new AxelarAssetTransfer({ environment: Environment.TESTNET });

  let depositAddress: string;

  const originDomain = Axelar.domainMap[originChain.name];
  const destinationDomain = Axelar.domainMap[destinationChain.name];
  console.log(originDomain);

  // generate temporary address 
  depositAddress = await api.getDepositAddress(
    //@ts-ignore
    originDomain, 
    destinationDomain, 
    to, 
    'eth-wei'
  );


  // connect to the token contracts on source and destination
  const srcTokenAddress = await srcGatewayContract.tokenAddresses("aUSDC");
  const srcErc20 = IERC20.connect(srcTokenAddress, signer);

  const destinationTokenAddress = await destGatewayContract.tokenAddresses(
    "aUSDC"
  );
  
  const destERC20 = IERC20.connect(
    destinationTokenAddress,
    signer
  );

  const destBalance = await destERC20.balanceOf(to);

  // getTransferFee
  const transferFee: number = await getTransferFee(
    originDomain,
    destinationDomain,
    "aUSDC",
    amount = '1'
  );

  try {
  
    const txHash = await srcErc20
      .transfer(depositAddress, ethers.utils.parseUnits(amount, 6))
      .then((tx: any) => tx.wait())
      .then((receipt: any) => receipt.transactionHash);
    
    while (true) {
      const newBalance = await destERC20.balanceOf(to);
      if (!destBalance.eq(newBalance)) break;
      await sleep(2000);
    }
    return txHash;



    } catch (e: any) {
        console.log("connext error", e);
        return {} as providers.TransactionRequest;
    }
}
const cb = (data:  {
    txHash: string;
    depositAddress: string;
    transferFee: number;
  }) => { console.log(data) };
  
axelarSend(Chains[0], Chains[2], '0x90F79bf6EB2c4f870365E785982E1f101E93b906', '5', cb)