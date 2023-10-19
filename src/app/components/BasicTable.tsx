import { ConnectButton } from '@rainbow-me/rainbowkit'
import { centeredDiv } from '../styles/styles'
import { EthOverview } from './TableContents/eth/EthOverview';
import { RouteData } from '../context/route';
import {SlideOut} from './SlideOut/index';
import { TrasnferData } from '../context/transfers';
import { useContext, useEffect } from 'react';
import { actions } from '@/formulas';
import * as constants  from '../constants';
import { ethers } from 'ethers';

export default function BasicTable({children}: any) {
  const {setTransfers, setLoadingTransfers, loadingTransfers} = useContext(TrasnferData);
  const {etherAmount, destinationAddress} = useContext(RouteData);

  useEffect(() => {
    const fetchTransfers = async () => {
      const amount = ethers.utils.parseEther(etherAmount.toString());
      const transfers = await actions.calculateNativeTransfer(
        destinationAddress, 
        constants.Chains,
        ethers.BigNumber.from(amount),
        // stub
        constants.Chains[0]
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
    <div className={`${centeredDiv} bg-gray-200 py-10`}>
      <ConnectButton />
      <SlideOut />
      <p>Ether: {etherAmount.toString()} destinationAddress: {destinationAddress} </p>
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
  )
}