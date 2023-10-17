"use client"
import { Fragment, useEffect, useState } from 'react'
import { ArrowDownCircleIcon, ArrowPathIcon, ArrowUpCircleIcon } from '@heroicons/react/20/solid'
import { actions } from '@/formulas'
import { BigNumber } from 'ethers'
import { Chain, Transfer } from '@/formulas/interfaces'

const statuses = {
  Paid: 'text-green-700 bg-green-50 ring-green-600/20',
  Withdraw: 'text-gray-600 bg-gray-50 ring-gray-500/10',
  Overdue: 'text-red-700 bg-red-50 ring-red-600/10',
}
const days = [
  {
    date: 'Today',
    dateTime: '2023-03-22',
    transactions: [
      {
        id: 1,
        invoiceNumber: 'Chain',
        href: '#',
        amount: '200 USDC',
        chain: 'Base Goerli',
        status: 'Paid',
        client: 'Reform',
        description: 'Website redesign',
        icon: ArrowUpCircleIcon,
      },
    ]
  }
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function SampleTable() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [transfers, setTransfers] = useState<Transfer[]>([])

  async function prepareTransaction() {
    setOpen(true);
    setLoading(true);
    const from = ""
    const chains: Chain[] = [];
    const amount = BigNumber.from(0);

    const transfers = await actions.calculateNativeTransfer(from, chains, amount);
    setTransfers(transfers);
  }

  return (
    <div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mx-auto max-w-2xl text-base font-semibold leading-6 text-gray-900 lg:mx-0 lg:max-w-none">
          Assets
        </h2>
      </div>
      <div className="mt-6 overflow-hidden border-t border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
            <table className="w-full text-left">
              <thead className="sr-only">
                <tr>
                  <th>Amount</th>
                  <th className="hidden sm:table-cell">Client</th>
                  <th>More details</th>
                </tr>
              </thead>
              <tbody>
                {days.map((day) => (
                  <Fragment key={day.dateTime}>
                    <tr className="text-sm leading-6 text-gray-900">
                      <th scope="colgroup" colSpan={3} className="relative isolate py-2 font-semibold">
                  
                      </th>
                    </tr>
                    {day.transactions.map((transaction) => (
                      <tr key={transaction.id}>
                        <td className="relative py-5 pr-6">
                          <div className="flex gap-x-6">
                            <transaction.icon
                              className="hidden h-6 w-5 flex-none text-gray-400 sm:block"
                              aria-hidden="true"
                            />
                            <div className="flex-auto">
                              <div className="flex items-start gap-x-3">
                                <div className="text-sm font-medium leading-6 text-gray-900">{transaction.amount}</div>
                              </div>
                              {transaction.chain ? (
                                <div className="mt-1 text-xs leading-5 text-gray-500">{transaction.chain}</div>
                              ) : null}
                            </div>
                          </div>
                          <div className="absolute bottom-0 right-full h-px w-screen bg-gray-100" />
                          <div className="absolute bottom-0 left-0 h-px w-screen bg-gray-100" />
                        </td>
                       
                        <td className="py-5 text-right">
                          <div className="flex justify-end" onClick={prepareTransaction}>
                            <a
                              href={transaction.href}
                              className="text-sm font-medium leading-6 text-indigo-600 hover:text-indigo-500"
                            >
                              Send<span className="hidden sm:inline"> transaction</span>
                              <span className="sr-only">
                                , invoice #{transaction.invoiceNumber}, {transaction.client}
                              </span>
                            </a>
                          </div>
                         
                        </td>
                      </tr>
                    ))}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
