import { ConnectButton } from '@rainbow-me/rainbowkit'
import { centeredDiv } from '../styles/styles'
import { EthOverview } from './TableContents/eth/EthOverview';
import { RouteContext, RouteData } from '../context/route';
import {SlideOut} from './SlideOut/index';
import { TrasnferData } from '../context/transfers';
import { useContext, useEffect } from 'react';
import { actions } from '@/formulas';
import * as constants  from '../constants';
import { ethers } from 'ethers';
import { SlideOutContext } from '../context/slideOut';

export default function BasicTable({children}: any) {
  const {setTransfers, setLoadingTransfers, loadingTransfers} = useContext(TrasnferData);
  const {etherAmount, destinationAddress, destinationChain} = useContext(RouteData);

  useEffect(() => {
    const fetchTransfers = async () => {
      const transfers = await actions.calculateNativeTransfer(
        destinationAddress, 
        constants.Chains,
        etherAmount,
        // stub
        // destinationChain
        );
      setTransfers(transfers);
      setLoadingTransfers(false);
    };

    // Add actual validations here
    if (ethers.utils.isAddress(destinationAddress)) {
      setLoadingTransfers(true);
      fetchTransfers();
    }
  }, [etherAmount, destinationAddress])

  return (

    <RouteContext>
      <SlideOutContext>
         <div className={`${centeredDiv} bg-gray-200 py-10`}>
      <ConnectButton />
      <SlideOut />
      <p>Dummy address: 0x7AE8b0D6353F0931EB9FaC0A3562fA9e4C6Ff933</p>
      <div className='my-4'>
        <h1 className='text-gray-600'>Demo case: I want to transfer 0.1 eth to [address]. Show me the cheapest route.</h1>
      </div>
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