import * as Connext from "./connnextConfig";
import { create } from "@connext/sdk";
import { BigNumber } from "ethers";
import { ethers } from "ethers";
import { ChainInfo } from "@axelar-network/axelarjs-sdk";
import { getCallParams } from "./connext";
import "dotenv/config"
import { getChain } from "@/app/constants";

let signer = new ethers.Wallet(process.env.PRIVATE_KEY || '');

const provider = new ethers.providers.JsonRpcProvider(getChain('goerli').rpcUrl);
signer = signer.connect(provider);


export async function sendViaConnext(originChain: ChainInfo, destinationChain: ChainInfo, to: string) {
  // change this to getSigner() or useAccount();
  const signerAddress = Connext.sdkConfig.signerAddress;

  const { sdkBase } = await create(Connext.sdkConfig);

  // get xcall params from a function getCallParams
  // Prepare the xcall params

  // @ts-ignore
  const data = await getCallParams(originChain, destinationChain, to)
  console.log(data);

  // Approve the asset transfer if the current allowance is lower than the amount.
  // Necessary because funds will first be sent to the Connext contract in xcall.
  const approveTxReq = await sdkBase.approveIfNeeded(
    Connext.domainMap.originChain,
    Connext.domainMap.destinationChain,
    // i hardcoded the amount to 0.01 eth 
    '10000000000000000'
  )
  
  if (approveTxReq) {
    // need a signer
    const approveTxReceipt = await signer.sendTransaction(approveTxReq);
    await approveTxReceipt.wait();
  }
  
  // Send the xcall
  const xcallTxReq = await sdkBase.xcall(data);
  xcallTxReq.gasLimit = BigNumber.from("20000000"); 
  const xcallTxReceipt = await signer.sendTransaction(xcallTxReq);
  console.log(xcallTxReceipt);
  await xcallTxReceipt.wait();

}
// @ts-ignore
sendViaConnext(getChain('goerli'), getChain('opGoerli'), '0x7d78A8bF127410DBEeaCEF3E3991E802dB46bd03')