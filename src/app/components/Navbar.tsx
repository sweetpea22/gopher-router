/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
type Props = {};

const Navbar = (props: Props) => {
  return (
      <>
        <div className='max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8'>
          <div className='relative flex flex-row items-center justify-start py-5 lg:justify-between'>
            {/* Logo */}
            <div className='flex flex-row items-center'>
              <a href='#'>
                <span className='sr-only'>Your Company</span>
                <img
                  className='h-12 w-12 mr-4 rounded-xl' 
                  src='logo.png'
                  alt='gopher router'
                />
              </a>
              <ConnectButton />
            </div>

            {/* Right section on desktop */}
            <div className='hidden lg:ml-4 lg:flex lg:items-center lg:pr-0.5'>
            {/* Safe App dropdown */}
            </div>
          </div>
        </div>
      </>
  )
};

export default Navbar;
