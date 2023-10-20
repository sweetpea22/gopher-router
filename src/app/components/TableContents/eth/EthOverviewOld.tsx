/* eslint-disable react-hooks/rules-of-hooks */
import { useAccount } from 'wagmi';
import InputFields from './InputFields';
import { getAllBalances } from '@/formulas/utils';
import { useEffect, useState } from 'react';
import { formatEther } from 'ethers/lib/utils';
import { Chains } from '@/app/constants';
import { BigNumber } from 'ethers';
import { AccountDetails } from '@/app/interfaces';

export function EthOverviewOld() {
  const { address } = useAccount();
  const [balances, setBalances] = useState<AccountDetails[]>([]);
  const [totalEth, setTotalEth] = useState<Number | any>(0);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const getBalanceByChain = async () => {
      const data = await getAllBalances(address as string, Chains)
      setBalances(data);
    }
    getBalanceByChain();

    const getTotalEth = () => {
      if (balances.length > 1) {
      let sum = (a: any[]) => a.reduce((x: any, y: any) => x + y);
    
      let totalAmount = sum(balances.map((x) => Number(formatEther(x.balance))));
        setTotalEth(totalAmount)
      }
    }
    getTotalEth()
  }, [address, balances, totalEth])
  
  



  return (
    <div className='flex flex-col  shadow-md p-4 mt-12 bg-gray-100 rounded-xl'>      
      <div className='flex flex-row justify-start rounded-xl py-3 px-5 w-4/6'>
        <div>
          <h2 className='text-gray-800 '>Cumulative Balance: {totalEth}</h2>
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