import { useAccount } from 'wagmi';
import { getAllBalances } from '@/formulas/utils';
import { useEffect, useState, useCallback } from 'react';
import { formatEther } from 'ethers/lib/utils';
import { Chains } from '@/app/constants';
import { AccountDetails } from '@/app/interfaces';

interface Tab {
  name: string;
  href: string;
  current: boolean;
}
const defaultTabs: Tab[] = [
  { name: 'Ether', href: '#', current: true },
  { name: 'Tokens', href: '#', current: false },
]

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
  const [balances, setBalances] = useState<AccountDetails[]>([]);
  const [tabs, setTabs] = useState<Tab[]>(defaultTabs)

  // so ugly
  const changeTab = (name: string) => {
    if (name == "Ether") {
      const newTabs = [...tabs];
      newTabs[0].current = true;
      newTabs[1].current = false;
      setTabs(newTabs);
    } else {
      const newTabs = [...tabs];
      newTabs[0].current = false;
      newTabs[1].current = true;
      setTabs(newTabs);
    }
  }

  const getBalanceByChain = useCallback(async () => {
    const data = await getAllBalances(address as string, Chains)
    setBalances(data);
  }, [address])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    getBalanceByChain()
  }, [address, getBalanceByChain])

  return (
    <div className="mt-4 py-5 px-4 sm:px-6 lg:px-8 rounded-xl min-w-full divide-y divide-gray-800 ring-1 ring-inset ring-gray-800">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-lg font-semibold leading-6 text-gray-100">Breakdown by Network</h1>
        </div>
      </div>
      {/* Tabs */}
      <div>
        <div className="sm:hidden mt-4">
          {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
          <select
            id="tabs"
            name="tabs"
            className="block w-full rounded-md border-gray-300 border-b-2 py-2 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            defaultValue={tabs[0].name}
          >
            {tabs.map((tab) => (
              <option key={tab.name}>
                {tab.name}
              </option>
            ))}
          </select>
        </div>
        <div className="hidden sm:block">
          <div className="border-b border-gray-200">
            <nav className="-mb-px grid grid-cols-2 space-x-12" aria-label="Tabs">
              {tabs.map((tab) => (
                <a
                  key={tab.name}
                  href={tab.href}
                  onClick={() => {tab.current ? null : changeTab(tab.name)}}
                  className={classNames(
                    tab.current
                      ? 'border-indigo-500 text-indigo-600 text-center'
                      : 'border-transparent text-gray-500 hover:border-gray-300',
                    'whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium '
                  )}
                  aria-current={tab.current ? 'page' : undefined}
                >
                  {tab.name}
                </a>
              ))}
            </nav>
          </div>
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
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-200 sm:pl-6">
                     Network
                    </th>
                    <th scope="col" className="py-3.5 text-left text-sm font-semibold text-gray-200">
                      Balance
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                   {balances ? balances.map(({chain, balance}, index:number) => (
                     <tr key={index} className=''>  
                       <td>
                         <span className='py-3 px-2 text-gray-200'>{chain.name.charAt(0) + chain.name.slice(1).toLowerCase()}</span>
                       </td>
                         
                       <td>
                        <span className='py-3 px-2 text-gray-200'>{truncate(formatEther(balance))}</span>
                       </td>
                     </tr>
                    )) : null}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
