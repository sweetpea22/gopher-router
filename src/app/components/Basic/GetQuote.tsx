/* eslint-disable react-hooks/rules-of-hooks */
"use client"

import { useAccount, useFeeData } from 'wagmi';
import { standardButton } from '@/app/styles/styles';

export default function getQuote() {
  const { data: feeData, isError: feeDataError, isLoading: feeDataLoading } = useFeeData({formatUnits: 'gwei', watch: true})
  const { address, isConnected } = useAccount();

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
          { renderLoading() }
        </>
      )
    }
    return (
      <div className="">
        <p className='text-gray-900'>{JSON.stringify(feeData?.formatted.gasPrice)}</p>
      </div>
    )
  }

  return (
    <div className='flex flex-col items-center shadow-md p-4 bg-gray-100 rounded-xl'>
      <button
        onClick={() => {console.log('hi')}}
        type='button'
        className={`${standardButton} w-[150px] my-5`}>
        Get quotes
      </button>
      <div className='flex flex-col text-gray-900 text-center items-center my-8 gap-2'>
        GasPrice:
        {renderGasPrice()}
      </div>
    </div>

  );
}