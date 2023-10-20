/* eslint-disable react-hooks/rules-of-hooks */
import { useAccount } from 'wagmi';
import InputFields from './InputFields';
import { getAllBalances } from '@/formulas/utils';
import { useEffect, useState, useCallback } from 'react';
import { computeAddress, formatEther } from 'ethers/lib/utils';
import { Chains } from '@/app/constants';
import { BigNumber } from 'ethers';
import { AccountDetails } from '@/app/interfaces';
import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/20/solid';
import Button from '../../Button';
import { standardButton } from '@/app/styles/styles';

export function EthOverview() {
  const { address } = useAccount();
  const [balances, setBalances] = useState<AccountDetails[]>([]);
  const [totalEth, setTotalEth] = useState<Number | any>(0);

  const getBalanceByChain = useCallback(async () => {
    const data = await getAllBalances(address as string, Chains)
    setBalances(data);
  }, [address])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    // getBalanceByChain()
    // getTotalEth()
  }, [address, getBalanceByChain])


  const getTotalEth = () => {
    if (balances.length > 1) {
    let sum = (a: any[]) => a.reduce((x: any, y: any) => x + y);
  
    let totalAmount = sum(balances.map((x) => Number(formatEther(x.balance))));
      setTotalEth(totalAmount)
    }
  }

  return (
    <tr>
      <td className="flex flex-col whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-100 sm:pl-6">
        <div className='flex flex-row items-center'>
          <div className='bg-indigo-200 rounded-xl h-6 w-6 mr-2'></div>Ethereum
        </div>
        <div className='flex flex-row'>
           {balances ? balances.map((item:any, index:number) => (
             <p key={index} className='mt-2 mr-2 text-gray-200'>
              
               {item.chain.name.toLowerCase()}{index === balances.length - 1 ? null : ', '} </p>
            )) : null}
        </div>
      </td>
      <td className="whitespace-nowrap text-sm text-gray-300">$1,323 USD</td>
      <td className="whitespace-nowrap text-sm text-gray-300">{totalEth}</td>
      <td className="relative whitespace-nowrap py-4 text-right text-sm">
        <Disclosure as='div'>
          {({ open }) => (
            <>
              <dt>
                <Disclosure.Button className='flex w-full items-center justify-center text-left text-gray-200'>
                  <div>
                    Send 
                  </div>
                  <span className='ml-6 flex h-7 items-center'>
                    {open ? (
                      <ChevronUpIcon className='h-6 w-6 text-gray-600' aria-hidden='true' />
                    ) : (
                      <ChevronDownIcon className='h-6 w-6 text-brand-400' aria-hidden='true' />
                    )}
                  </span>
                </Disclosure.Button>
              </dt>
              <Disclosure.Panel as='dd' className='h-[300px]'>
                <p className='text-sm leading-7 text-gray-400'>
                  Input fields go in here
                </p>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </td>
    </tr>
  );
}