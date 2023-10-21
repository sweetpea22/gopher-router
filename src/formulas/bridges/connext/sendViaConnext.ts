
import * as Connext from "./connnextConfig";
import { create } from "@connext/sdk";
import { BigNumber } from "ethers";
import { ethers } from "ethers";
import { ChainInfo } from "@/app/interfaces";
// import { getCallParams } from "./connext";
import "dotenv/config"
import { wethMapping } from "@/app/constants";


const privateKey = process.env.NEXT_PUBLIC_PRIVATE_KEY as string;
const INFURA_API_KEY = process.env.NEXT_PUBLIC_INFURA_API_KEY as string;


export async function sendViaConnext(originChain: ChainInfo, destinationChain: ChainInfo, to: string) {
  
  let signer = new ethers.Wallet(privateKey);
  
  const provider = new ethers.providers.JsonRpcProvider(`https://goerli.infura.io/v3/${INFURA_API_KEY}`);
  
  signer = signer.connect(provider);

  const { sdkBase } = await create(Connext.sdkConfig);

    const originDomain = Connext.domainMap[originChain.name];
    const destinationDomain = Connext.domainMap[destinationChain.name];
  
    const relayerFee = (
    await sdkBase.estimateRelayerFee({
      originDomain, 
      destinationDomain
    })
    ).toString();

    const xcallParams = {
      origin: originDomain,
      destination: destinationDomain,
      to,
      asset: wethMapping[originChain.name], // If Native Asset (eth) use wrapper for weth
      amount: "1", // override later, we can't know this yet until amountToSend is determined later
      slippage: "30", // maybe lower
      callData: "0x",
      delegate: Connext.sdkConfig.signerAddress,
      relayerFee: relayerFee,
      wrapNativeOnOrigin: true,
      unwrapNativeOnDestination: true,
  };
  
  // Approve the asset transfer if the current allowance is lower than the amount.
  // Necessary because funds will first be sent to the Connext contract in xcall.
  const approveTxReq = await sdkBase.approveIfNeeded(
    originDomain,
    destinationDomain,
    // i hardcoded the amount to 0.01 eth 
    '10000000000000000'
  )
  
  if (approveTxReq) {
    // need a signer
    const approveTxReceipt = await signer.sendTransaction(approveTxReq);
    await approveTxReceipt.wait();
  }
  
  // Send the xcall
  const xcallTxReq = await sdkBase.xcall(xcallParams);
  xcallTxReq.gasLimit = BigNumber.from("30000000"); 
  const xcallTxReceipt = await signer.sendTransaction(xcallTxReq);
  console.log('receipt built:', xcallTxReceipt);
  await xcallTxReceipt.wait();
}
