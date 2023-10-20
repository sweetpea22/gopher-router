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
    <AssetsTable />
  </div>
  )
}