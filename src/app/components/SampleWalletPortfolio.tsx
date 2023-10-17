/* eslint-disable @next/next/no-img-element */

import { useState } from 'react'
import {
  CalendarIcon,
  Cog6ToothIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
} from '@heroicons/react/24/outline'
import SampleTable from './SampleTable'

const navigation = [
  { name: 'Home', href: '#', icon: HomeIcon, current: true },
  { name: 'Profile', href: '#', icon: UsersIcon, current: false },
  { name: 'NFTs', href: '#', icon: FolderIcon, current: false },
  { name: 'DeFi', href: '#', icon: CalendarIcon, current: false },
]


function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function SampleWalletPortfolio() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <>
      <div>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-co">
          <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4">
            <div className="flex h-16 shrink-0 items-center">
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                alt="Your Company"
              />
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigation.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className={classNames(
                            item.current
                              ? 'bg-gray-800 text-white'
                              : 'text-gray-400 hover:text-white hover:bg-gray-800',
                            'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                          )}
                        >
                          <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
                <li className="mt-auto">
                  <a
                    href="#"
                    className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-400 hover:bg-gray-800 hover:text-white"
                  >
                    <Cog6ToothIcon className="h-6 w-6 shrink-0" aria-hidden="true" />
                    Settings
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="lg:pl-72 bg-slate-200">
          <main className="py-10">
            <div className="px-4 sm:px-6 lg:px-8">
              
              {/* Table showing assets */}

              <SampleTable />
            </div>
          </main>
        </div>
      </div>
    </>
  )
}
