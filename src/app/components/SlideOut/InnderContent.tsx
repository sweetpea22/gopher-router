import { RouteData } from "@/app/context/transferRoute";
import { TrasnferData } from "@/app/context/transfers";
import { useContext } from "react";
import ShowTransfers from "./ShowTransfers";
import TxOverview from "./TxOverview";

export function InnerContent() {
  const {destinationAddress, etherAmount, destinationChain} = useContext(RouteData);
  const { transfers, loadingTransfers } = useContext(TrasnferData);

  
  return (
    <div>
      <TxOverview destinationAddress={destinationAddress} etherAmount={etherAmount.toString()} destinationChain={destinationChain} />
      
      <ShowTransfers transfers={transfers} loadingTransfers={loadingTransfers} destinationChain={destinationChain.name} />
 
    </div>
  )
}