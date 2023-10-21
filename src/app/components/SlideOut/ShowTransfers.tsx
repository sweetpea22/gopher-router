import { Transfer } from '@/app/interfaces';
import React from 'react';
import { ethers } from "ethers";

type Props = {
  transfers: Transfer[];
  loadingTransfers: boolean;
  destinationChain: string;
};

const ShowTransfers = ({transfers, loadingTransfers, destinationChain}: Props) => {
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
            {
              transfers.map((transfer, i) => {
                return (
                  <div key={i}>
                    <div className='grid grid-cols-2 place-items-stretch mt-3'>
                      <td className='justify-self-start'>
                              <p className='text-gray-900'>{transfer.chain.name}</p>
                      </td>
                      <p className='text-gray-900 justify-self-end'>{destinationChain}</p>
                    </div>
                    <div className='flex flex-col'>
                      <p>Amount to transfer: {ethers.utils.formatUnits(transfer.amountToTransfer) }</p>
                      <p>Cost to transfer: ${transfer.feeData.cost.toString()}</p>
                      <p>Bridged TX: {transfer.isBridged ? "Yes":"No"}</p>
                    </div>
                  </div>
                ) 
              })
            }
        </div>
      )
    }
  }
  return (
    <>
      {/* Route lines */}
      <div className=" mt-12 relative flex flex-row items-center gap-x-1">
        <div className=''>
          <div className='bg-gray-200 rounded-xl items-center flex h-4 w-4 flex-col'>
          </div>
        </div>
        <div
          className='h-[1.5px] top-4 bg-gray-200 w-[100%]'
        ></div>
        <div>
          <div className='bg-gray-200 rounded-xl items-center flex h-4 w-4 flex-col'>
          </div>
        </div>
      </div>

      {/* Route Info */}
      {renderTransfers()}
    </>
  )
};

export default ShowTransfers;
