"use client"
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useFeeData } from 'wagmi';
import { centeredDiv, standardButton } from '../styles/styles'
import { actions } from '@/formulas'
import { BigNumber } from 'ethers'
import { ChainInfo, Transfer } from '@/app/interfaces'
import { EthOverview } from './TableContents/eth/EthOverview';
import { Token, TokenOverview } from './TableContents/tokens/tokenOverview';
import { TransactionView } from './TableContents/TransactionView';
import { RouteContext } from '../context';

export default function BasicTable({children}: any) { 
  // const { data: feeData, isError: feeDataError, isLoading: feeDataLoading } = useFeeData({ formatUnits: 'gwei', watch: true })
  const chains: ChainInfo[] = [{name: "Goerli", rpcUrl: ""}];
  const amount = BigNumber.from(0);
  
  // const renderLoading = () => {
  //   if (!feeDataLoading) {
  //     return null;
  //   }
  //   return (
  //     <div>
  //       Processing...
  //     </div>
  //   )
  // }

  // const renderGasPrice = () => {
  //   if (!feeData) {
  //     return (
  //       <>
  //         {renderLoading()}
  //       </>
  //     )
  //   }
  //   return (
  //     <div className="">
  //       <p className='text-gray-900'>{JSON.stringify(feeData?.formatted.gasPrice)}</p>
  //     </div>
  //   )
  // }
  // const transfers = await actions.calculateNativeTransfer("0x18f32D6c9075796a74a403e575c27299EdABfE2D" as string, chains, amount)
  // console.log(transfers);

  const tokens: Token[] = [
    {name:"usdc"},
    {name: "tether"},
  ];

  return (
    <RouteContext>
      <div className={`${centeredDiv} bg-gray-200 py-10`}>
        <ConnectButton />
        <div className='my-4'>
          <h1 className='text-gray-600'>Demo case: I want to transfer 0.1 eth to [address]. Show me the cheapest route.</h1>
        </div>
        <div>
          <TransactionView />
          {/* Ether Balances */}
          <EthOverview />
          {/* Token Overviews */}
          </div>
          <div>
          {/* {
            // TODO: Add token overviews
            tokens.map(token => {
              return <TokenOverview token={token}/>
            })
          } */}
          </div>

          <div className='flex flex-col text-gray-900 text-center items-center my-8 gap-2'>
            Current Gas Price (Gwei):
            {/* {renderGasPrice()} */}
        </div>
      </div>
    </RouteContext>
  )
}