import * as React from 'react'
import { type WalletClient, useWalletClient } from 'wagmi'
import { providers } from 'ethers'

export function walletClientToSigner(walletClient: WalletClient) {
  const { account, chain, transport } = walletClient
  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  }
  // any is dangerous, but we like danger
  // It doesn’t complain if the network changes. But things are bad. Like, don’t use events.
  // And if the user switches networks while a tx is being filled in, you could have the nonce from one network sent to another.
  const provider = new providers.Web3Provider(transport, "any")
  const signer = provider.getSigner(account.address)
  return signer
}

/** Hook to convert a viem Wallet Client to an ethers.js Signer. */
export function useEthersSigner({ chainId }: { chainId?: number } = {}) {
  const { data: walletClient } = useWalletClient({ chainId })
  return React.useMemo(
    () => (walletClient ? walletClientToSigner(walletClient) : undefined),
    [walletClient],
  )
}
