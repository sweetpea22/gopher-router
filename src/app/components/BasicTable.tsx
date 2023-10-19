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
        constants.chains,
        ethers.BigNumber.from(amount)
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
    </div>
  )
}