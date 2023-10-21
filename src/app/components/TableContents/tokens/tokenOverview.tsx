/* eslint-disable react-hooks/rules-of-hooks */
import { useAccount } from 'wagmi';
import { getAllBalances } from '@/formulas/utils';
import { formatEther } from 'ethers/lib/utils';
import { useContext, useEffect, useState } from 'react';
import { ChainNames, Chains } from '@/app/constants';
import { AccountDetails, Token, TokenBalance } from '@/app/interfaces';
import { BigNumber, ethers } from 'ethers';
import { BalancesData } from '@/app/context/balances';

interface IOpts {
  token: Token;
  onClick: (name: string) => void;
  selected: boolean;
}

export function TokenOverview(opts: IOpts) {
  const {name, chainMap} = opts.token;
  const { address } = useAccount();
  const {tokenBalances, setTokenBalances} = useContext(BalancesData);
  const [balances, setBalances] = useState<TokenBalance[]>([]);
  const [total, setTotal] = useState<BigNumber>(BigNumber.from(0));

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const getBalanceByChain = async () => {
      const newBalances = [];
      for (let i=0; i < Chains.length; i++){
        const chain = Chains[i];
        const tokenAddress = chainMap[chain.name];
        if (tokenAddress) {
          const abi = ["function balanceOf(address owner) view returns (uint256)"];
          const provider = new ethers.providers.JsonRpcProvider(chain.rpcUrl);
          const erc20 = new ethers.Contract(tokenAddress, abi, provider);
          const balance = await erc20.balanceOf(address);
          const tokenBalance: TokenBalance = {
            chain,
            balance: balance
          }
          newBalances.push(tokenBalance);
        }
      };
      const newState = tokenBalances;
      newState[name] = newBalances;
      // Updates local state
      setBalances(newState[name]);
      // Updates global state
      setTokenBalances(newState);
    }
    
    if (balances.length == 0) {
      getBalanceByChain();
    }

    const getTotal = () => {
      if (balances.length > 1) {
      let sum = (a: any[]) => a.reduce((x: any, y: any) => x + y);
    
      let totalAmount = sum(balances.map((x) => Number(formatEther(x.balance))));
        setTotal(totalAmount)
      }
    }
    getTotal()
  }, [address, balances])

  return (
    <tr onClick={() => opts.onClick(name)}>
      <td className="flex flex-col whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-100 sm:pl-6">
        <div className='flex flex-row items-center'>
          <div className='bg-indigo-200 rounded-xl h-6 w-6 mr-2'></div>
          <span className={opts.selected ? "bg-green-200 text-black" : ""}>{name}</span>
        </div>
        <div className='flex flex-row'>
           {balances ? balances.map(({chain}, index:number) => (
             <p key={index} className='mt-2 mr-2 text-gray-200'>  
               {chain.name.charAt(0) + chain.name.slice(1).toLowerCase()}{index === balances.length - 1 ? null : ','}</p>
            )) : null}
        </div>
      </td>
      <td className="whitespace-nowrap text-sm text-gray-300"><div>$1,595 USD</div></td>
      <td className="whitespace-nowrap text-sm text-gray-300">{total.toString()}</td>
      <td className="whitespace-nowrap text-right text-sm pr-4">
      </td>
    </tr>
  );
}