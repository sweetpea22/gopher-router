import React, { ReactElement } from 'react';
import { ethers } from 'ethers';
import { sendViaConnext } from '@/formulas/bridges/connext/sendViaConnext';
import { Chains } from '../constants';
import { ChainInfo } from '../interfaces';

type Props = {
  children: string | ReactElement;
  className?: string;
  amount?: string;
  originChain?: ChainInfo;
  to?: string;
  destinationChain?: ChainInfo;
};

const bridgeViaConnext = async () => {
  //@ts-ignore
  if (typeof window.ethereum === 'undefined') {
    alert('Please install MetaMask or another web3 provider first.');
    return;
  }
  
  // Connect to Metamask (or another web3 provider)
  //@ts-ignore
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  // replace hardcoded version with this 
  // sendViaConnext(originChain, destinationChain, to, amount, signer);
  
};
  

  
const SendButton = ({ to, destinationChain, originChain, amount, children, className }: Props) => {
  return <button
        type="button"
    className={`rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${className}`}
    onClick={() => bridgeViaConnext()}
  >
    {children}
  </button>;
};

export default SendButton;
