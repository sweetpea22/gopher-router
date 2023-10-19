"use client"
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useFeeData } from 'wagmi';
import { centeredDiv, standardButton } from '../styles/styles'
import { actions } from '@/formulas'
import { BigNumber } from 'ethers'
import { ChainInfo, Transfer } from '@/app/interfaces'
import { EthOverview } from './TableContents/eth/EthOverview';
import { Token, TokenOverview } from './TableContents/tokens/tokenOverview';
import { RouteContext } from '../context/route';
import SlideOut from './SlideOut';
import { SlideOutContext } from '../context/slideOut';

export default function BasicTable({children}: any) { 

  const tokens: Token[] = [
    {name:"usdc"},
    {name: "tether"},
  ];

  return (
    <RouteContext>
      <SlideOutContext>
            <div className='flex flex-col text-gray-900 text-center items-center my-8 gap-2'>
              Current Gas Price (Gwei):
              {/* {renderGasPrice()} */}
          </div>
        <div className={`${centeredDiv} bg-gray-200 py-10 my-8`}>
          <ConnectButton />
          <SlideOut />
          <div>
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
        </div>
      </SlideOutContext>
    </RouteContext>
  )
}