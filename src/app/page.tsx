"use client"
import BasicTable from './components/BasicTable';
import { RouteContext } from './context/transferRoute';
import { SlideOutContext } from './context/slideOut';
import { TransferContext } from './context/transfers';
import { BalancesContext } from './context/balances';

export default function Home() {
  return (
    <RouteContext>
      <SlideOutContext>
        <TransferContext>
          <BalancesContext>
            <div className="h-full">
              <BasicTable />
            </div>
          </BalancesContext>
        </TransferContext>
      </SlideOutContext>
    </RouteContext>
  )
}
