import { create } from "@connext/sdk";
import * as Connext from "./connnextConfig";
import {ethers, BigNumber, providers} from "ethers";
import { ChainInfo } from "@/app/interfaces";
import { FeeData } from "@/formulas/gasCosts";
import { wethMapping } from "@/app/constants";
import { Logger } from "@connext/nxtp-utils";

export const connextSend = async (
    originChain: ChainInfo, 
    destinationChain: ChainInfo, 
    from: string,
    to: string,
    amount: BigNumber
): Promise<providers.TransactionRequest> => {
    const originProvider = new ethers.providers.JsonRpcProvider(originChain.rpcUrl);
    const {sdkBase} = await create(Connext.sdkConfig);
    const originDomain = Connext.domainMap[originChain.name];
    const destinationDomain = Connext.domainMap[destinationChain.name];
    const params = { originDomain, destinationDomain };
    const relayerFee = await sdkBase.estimateRelayerFee(params);
    const xcallParams = {
        origin: originDomain,
        destination: destinationDomain,
        to,
        asset: wethMapping[originChain.name], // If Native Asset (eth) use wrapper for weth
        amount: amount.toString(), // override later, we can't know this yet until amountToSend is determined later
        slippage: "30", // maybe lower
        callData: "0x",
        delegate: from,
        relayerFee: relayerFee.toString(),
        wrapNativeOnOrigin: true,
        unwrapNativeOnDestination: true,
        };
    try {
        return await sdkBase.xcall(xcallParams);
    } catch (e: any) {
        console.log("connext error", e);
        return {} as providers.TransactionRequest;
    }
}