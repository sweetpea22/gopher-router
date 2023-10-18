/* eslint-disable react-hooks/rules-of-hooks */
import { useAccount } from 'wagmi';
import InputFields from './InputFields';
import { getAllBalances } from '@/formulas/utils';
import { useEffect, useState } from 'react';
import { formatEther } from 'ethers/lib/utils';
import { chains } from '@/app/constants';

export function EthOverview() {
  const { address } = useAccount();
  const [balances, setBalances] = useState<any>([]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  
  useEffect(() => {
    const getBalanceByChain = async () => {
      const data = await getAllBalances(address as string, chains)
      setBalances(data);
    }
    getBalanceByChain();
  }, [address, chains])

  return (
    <div className='flex flex-col items-center shadow-md p-4 bg-gray-100 rounded-xl'>      
      <div className='flex flex-row shadow-lg rounded-xl py-3 px-5' style={{width: "80%"}}>
        <div>
          <h2 className='text-gray-800 '>Cumulative Balance</h2>
          <div>
            {balances ? balances.map((item:any, index:number) => (
              <p className='text-indigo-500' key={index}>{item.chain.name}: <strong>{formatEther(item.balance)} ETH</strong></p>
            )) : null}
          </div>
        </div>
        <InputFields />
      </div>
    </div>
  );
}