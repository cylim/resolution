import * as React from 'react'
import { WagmiConfig } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { config } from '@/config/wagmi'
import dynamic from 'next/dynamic';

const ConnectProvider = dynamic(async () => (await import('@/components/auth/ConnectProvider')).ConnectProvider, { ssr: false })
const queryClient = new QueryClient();

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiConfig config={config}>
          <ConnectProvider>{children}</ConnectProvider>
      </WagmiConfig>
    </QueryClientProvider>
  )
}

export default Provider