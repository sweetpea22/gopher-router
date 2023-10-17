/* eslint-disable react-hooks/rules-of-hooks */
"use client"

import { useAccount, useFeeData } from 'wagmi';
import { standardButton } from '@/app/styles/styles';

export default function getQuote() {
   const { data: feeData, isError: feeDataError, isLoading: feeDataLoading } = useFeeData()
  // const [transfers, setTransfers] = useState<Transfer[]>([])
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

  // only use this 
   const renderSuccess = () => {
    if (!feeData) {
      return null;
    }
    return (
      <div className="flex flex-col items-center">
        <div>
          Proof successfully submitted to Axiom. Proof can take 1-3 minutes to generate...
        </div>
      </div>
    )
  }

  const renderQuotes = () => {
    if (!feeData) {
      return (
        <>
          { renderLoading() }
          { renderSuccess() }
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
    <div className='flex flex-col shadow-md p-4 bg-gray-100 rounded-xl'>
      <button
        onClick={() => {console.log('hi')}}
        type='button'
        className={`${standardButton} my-5`}>
        Get quotes
      </button>
      <div className=' flex flex-col text-gray-900 text-center items-center my-8 gap-2'>
          GasPrice:
      {renderQuotes()}
      </div>
    </div>

  );
}