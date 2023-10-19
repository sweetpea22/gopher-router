import { create } from "@connext/sdk";
import * as Connext from "../../bridges/connext/connnextConfig";
import {Logger} from "@connext/nxtp-utils"
import {ethers, BigNumber} from "ethers";
import { ChainInfo } from "@/app/interfaces";
import { FeeData } from "@/formulas/gasCosts";

export const connextGasCosts = async (originChain: ChainInfo, destinationChain: ChainInfo, to: string): Promise<FeeData> => {
    const originProvider = new ethers.providers.JsonRpcProvider(originChain.rpcUrl);
    const {sdkBase} = await create(Connext.sdkConfig, new Logger({name: "SDK", level:"silent"})); 
    const originDomain = Connext.domainMap[originChain.name];
    const destinationDomain = Connext.domainMap[destinationChain.name];
    const params = { originDomain, destinationDomain };
    const relayerFee = await sdkBase.estimateRelayerFee(params);
    const xcallParams = {
        origin: originDomain,
        destination: destinationDomain,
        to,
        asset: Connext.wethMapping[originChain.name],
        amount: "1", // override later, we can't know this yet until amountToSend is determined later
        slippage: "30", // maybe lower
        callData: "0x",
        delegate: Connext.sdkConfig.signerAddress,
        relayerFee: relayerFee.toString(),
        wrapNativeOnOrigin: true,
        unwrapNativeOnDestination: true,
        };
    try {
        const xcallTxReq = await sdkBase.xcall(xcallParams);
        const gasUsed = await originProvider.estimateGas(xcallTxReq);
        const {gasPrice, maxPriorityFeePerGas} = await originProvider.getFeeData();
        // @ts-ignore let the app blow up if gasPrice isn't available yolo
        const cost = BigNumber.from(gasUsed).mul((gasPrice.add(maxPriorityFeePerGas)));
        return {
            cost,
            // @ts-ignore
            gasPrice,
            // @ts-ignore
            maxPriorityFeePerGas
        };
    } catch (e: any) {
        console.log(e.code == "UNPREDICTABLE_GAS_LIMIT")
    }


}