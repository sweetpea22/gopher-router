
import { create } from "@connext/sdk";
import * as Connext from "../../bridges/connext/connnextConfig";
import {Logger} from "@connext/nxtp-utils"
import {ethers, BigNumber} from "ethers";
import { ChainInfo } from "@/app/interfaces";
import { FeeData } from "@/formulas/gasCosts";
import { wethMapping } from "@/app/constants";

export const connextGasCosts = async (originChain: ChainInfo, destinationChain: ChainInfo, to: string): Promise<FeeData> => {
    const originProvider = new ethers.providers.JsonRpcProvider(originChain.rpcUrl);
    const {sdkBase} = await create(Connext.sdkConfig, new Logger({name: "SDK", level:"silent"})); 
    const originDomain = Connext.domainMap[originChain.name];
    console.log('origin domain', originDomain)
    const destinationDomain = Connext.domainMap[destinationChain.name];
    const params = { originDomain, destinationDomain };
    // const relayerFee = await sdkBase.estimateRelayerFee(params);
    const xcallParams = {
        origin: originDomain,
        destination: destinationDomain,
        to,
        asset: wethMapping[originChain.name], // If Native Asset (eth) use wrapper for weth
        amount: "1", // override later, we can't know this yet until amountToSend is determined later
        slippage: "30", // maybe lower
        callData: "0x",
        delegate: Connext.sdkConfig.signerAddress,
        relayerFee: '1',
        wrapNativeOnOrigin: true,
        unwrapNativeOnDestination: true,
        };
    try {
        const xcallTxReq = await sdkBase.xcall(xcallParams);
        const gasUsed = await originProvider.estimateGas(xcallTxReq);
        const {maxFeePerGas, maxPriorityFeePerGas, gasPrice} = await originProvider.getFeeData();
        let cost: BigNumber;
        if (!maxPriorityFeePerGas) {
            // @ts-ignore let the app blow up if gasPrice isn't available yolo
            cost = BigNumber.from(gasUsed).mul(gasPrice);
        } else {
            // @ts-ignore let the app blow up if gasPrice isn't available yolo
            cost = BigNumber.from(gasUsed).mul((maxFeePerGas.add(maxPriorityFeePerGas)));
        }
        return {
            cost,
            // @ts-ignore
            maxFeePerGas,
            // @ts-ignore
            maxPriorityFeePerGas
        };
    } catch (e: any) {
        if(e.code == "UNPREDICTABLE_GAS_LIMIT") {
            // discard this tx, they don't have enough gas to make the transfer
            return {} as FeeData;
        } else {
            console.log("connext error", e);
            return {} as FeeData;
        }
    }
}
