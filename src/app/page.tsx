"use client"
import SampleWalletPortfolio from './components/SampleWalletPortfolio'
import SlideOut from './components/SlideOut'

export default function Home() {
  return (
    <div className="h-full">
      <SampleWalletPortfolio/>
      <SlideOut />
    </div>
  )
}
