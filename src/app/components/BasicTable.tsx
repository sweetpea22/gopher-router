import { ConnectButton } from '@rainbow-me/rainbowkit'
import { centeredDiv } from '../styles/styles'
import { EthOverview } from './TableContents/eth/EthOverview';
import { RouteContext, RouteData } from '../context/transferRoute';
import {SlideOut} from './SlideOut/index';
import { TrasnferData } from '../context/transfers';
import { useContext, useEffect } from 'react';
import { actions } from '@/formulas';
import * as constants  from '../constants';
import { ethers } from 'ethers';
import { SlideOutContext, SlideOutData } from '../context/slideOut';
import AssetsTable from './TableContainers/AssetsTable';
import InputFields from './TableContents/InputFields';
import NetworkBreakdown from './TableContainers/NetworkBreakdown';
import Navbar from './Navbar';
import SplitFunds from './TableContainers/SplitFunds';
import { BalancesData } from '../context/balances';

export default function BasicTable({children}: any) {
  const {setTransfers, setLoadingTransfers} = useContext(TrasnferData);
  const {isOpen, setOpen} = useContext(SlideOutData);
  const {etherAmount, destinationAddress, destinationChain, isToken} = useContext(RouteData);
  const {selected} = useContext(BalancesData);

  useEffect(() => {
    const fetchTransfers = async () => {
      const transfers = await actions.calculateNativeTransfer({
        from: destinationAddress,
        chains: constants.Chains,
        amount: etherAmount,
        destinationChain: Object.keys(destinationChain).length > 0 ? destinationChain : undefined,
        isToken,
        tokenName: selected as constants.TokenNames
      });
      setTransfers(transfers);
      setLoadingTransfers(false);
    };

    // Add actual validations here
    if (ethers.utils.isAddress(destinationAddress)) {
      if (!isOpen) setOpen(true);
      setLoadingTransfers(true);
      fetchTransfers();
    }
  }, [etherAmount, destinationAddress])

  return (
    <>
      <div className={`${centeredDiv} py-10`}>
        <div className='flex flex-row items-center'>
          <Navbar />
        </div>
        {isOpen ? <SlideOut /> : null}
        <div className='flex flex-col justify-start'>
          <AssetsTable />
          <div className='grid sm:grid-cols-2 gap-4 px-8'>
            <InputFields />
            <NetworkBreakdown />
          </div>
          <div className='grid sm:grid-cols-2 gap-4 px-8'>
            {/* <SplitFunds /> */}
          </div>
        </div>
      </div>
    </>
  )
}