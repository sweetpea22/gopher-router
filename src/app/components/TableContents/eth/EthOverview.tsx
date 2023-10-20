/* eslint-disable react-hooks/rules-of-hooks */
import { useAccount } from 'wagmi';
import { getAllBalances } from '@/formulas/utils';
import { formatEther } from 'ethers/lib/utils';
import { useEffect, useState } from 'react';
import { Chains } from '@/app/constants';
import { AccountDetails } from '@/app/interfaces';
export function EthOverview() {
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
    <tr>
      <td className="flex flex-col whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-100 sm:pl-6">
        <div className='flex flex-row items-center'>
          <div className='bg-indigo-200 rounded-xl h-6 w-6 mr-2'></div>Ethereum
        </div>
        <div className='flex flex-row'>
           {balances ? balances.map(({chain}, index:number) => (
             <p key={index} className='mt-2 mr-2 text-gray-200'>  
               {chain.name.charAt(0) + chain.name.slice(1).toLowerCase()}{index === balances.length - 1 ? null : ','}</p>
            )) : null}
        </div>
      </td>
      <td className="whitespace-nowrap text-sm text-gray-300"><div>$1,595 USD</div></td>
      <td className="whitespace-nowrap text-sm text-gray-300">{totalEth}</td>
      <td className="whitespace-nowrap text-right text-sm pr-4">
      </td>
    </tr>
  );
}