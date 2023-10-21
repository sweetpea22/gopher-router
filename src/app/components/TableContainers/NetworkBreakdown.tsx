import { useAccount } from 'wagmi';
import { getAllBalances } from '@/formulas/utils';
import { useEffect, useState, useCallback, useContext } from 'react';
import { formatEther } from 'ethers/lib/utils';
import { Chains } from '@/app/constants';
import { AccountDetails } from '@/app/interfaces';
import { BalancesData } from '@/app/context/balances';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

function truncate(numberString: string, trunk = 2) {
  var onpoint = numberString.split('.',2);
  var numberStringTruncated = numberString;
  if (onpoint.length > 1) {
      numberStringTruncated = onpoint[0] + '.' + onpoint[1].substring(0,trunk);
  }
  return numberStringTruncated;
}

export default function NetworkBreakdown() {
  const { address } = useAccount();
  const {selected, ethBalance, tokenBalances} = useContext(BalancesData);

  const renderTable = () => {
    if (selected == "eth") {
      return ethBalance.length > 0 ? ethBalance.sort((a,b) => a.chain.name.localeCompare(b.chain.name)).map(({chain, balance}, index: number) => (
        <tr key={index} className=''>  
          <td>
            <span className='py-3 px-2 text-gray-200'>{chain.name.charAt(0) + chain.name.slice(1).toLowerCase()}</span>
          </td>
            
          <td>
          <span className='py-3 px-2 text-gray-200'>{truncate(formatEther(balance))}</span>
          </td>
        </tr>
      )) : null
    } else {
      return tokenBalances[selected] && tokenBalances[selected].length > 0 ? tokenBalances[selected].sort((a,b) => a.chain.name.localeCompare(b.chain.name)).map(({chain, balance}, index: number) => (
        <tr key={index} className=''>  
          <td>
            <span className='py-3 px-2 text-gray-200'>{chain.name.charAt(0) + chain.name.slice(1).toLowerCase()}</span>
          </td>
            
          <td>
          <span className='py-3 px-2 text-gray-200'>{truncate(formatEther(balance))}</span>
          </td>
        </tr>
      )) : null 
    }
  }

  return (
    <div className="mt-4 py-5 px-4 sm:px-6 lg:px-8 rounded-xl min-w-full divide-y divide-gray-800 ring-1 ring-inset ring-gray-800">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-lg font-semibold leading-6 text-gray-100">Breakdown by Network</h1>
        </div>
      </div>
      {/* Table */}
      <div className="mt-5 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="rounded-xl min-w-full divide-y divide-gray-800 ring-1 ring-inset ring-gray-800 ">
                <thead className="">
                  <tr>
                    <th scope="col" className="py-3.5 text-left text-sm font-semibold text-gray-200">
                    Network
                    </th>
                    <th scope="col" className="py-3.5 text-left text-sm font-semibold text-gray-200">
                    Balance
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {renderTable()}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
