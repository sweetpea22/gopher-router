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
import AssetsTable from './AssetsTable';
import InputFields from './TableContents/eth/InputFields';

export default function BasicTable({children}: any) {
  const {setTransfers, setLoadingTransfers} = useContext(TrasnferData);
  const {etherAmount, destinationAddress, destinationChain} = useContext(RouteData);

  useEffect(() => {
    const fetchTransfers = async () => {
      const transfers = await actions.calculateNativeTransfer(
        destinationAddress, 
        constants.Chains,
        etherAmount,
        // stub
        Object.keys(destinationChain).length > 0 ? destinationChain : undefined
        );
      setTransfers(transfers);
      setLoadingTransfers(false);
    };

    // Add actual validations here
    if (ethers.utils.isAddress(destinationAddress)) {
      setLoadingTransfers(true);
      fetchTransfers();
    }
  }, [etherAmount, destinationAddress, destinationChain])

  return (
  <div className={`${centeredDiv} py-10`}>
    <ConnectButton />
      <SlideOut />
      <div className='flex flex-col justify-start'>
        <AssetsTable />
        <div className='grid sm:grid-cols-2 px-8'>
          <InputFields />
          <div className='w-1/3'></div>
        </div>
      </div>
  </div>
  )
}