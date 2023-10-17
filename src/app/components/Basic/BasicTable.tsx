import { ConnectButton } from '@rainbow-me/rainbowkit'
import { centeredDiv, standardButton } from '../../styles/styles'
import { actions } from '@/formulas'
import { BigNumber } from 'ethers'
import { Chain, Transfer } from '@/formulas/interfaces'
import GetQuote from '@/app/components/Basic/GetQuote';


export default async function BasicTable({children}: any) { 
 
  const chains: Chain[] = [{name: "Goerli", rpcUrl: ""}];
  const amount = BigNumber.from(0);
  
  // const transfers = await actions.calculateNativeTransfer("0x18f32D6c9075796a74a403e575c27299EdABfE2D" as string, chains, amount)
  // console.log(transfers);

  return (
    <div className={`${centeredDiv} bg-gray-200 py-10`}>
      <ConnectButton />
      <div className='my-4'>
        <h1 className='text-gray-600'>Demo case: I want to transfer 0.1 eth to [address]. Show me the cheapest route.</h1>
      </div>
      {/* <div className='text-indigo-500'>
        {transfers.map((transfer, index) => (
          <div key={index}>
            <p>{transfer.balance}</p>
          </div>
        ))}
      </div> */}
       <GetQuote />
    </div>
  )
}