import { ConnectButton } from '@rainbow-me/rainbowkit'
import { centeredDiv, standardButton } from '../styles/styles'

export default function BasicTable() { 
  return (
    <div className={`${centeredDiv} bg-gray-200 py-10`}>
      <ConnectButton />
      <div className='my-4'>
        <h1 className='text-gray-600'>Demo case: I want to transfer 0.1 eth to [address]. Which way is cheaper?</h1>
      </div>
      <button
        onClick={() => {console.log('hi')}}
        type='button'
        className={`${standardButton} my-5`}>
        Get quotes
      </button>
    </div>
  )
}