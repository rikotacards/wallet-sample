import { http, createConfig } from 'wagmi'
import {  avalancheFuji } from 'wagmi/chains'
import { coinbaseWallet, injected, walletConnect } from 'wagmi/connectors'

export const config = createConfig({
  chains: [avalancheFuji],
  connectors: [
    injected(),
    coinbaseWallet({ appName: 'Create Wagmi' }),
    walletConnect({ projectId: import.meta.env.VITE_WC_PROJECT_ID }),
  ],
  transports: {
    [avalancheFuji.id]: http(),
  },
})

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}
