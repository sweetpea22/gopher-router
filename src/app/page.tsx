import { useState } from 'react';
import BasicTable from './components/BasicTable';
import SlideOut from './components/SlideOut';
import { BigNumber } from 'ethers';

export default function Home() {
  return (
      <div className="h-full">
        <BasicTable />
        {/* <SlideOut /> */}
      </div>
  )
}
