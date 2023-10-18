import { BigNumber } from "ethers";
import { createContext, useState } from "react";

interface ISlideOutContext {
    isOpen: boolean,
    setOpen: (state: boolean) => void
}
const defaultSlideOutContext: ISlideOutContext = {
    isOpen: false,
    setOpen: (state: boolean) => {}
}
export const SlideOutData = createContext<ISlideOutContext>(defaultSlideOutContext);
  
// @ts-ignore
export function SlideOutContext({children}) {
    const [isOpen, setOpen] = useState(false);

    return (
        <SlideOutData.Provider value={{ isOpen, setOpen }}>
            {children}
        </SlideOutData.Provider>
    )
}