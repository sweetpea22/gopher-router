"use client"

import { createContext, useState } from "react";
import { TokenNames } from "../constants";
import { AccountDetails, TokenBalance } from "../interfaces";

type TokenBalances = {[name in string | TokenNames]: TokenBalance[]}; 
interface IBalancesContext {
    selected: string | TokenNames;
    setSelected: (name: string | TokenNames) => void,
    tokenBalances: TokenBalances,
    setTokenBalances: (state: TokenBalances) => void,
    ethBalance: AccountDetails[],
    setEthBalance: (state: AccountDetails[]) => void
}
const deafultBalancesContext: IBalancesContext = {
    selected: "eth",
    setSelected: (name: string | TokenNames) => {},
    tokenBalances: {} as TokenBalances,
    setTokenBalances: (state: TokenBalances) => {},
    ethBalance: {} as AccountDetails[],
    setEthBalance: (state: AccountDetails[]) => {}
}
export const BalancesData = createContext<IBalancesContext>(deafultBalancesContext);
  
// @ts-ignore
export function BalancesContext({children}) {
    const [tokenBalances, setTokenBalances] = useState({} as TokenBalances);
    const [ethBalance, setEthBalance] = useState({} as AccountDetails[]);
    const [selected, setSelected] = useState("eth");

    return (
        <BalancesData.Provider value={{ tokenBalances, setTokenBalances, ethBalance, setEthBalance, selected, setSelected }}>
            {children}
        </BalancesData.Provider>
    )
}