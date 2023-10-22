
import { getTransferFee } from "./getTransferFee";
import {
  IERC20__factory as IERC20,
  IAxelarGateway__factory as IAxelarGateway,
} from "./types/factories/@axelar-network/axelar-gmp-sdk-solidity/contracts/interfaces";
import { wethMapping } from "@/app/constants";
import { Environment, AxelarAssetTransfer } from "@axelar-network/axelarjs-sdk";
import { ChainInfo } from "@/app/interfaces";
import { ethers, providers, getDefaultProvider } from "ethers";
import * as Axelar from './axelarConfig'; 

export const axelarSend = async (
  originChain: ChainInfo,
  destinationChain: ChainInfo,
  to: string,
  amount: string,
) => {
  const api = new AxelarAssetTransfer({ environment: Environment.TESTNET });

  let depositAddress: string;


  // need signers to instantiate the token contract, I think
  const originDomain = Axelar.domainMap[originChain.name];
  const destinationDomain = Axelar.domainMap[destinationChain.name];

  const originProvider = getDefaultProvider(originChain.rpcUrl);
  const originConnectedWallet = Axelar.getWallet().connect(originProvider);
  
  const destProvider = getDefaultProvider(destinationChain.rpcUrl);
  const destConnectedWallet = Axelar.getWallet().connect(destProvider);



  const srcGatewayContract = IAxelarGateway.connect(
    Axelar.gatewayMapping[originChain.name], // gateway contract
    originConnectedWallet
    );
    
    const destGatewayContract = IAxelarGateway.connect(
    Axelar.gatewayMapping[destinationChain.name], // gateway contract
    destConnectedWallet
  );


  // generate temporary address 
  depositAddress = await api.getDepositAddress(
    //@ts-ignore
    originDomain, 
    destinationDomain, 
    to, 
    'uausdc'
  );

  // connect to the token contracts on source and destination
  const srcTokenAddress = await wethMapping[originChain.name];
  const srcErc20 = IERC20.connect(srcTokenAddress, originConnectedWallet);

  const destinationTokenAddress = await destGatewayContract.tokenAddresses(
    "aUSDC"
  );
  
  const destERC20 = IERC20.connect(
    destinationTokenAddress,
    destConnectedWallet
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

// helpers
export function sleep(ms: number) {
  return new Promise((resolve) => {
      setTimeout(() => {
          resolve(null);
      }, ms);
  });
}

export function truncatedAddress(address: string): string {
  return (
    address.substring(0, 6) + "..." + address.substring(address.length - 4)
  );
}

