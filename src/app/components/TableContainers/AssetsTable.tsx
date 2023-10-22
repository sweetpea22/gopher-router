import * as constants from "@/app/constants";
import { EthOverview } from "../TableContents/eth/EthOverview";
import { TokenOverview } from "../TableContents/tokens/tokenOverview";
import { TokenBalance } from "@/app/interfaces";
import { useContext, useState } from "react";
import { BalancesData } from "@/app/context/balances";


export default function AssetsTable() {
  const {selected, setSelected} = useContext(BalancesData);

  const handleSelect = (name: string | constants.TokenNames) => {
    if (name === "eth") {
      setSelected("eth");
    } else {
      setSelected(name);
    }
  }

  return (
    <div className="mt-8 px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold leading-6 text-gray-100">Assets</h1>
        </div>
      </div>
      {/* Table */}
      <div className="mt-2 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-opacity-5 sm:rounded-lg ">
              <table className="min-w-full divide-y divide-gray-800">
                <thead className="">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-200 sm:pl-6">
                      Asset
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-200">
                      Price
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-200">
                      Balance
                    </th>
                  
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Sweep</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700 ">
                  {/* show ether first */}
                  <EthOverview 
                    onClick={handleSelect} 
                    selected={selected === "eth" ? true : false}
                  />

                  {/* Token Overview */}
                   {/* {
                    // TODO: Add token overviews
                    constants.Tokens.map(token => {
                      return <TokenOverview 
                        onClick={handleSelect} 
                        key={token.name} 
                        token={token}
                        selected={selected === token.name ? true : false}
                      />
                    })
                  } */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
