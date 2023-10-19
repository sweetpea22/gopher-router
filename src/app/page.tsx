"use client"
import BasicTable from './components/BasicTable';
import { RouteContext } from './context/route';
import { SlideOutContext } from './context/slideOut';
import { TransferContext } from './context/transfers';

export default function Home() {
  return (
    <RouteContext>
      <SlideOutContext>
        <TransferContext>
          <div className="h-full">
            <BasicTable />
          </div>
          </TransferContext>
      </SlideOutContext>
    </RouteContext>
  )
}
