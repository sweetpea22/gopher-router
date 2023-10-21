import { EthOverview } from "../TableContents/eth/EthOverview";


export default function AssetsTable() {
  return (
    <div className="mt-8 px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold leading-6 text-gray-100">Assets</h1>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add Funds
          </button>
        </div>
      </div>
      {/* Table */}
      <div className="mt-4 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="rounded-xl min-w-full divide-y divide-gray-800 ring-1 ring-inset ring-gray-800 ">
                <thead className="">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-200 sm:pl-6">
                      Asset
                    </th>
                    <th scope="col" className="py-3.5 text-left text-sm font-semibold text-gray-200">
                      Price
                    </th>
                    <th scope="col" className="py-3.5 text-left text-sm font-semibold text-gray-200">
                      Cumulative Balance
                    </th>
                
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {/* show ether first */}
                  <EthOverview />

                  {/* Token Overview */}
                   {/* {
                    // TODO: Add token overviews
                    tokens.map(token => {
                      return <TokenOverview token={token}/>
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
