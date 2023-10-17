/* eslint-disable react-hooks/rules-of-hooks */
"use client"

import { useAccount, useFeeData } from 'wagmi';
import { standardButton } from '@/app/styles/styles';
import InputFields from './InputFields';
import { getAllBalances } from '@/formulas/utils';
import { useEffect, useState } from 'react';
import { formatEther } from 'ethers/lib/utils';

export default function getQuote() {
  const { data: feeData, isError: feeDataError, isLoading: feeDataLoading } = useFeeData({ formatUnits: 'gwei', watch: true })
  

  const renderLoading = () => {
    if (!feeDataLoading) {
      return null;
    }
    return (
      <div>
        Processing...
      </div>
    )
  }

  const renderGasPrice = () => {
    if (!feeData) {
      return (
        <>
          {renderLoading()}
        </>
      )
    }
    return (
      <div className="">
        <p className='text-gray-900'>{JSON.stringify(feeData?.formatted.gasPrice)}</p>
      </div>
    )
  }

  const { address } = useAccount();
  const [balances, setBalances] = useState<any>([]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const chains = [{ name: "Goerli", rpcUrl: "https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161" }, { name: "Sepolia", rpcUrl: "https://sepolia.infura.io/v3/5db0726c373b4e99a389e664e4db0d94" }]

  
  useEffect(() => {
    const getBalanceByChain = async () => {
      const data = await getAllBalances(address as string, chains)
      setBalances(data);
    }
    getBalanceByChain();
  }, [address, chains])

  return (
    <div className='flex flex-col items-center shadow-md p-4 bg-gray-100 rounded-xl'>
      {/* <InputFields /> */}

      <div className='shadow-lg rounded-xl py-3 px-5'>
        <h2 className='text-gray-800 '>Cumulative Balance</h2>
        <div>
          {balances ? balances.map((item:any, index:number) => (
            <p className='text-indigo-500' key={index}>{item.chain.name}: <strong>{formatEther(item.balance)} ETH</strong></p>
          )) : null}
        </div>
      </div>

      <button
        onClick={() => {console.log('hi')}}
        type='button'
        className={`${standardButton} w-[150px] my-5`}>
        Get quotes
      </button>
      <div className='flex flex-col text-gray-900 text-center items-center my-8 gap-2'>
        Current Gas Price (Gwei):
        {renderGasPrice()}
      </div>
    </div>

  );
}