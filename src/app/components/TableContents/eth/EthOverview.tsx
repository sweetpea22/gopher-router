/* eslint-disable react-hooks/rules-of-hooks */
import { useAccount } from 'wagmi';
import { getAllBalances } from '@/formulas/utils';
import { formatEther } from 'ethers/lib/utils';
import { useContext, useEffect, useState } from 'react';
import { Chains, getChain } from '@/app/constants';
import { AccountDetails } from '@/app/interfaces';
import { BalancesData } from '@/app/context/balances';
import { sendViaConnext } from '@/formulas/bridges/connext/sendViaConnext';

interface IOpts {
  onClick: (name: string) => void;
  selected: boolean;
}

export function EthOverview(opts: IOpts) {
  const { address } = useAccount();
  const {ethBalance, setEthBalance} = useContext(BalancesData);
  const [totalEth, setTotalEth] = useState<Number | any>(0);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const getBalanceByChain = async () => {
      const data = await getAllBalances(address as string, Chains);
      setEthBalance(data);
    }
    // getBalanceByChain();

    const getTotalEth = () => {
      if (ethBalance.length > 1) {
      let sum = (a: any[]) => a.reduce((x: any, y: any) => x + y);
    
      let totalAmount = sum(ethBalance.map((x) => Number(formatEther(x.balance))));
        setTotalEth(totalAmount)
      }
    }
    // getTotalEth()
  }, [address, ethBalance, setEthBalance, totalEth])
  

  return (
    <tr onClick={() => opts.onClick("eth")}>
      <td className="flex flex-col whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-100 sm:pl-6">
        <div className="flex flex-row items-center">
          <div className='bg-indigo-200 rounded-xl h-6 w-6 mr-2'></div>
          <span className={opts.selected ? "bg-green-200 text-black" : ""}>Ethereum</span>
        </div>
        <div className='flex flex-row'>
           {ethBalance.length > 0 ? ethBalance.map(({chain}, index:number) => (
             <p key={index} className='mt-2 mr-2 text-gray-200'>  
               {chain.name.charAt(0) + chain.name.slice(1).toLowerCase()}{index === ethBalance.length - 1 ? null : ','}</p>
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