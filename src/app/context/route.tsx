import { BigNumber } from "ethers";
import { createContext, useState } from "react";
import { Chain } from "wagmi";
import { ChainInfo } from "../interfaces";
import * as constants  from '../constants';

interface IRouteContext {
    destinationAddress: string,
    setDestinationAddress: (address: string) => void,
    etherAmount: BigNumber,
    setEtherAmount: (amount: BigNumber) => void,
    destinationChain: ChainInfo,
    setDestinationChain: (chain: ChainInfo) => void
}
const defaultRouteContext: IRouteContext = {
    destinationAddress: "",
    setDestinationAddress: (address: string) => {},
    etherAmount: BigNumber.from(0),
    setEtherAmount: (amount: BigNumber) => {},
    destinationChain: constants.Chains[0],
    setDestinationChain: (chain: ChainInfo) => {},
}
export const RouteData = createContext<IRouteContext>(defaultRouteContext);
  
// @ts-ignore
export function RouteContext({children}) {
    const [destinationAddress, setDestinationAddress] = useState("");
    const [etherAmount, setEtherAmount] = useState(BigNumber.from(0));
    const [destinationChain, setDestinationChain] = useState(constants.Chains[0]);

    return (
        <RouteData.Provider value={{ 
            destinationAddress, 
            setDestinationAddress, 
            etherAmount, 
            setEtherAmount, 
            destinationChain, 
            setDestinationChain
        }}>
            {children}
        </RouteData.Provider>
    )
}