import { RouteData } from "@/app/context/route";
import { TrasnferData } from "@/app/context/transfers";
import { ethers } from "ethers";
import { useContext, useState } from "react";

export function InnerContent() {
  const {destinationAddress, etherAmount} = useContext(RouteData);
  const {transfers, loadingTransfers} = useContext(TrasnferData);

  const renderTransfers = () => {
    if (loadingTransfers) {
      return (
        <p>Fetching best possible transfers...</p>
      )
    } else if (transfers.length == 0) {
      return (
        <p>No routes available!</p>
      )
    } else {
      return (
        <div className="">
          <p>---Transfer Options---</p>
          {/* Route Logic here */}
          {transfers.map((transfer, i) => {
            return (
              <div key={transfer.chain.name + transfer.amountToTransfer?.toString()}>
                <p>Transfer #{i}</p>
                <p>{transfer.chain.name}</p>
                <p>Amount to transfer: {ethers.utils.formatUnits(transfer.amountToTransfer) }</p>
                <p>Cost to transfer: ${transfer.cost.toString()}</p>
                <p>Bridged TX: {transfer.isBridged ? "Yes":"No"}</p>
                <br/>
              </div>
            )
          })}
        </div>
      )
      }
  }

  return (
    <div>
      <p>Destination Address: {destinationAddress}</p>
      <p>Ether Amount: {etherAmount.toString()}</p>
      <div>
        <br/>
        {renderTransfers()}
      </div>
    </div>
  )
}