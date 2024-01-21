'use client'
import { WagmiConfig } from 'wagmi'
import { config } from '@/config/wagmi'
import dynamic from "next/dynamic";
import { useEffect } from 'react';
import { initJuno } from '@junobuild/core-peer';
import { SATELITE_ID } from '@/config/env';

const ConnectProvider = dynamic(async () => (await import('@/components/auth/ConnectProvider')).ConnectProvider, { ssr: false })

export function AuthProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    (async () =>
      await initJuno({
        satelliteId: SATELITE_ID,
      }))();
  }, []);

  return (
    <WagmiConfig config={config}>
      <ConnectProvider>
        {children}
      </ConnectProvider>
    </WagmiConfig>
  )
}

export default AuthProvider