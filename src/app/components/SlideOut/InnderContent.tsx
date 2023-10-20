import { RouteData } from "@/app/context/route";
import { TrasnferData } from "@/app/context/transfers";
import { useContext, useState } from "react";
import ShowTransfers from "./ShowTransfers";
import TxOverview from "./TxOverview";

export function InnerContent() {
  const {destinationAddress, etherAmount, destinationChain} = useContext(RouteData);
  const {transfers, loadingTransfers} = useContext(TrasnferData);

  
  
  return (
    <div>
      <TxOverview destinationAddress={destinationAddress} etherAmount={etherAmount.toString()} destinationChain={destinationChain} />
      
      <ShowTransfers transfers={transfers} loadingTransfers={loadingTransfers} destinationChain={destinationChain.name} />
 
    </div>
  )
}