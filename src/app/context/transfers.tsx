import { createContext, useState } from "react";
import { Transfer } from "../interfaces";

interface ITransferContext {
    transfers: Transfer[],
    setTransfers: (transfer: Transfer[]) => void;
    loadingTransfers: boolean;
    setLoadingTransfers: (state: boolean) => void;
}
const defaultTransferContext: ITransferContext = {
    transfers: [],
    setTransfers: (transfer: Transfer[]) => {},
    loadingTransfers: false,
    setLoadingTransfers: (state: boolean) => {},
}
export const TrasnferData = createContext<ITransferContext>(defaultTransferContext);
  
// @ts-ignore
export function TransferContext({children}) {
    const [transfers, setTransfers] = useState([] as Transfer[]);
    const [loadingTransfers, setLoadingTransfers] = useState(false);

    return (
        <TrasnferData.Provider value={{ transfers, setTransfers, loadingTransfers, setLoadingTransfers }}>
            {children}
        </TrasnferData.Provider>
    )
}