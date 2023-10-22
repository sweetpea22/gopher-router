import { standardInput } from '@/app/styles/styles'
import { ChangeEvent, useContext, useState } from 'react'
import { standardButton } from '@/app/styles/styles';
import { BigNumber, ethers } from 'ethers';
import { RouteData } from '@/app/context/transferRoute';
import { SlideOutData } from '@/app/context/slideOut';
import NetworkInput from './eth/NetworkInput';

import { TrasnferData } from '@/app/context/transfers';
import { BalancesData } from '@/app/context/balances';

export default function InputFields() {
  const {setDestinationAddress, setEtherAmount} = useContext(RouteData);
  const {selected} = useContext(BalancesData);
  const {setLoadingTransfers} = useContext(TrasnferData);
  const [localAddress, setLocalAddress] = useState("");
  const [localAmount, setLocalAmount] = useState("");

  const changeDestination = (e: ChangeEvent<HTMLInputElement>) => {
    setLocalAddress(e.target.value);
  }

  const changeAmount = (e: ChangeEvent<HTMLInputElement>) => {
    setLocalAmount(e.target.value)
  }

  const getRoutes = () => {
    setDestinationAddress(localAddress);
    setEtherAmount(ethers.utils.parseEther(localAmount));
  }

  return (
    <div className='w-1/2 mt-4 py-5 px-5 rounded-xl min-w-full ring-1 ring-inset'>
      <div className='py-2'>
        <label htmlFor="address" className="block text-base font-medium leading-6 text-gray-200">
          Send {selected == "eth" ? "Ethereum" : selected}
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
        <label htmlFor="amount" className="block text-base font-medium leading-6 text-gray-200">
          Amount to send
        </label>
        <div className="mt-2">
          <input
            type="number"
            name="amount"
            id="amount"
            className={`${standardInput}`}
            placeholder={selected == "eth" ? "Amount in Ether" : `Amount in ${selected}`}
            onChange={changeAmount}
            value={localAmount}
          />
          <NetworkInput />
          <button
            onClick={getRoutes}
            type='button'
            className={`${standardButton} w-[150px] cursor-pointer my-5`}
            disabled={!localAddress && !localAmount}
            >
            Get Routes
          </button>
        </div>
      </div>
    </div>
  )
}
