import { standardInput } from '@/app/styles/styles'
import { useSendTransaction, usePrepareSendTransaction } from 'wagmi'
import { ChangeEvent, useContext, useState } from 'react'
import { parseEther } from "viem";
import { useDebounce } from "use-debounce";
import { standardButton } from '@/app/styles/styles';
import { BigNumber } from 'ethers';
import { RouteData } from '@/app/context';

// const HARDCODED_ADDRESS = '0x18f32D6c9075796a74a403e575c27299EdABfE2D';

export default function InputFields() {
  const {setDestinationAddress, setEtherAmount} = useContext(RouteData);
  const [localAddress, setLocalAddress] = useState("");
  const [localAmount, setLocalAmount] = useState(BigNumber.from(0));

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

  const changeDestination = (e: ChangeEvent<HTMLInputElement>) => {
    setLocalAddress(e.target.value);
  }

  const changeAmount = (e: ChangeEvent<HTMLInputElement>) => {
    setLocalAmount(BigNumber.from(e.target.value))
  }

  const getRoutes = () => {
    setDestinationAddress(localAddress);
    setEtherAmount(localAmount);
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
            onChange={changeDestination}
            value={localAddress}
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
            onChange={changeAmount}
            value={localAmount.eq(BigNumber.from(0)) ? undefined : localAmount.toString()}
          />
          <button
            onClick={getRoutes}
            type='button'
            className={`${standardButton} w-[150px] my-5`}>
            Get Routes
          </button>
        </div>
      </div>
    </div>
  )
}
