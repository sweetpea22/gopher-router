import { useState } from 'react';
import BasicTable from './components/BasicTable';
import { BigNumber } from 'ethers';

export default function Home() {
  return (
      <div className="h-full">
        <BasicTable />
      </div>
  )
}
