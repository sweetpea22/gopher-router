import { ChainInfo } from "@/app/interfaces";

interface TxOverviewProps {
  destinationAddress: string;
  etherAmount: string;
  destinationChain: ChainInfo;
}

export default function TxOverview({ destinationAddress, destinationChain, etherAmount }: TxOverviewProps) {
  return (
    <>
      {/* Review Order */}
      <div className='px-2 py-6 shadow-xl rounded-lg bg-white ring-1 ring-gray-100'>
        <div className='px-3 flex flex-col items-start justify-between'>
          <h3 className='font-medium font-lg'>Total Amount</h3>
          <div className='rounded-xl bg-slate-50 py-2 px-3'>
            <p className='font-medium'>{(Number(etherAmount)/10e17).toFixed(2)}</p>
          </div>
        </div>
        <div className='px-3 py-2 flex flex-col items-start justify-between'>
        {destinationChain?.name  ? <div className='rounded-xl bg-slate-50 py-2 px-3'>
            <h3 className='font-medium font-lg'>Destination Chain</h3>
            <p className='font-medium'>{destinationChain.name}</p>
          </div> : null} 
        </div>
        <div className='px-3 py-2 flex flex-col items-start justify-between'>
          <h3 className='font-medium font-lg'>Receiving Address</h3>
          <div className='rounded-xl w-full h-[5rem] bg-slate-50 py-2 px-3 break-words'>
            <p className='font-medium mt-2'>{destinationAddress}</p>
          </div>
        </div>
        </div>
    </>
  )
}
