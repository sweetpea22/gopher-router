import { BigNumber } from "ethers";
import { ReactNode, createContext, useState } from "react";

interface IRouteContext {
    destinationAddress: string,
    setDestinationAddress: (address: string) => void,
    etherAmount: BigNumber,
    setEtherAmount: (amount: BigNumber) => void,
}
const defaultRouteContext: IRouteContext = {
    destinationAddress: "",
    setDestinationAddress: (address: string) => {},
    etherAmount: BigNumber.from(0),
    setEtherAmount: (amount: BigNumber) => {},
}
export const RouteData = createContext<IRouteContext>(defaultRouteContext);
  
// @ts-ignore
export function RouteContext({children}) {
    const [destinationAddress, setDestinationAddress] = useState("");
    const [etherAmount, setEtherAmount] = useState(BigNumber.from(0));

    return (
        <RouteData.Provider value={{ destinationAddress, setDestinationAddress, etherAmount, setEtherAmount }}>
            {children}
        </RouteData.Provider>
    )
}