import { Fragment, useContext, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { ChainNames, getChain } from '@/app/constants'
import classNames from 'classnames';
import { RouteData } from '@/app/context/route';
import { ChainInfo } from '@/app/interfaces';


export default function NetworkInput() {
  let chainList = Object.values(ChainNames);
  chainList = ["None", ...chainList];
  const {destinationChain, setDestinationChain } = useContext(RouteData);
  const [selectedNetwork, setSelectedNetwork] = useState(chainList[0].toLowerCase())

  const onNetworkSelectChange = (chainName: string) => {
    const chain = getChain(chainName);
    if (chain) {
      setSelectedNetwork(chainName.toLowerCase());
      setDestinationChain(chain);
    } else {
      setSelectedNetwork(chainName.toLowerCase());
      setDestinationChain({} as ChainInfo);
    }
  }

  return (
    <Listbox value={selectedNetwork} onChange={onNetworkSelectChange}>
      {({ open }) => (
        <>
          <Listbox.Label className="block text-base font-medium leading-6 text-gray-300">Destination Network</Listbox.Label>
          <div className="relative mt-2">
            <Listbox.Button className="relative w-full cursor-default rounded-lg bg-[#121212] py-3.5 pl-3 pr-10 text-left text-gray-300 shadow-sm ring-1 ring-inset ring-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-base sm:leading-6">
              <span className="block truncate">{selectedNetwork}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-gray-800 py-1 text-base shadow-lg ring-1 ring-indigo-400 ring-opacity-5 focus:outline-none sm:text-sm">
                {chainList.map((chain, index) => (
                  <Listbox.Option
                    key={index}
                    className={({ active }) =>
                      classNames(
                        active ? 'bg-indigo-600 text-white' : 'text-gray-400',
                        'relative cursor-default select-none py-2 pl-3 pr-9'
                      )
                    }
                    value={chain}
                  >
                    {({ selected, active }) => (
                      <>
                        <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                          {chain.toLowerCase()}
                        </span>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? 'text-white' : 'text-indigo-600',
                              'absolute inset-y-0 right-0 flex items-center pr-4'
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  )
}
