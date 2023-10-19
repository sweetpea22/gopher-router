"use client"
import { WagmiConfig } from "wagmi";
import { RainbowKitProvider, getDefaultWallets } from '@rainbow-me/rainbowkit'
import { configureChains, createConfig } from 'wagmi'
import { mainnet, goerli, baseGoerli, scrollSepolia, sepolia } from 'wagmi/chains'
import { infuraProvider } from '@wagmi/core/providers/infura'
import { publicProvider } from 'wagmi/providers/public'
import { useEffect, useState } from "react";
import '@rainbow-me/rainbowkit/styles.css';


const INFURA_API_KEY = process.env.NEXT_PUBLIC_INFURA_API_KEY;

const { chains, publicClient } = configureChains(

  [mainnet, goerli, baseGoerli, scrollSepolia, sepolia],
  [infuraProvider({ apiKey: INFURA_API_KEY as string }),  publicProvider(), publicProvider()],
)

const { connectors } = getDefaultWallets({
  appName: 'Gopher Router/Wallet',
  chains,
  projectId: 'e3663f0003d810dcbaf4851d2a9f2554'
})

export const config = createConfig({
  autoConnect: true,
  connectors,
  publicClient
})

export default function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  
  return (
    <WagmiConfig config={config}>
      <RainbowKitProvider chains={chains}>
        {mounted && children}
      </RainbowKitProvider>
    </WagmiConfig>
  )
}