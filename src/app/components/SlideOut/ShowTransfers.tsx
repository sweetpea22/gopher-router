import { Transfer } from '@/app/interfaces';
import React, { useContext, useEffect } from 'react';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import Button from '../Button';
import { BridgeType } from '@/formulas/gasCosts';
import { connextSend } from '@/formulas/bridges/connext/connextSend';
import { getChain } from '@/app/constants';
import { useAccount, useSendTransaction } from 'wagmi';
import { RouteData } from '@/app/context/transferRoute';
import { useEthersSigner } from '@/app/wagmi/ethers';
import { ethers } from 'ethers';

type Props = {
  transfers: Transfer[];
  loadingTransfers: boolean;
};

const ShowTransfers = ({transfers, loadingTransfers}: Props) => {
  const { address } = useAccount();
  const {destinationAddress, destinationChain} = useContext(RouteData);
  const signer = useEthersSigner();

  const handleExecute = async () => {
    for (let i=0; i < transfers.length; i ++) {
      const transfer = transfers[i];
      if (transfer.isBridged && transfer.feeData.bridgeType == BridgeType.connext) {
        const txData = await connextSend(
          transfer.chain,
          destinationChain,
          address as string,
          destinationAddress,
          transfer.amountToTransfer
        );
        console.log(transfer.feeData)
        console.log(ethers.utils.formatUnits(transfer.feeData.maxFeePerGas, "gwei"))
        console.log(ethers.utils.formatUnits(transfer.feeData.maxPriorityFeePerGas))
        const res = await signer?.sendTransaction({
          ...txData,
          // maxPriorityFeePerGas: transfer.feeData.maxPriorityFeePerGas,
          // maxFeePerGas: transfer.feeData.maxFeePerGas
        });
        console.log(res)
      }
    }
  }

  const renderTransfers = () => {
    if (loadingTransfers) {
      return (
        <div className='mt-4 flex flex-row items-center'><span> <ArrowPathIcon className='animate-spin text-indigo-400 h-6 w-6 mr-1' /></span><p>Fetching best possible transfers...</p></div>
      )
    } else if (transfers.length == 0) {
      return (
        <div>
          <p className='mt-2'>No routes available!</p>
        </div>
      )
    } else {
      return (
        <div className="">
          {/* Route Logic here */}
            {
              transfers.map((transfer, i) => {
                return (
                  <div key={i}>
                    <div className='grid grid-cols-2 place-items-stretch mt-3'>
                      <table>
                        <tbody>
                          <tr>
                            <td className='justify-self-start'>
                              <p className='text-gray-900'>{transfer.chain.name}</p>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <p className='text-gray-900 justify-self-end'>{destinationChain.name}</p>
                    </div>
                    <div className='flex flex-col'>
                      <p>Cost to transfer: {(transfer.feeData.cost.toNumber() / 10e18).toFixed(8) } ETH</p>
                      {transfer.isBridged ? 
                        <p>Bridge: {transfer.feeData.bridgeType}</p>
                        : null
                      }
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
      <div className='mt-2 px-5 py-6 shadow-xl rounded-lg bg-white ring-1 ring-gray-100'>
        <h3 className='font-medium font-lg'>Recommended Route</h3>
      {/* Route lines */}
      <div className="mt-8 relative flex flex-row items-center gap-x-1">
        <div className=''>
          <div className='bg-indigo-400 rounded-xl items-center flex h-4 w-4 flex-col'>
          </div>
        </div>
        <div
          className='h-[1.5px] top-4 bg-gradient-to-r from-indigo-500  w-[100%]'
        ></div>
        <div>
          <div className='bg-gray-200 rounded-xl items-center flex h-4 w-4 flex-col'>
          </div>
        </div>
      </div>
      {/* Route Info */}
        {renderTransfers()}
      </div>
      <Button className='w-full mt-4' onClick={handleExecute}>Execute</Button>
    </>
  )
};

export default ShowTransfers;
