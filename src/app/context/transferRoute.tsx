"use client"

import { BigNumber } from "ethers";
import { createContext, useState } from "react";
import { ChainInfo } from "../interfaces";

interface IRouteContext {
    destinationAddress: string,
    setDestinationAddress: (address: string) => void,
    etherAmount: BigNumber,
    setEtherAmount: (amount: BigNumber) => void,
    destinationChain: ChainInfo,
    setDestinationChain: (chain: ChainInfo) => void,
    isToken: boolean,
    setIsToken: (x: boolean) => void,
}
const defaultRouteContext: IRouteContext = {
    destinationAddress: "",
    setDestinationAddress: (address: string) => {},
    etherAmount: BigNumber.from(0),
    setEtherAmount: (amount: BigNumber) => {},
    destinationChain: {} as ChainInfo,
    setDestinationChain: (chain: ChainInfo) => {},
    isToken: false,
    setIsToken: (x: boolean) => {},
}
export const RouteData = createContext<IRouteContext>(defaultRouteContext);
  
// @ts-ignore
export function RouteContext({children}) {
    const [destinationAddress, setDestinationAddress] = useState("");
    const [etherAmount, setEtherAmount] = useState(BigNumber.from(0));
    const [destinationChain, setDestinationChain] = useState({} as ChainInfo);
    const [isToken, setIsToken] = useState(false);

    return (
        <RouteData.Provider value={{ 
            destinationAddress, 
            setDestinationAddress, 
            etherAmount, 
            setEtherAmount, 
            destinationChain, 
            setDestinationChain,
            isToken,
            setIsToken,
        }}>
            {children}
        </RouteData.Provider>
    )
}