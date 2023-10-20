import { standardInput } from '@/app/styles/styles'
import { useSendTransaction, usePrepareSendTransaction } from 'wagmi'
import { ChangeEvent, useContext, useState } from 'react'
import { parseEther } from "viem";
import { useDebounce } from "use-debounce";
import { standardButton } from '@/app/styles/styles';
import { RouteData } from '@/app/context/transferRoute';
import { BigNumber } from 'ethers';

// const HARDCODED_ADDRESS = '0x18f32D6c9075796a74a403e575c27299EdABfE2D';

export default function InputFields() {
  const {destinationAddress, setDestinationAddress, etherAmount, setEtherAmount} = useContext(RouteData);
  // Set Value to Send
  // const [value, setValue] = useState(0);
  // const [debouncedAmountToSend] = useDebounce(value.toString(), 500);

  // prepareSendTransaction 

  // const {
  //   config,
  //   error: prepareError,
  //   isError: isPrepareError,
  // } = usePrepareSendTransaction({
  //   to: HARDCODED_ADDRESS,
  //   value: debouncedAmountToSend
  //     ? parseEther(debouncedAmountToSend as `${number}`)
  //     : undefined,
  // });

  const inputDestinationAddress = (e: ChangeEvent<HTMLInputElement>) => {
    setDestinationAddress(e.target.value)
  }

  const inputEtherAmount = (e: ChangeEvent<HTMLInputElement>) => {
    setEtherAmount(BigNumber.from(e.target.value))
  }

  const getQuote = () => {
    console.log(etherAmount, destinationAddress)
  }

  return (
    <div className='py-2'>
      <div className='py-2'>
        <label htmlFor="address" className="block text-sm font-medium leading-6 text-gray-900">
          Send to
        </label>
        <div className="mt-2">
          <input
            type="text"
            name="address"
            id="address"
            className={`${standardInput}`}
            placeholder="0x..."
            onChange={inputDestinationAddress}
          />
        </div>
        </div>
      <div className='py-2'>
        <label htmlFor="amount" className="block text-sm font-medium leading-6 text-gray-900">
          Amount to send
        </label>
        <div className="mt-2">
          <input
            type="number"
            name="amount"
            id="amount"
            className={`${standardInput}`}
            placeholder="Amount in ether"
            onChange={inputEtherAmount}
          />
          <button
            onClick={getQuote}
            type='button'
            className={`${standardButton} w-[150px] my-5`}>
          Get quotes
          </button>
        </div>
        </div>
      </div>
  )
}
