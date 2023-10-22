"use client"

import { Transfer } from '../../interfaces';
import React, { useContext, useState } from 'react';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import Button from '../Button';
import { BridgeType } from '@/formulas/gasCosts';
import { connextSend } from '@/formulas/bridges/connext/connextSend';
import { useAccount, useBalance, useSwitchNetwork } from 'wagmi';
import { RouteData } from '@/app/context/transferRoute';
import { useEthersSigner } from '@/app/wagmi/ethers';
import { truncate } from '../TableContainers/NetworkBreakdown';
import { ethers } from 'ethers';
import { BalancesData } from '@/app/context/balances';
import { TokenNames, getToken } from '@/app/constants';

type Props = {
  transfers: Transfer[];
  loadingTransfers: boolean;
};

const ShowTransfers = ({transfers, loadingTransfers}: Props) => {
  const { address } = useAccount();
  const {destinationAddress, destinationChain, isToken} = useContext(RouteData);
  const {selected} = useContext(BalancesData);
  const signer = useEthersSigner();
  const { switchNetworkAsync } = useSwitchNetwork()

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleExecute = async () => {
    for (let i=0; i < transfers.length; i ++) {
      const transfer = transfers[i];
      if (!transfer.isBridged) {
        // regular tx
        // If ChainIds don't line up switch em out
        if (await signer?.getChainId() !== transfer.chain.chainId) {
          await switchNetworkAsync?.(transfer.chain.chainId);
        }
        if (isToken) {
          const token = getToken(selected as TokenNames);
          const tokenAddress = token.chainMap[transfer.chain.name];
          const abi = ["function transfer(address to, uint amount) returns (bool)"];
          const erc20 = new ethers.Contract(tokenAddress, abi, signer);
          const res = await erc20.transfer(destinationAddress, transfer.amountToTransfer)
        } else {
          const res = await signer?.sendTransaction({
            to: destinationAddress,
            value: transfer.amountToTransfer
          });
        }
      } else if (transfer.isBridged && transfer.feeData.bridgeType == BridgeType.connext) {
        const {txData} = await connextSend(
          transfer.chain,
          destinationChain,
          address as string,
          destinationAddress,
          transfer.amountToTransfer,
          isToken,
          selected as TokenNames
        );
        // lulz
        delete txData.from;
        // If ChainIds don't line up switch em out
        if (await signer?.getChainId() !== transfer.chain.chainId) {
          await switchNetworkAsync?.(transfer.chain.chainId);
        }
        const res = await signer?.sendTransaction(txData);
        setIsLoading(false);
      } else if (transfer.isBridged && transfer.feeData.bridgeType == BridgeType.axelar) {
        
      }
    }
  }

  const renderRelayerFee = ({feeData}: Transfer) => {
    const {relayerFee, cost} = feeData;
    if (relayerFee) {
      return (
        <div>
          <p>Gas costs: {ethers.utils.formatEther(cost.sub(relayerFee))} ETH</p>
          <p>Relayer fee: {ethers.utils.formatEther(relayerFee)} ETH</p>
        </div>
      )
    }
    return <></>
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
      console.log(transfer.amountToTransfer)
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
                      <p>Amount: {ethers.utils.formatEther(transfer.amountToTransfer)}</p>
                      <p>Cost: {ethers.utils.formatEther(transfer.feeData.cost)} ETH</p>
                      {renderRelayerFee(transfer)}
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
