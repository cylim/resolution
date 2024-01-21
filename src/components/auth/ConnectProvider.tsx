"use client";
import { ConnectKitProvider } from "connectkit"

export function ConnectProvider({ children }: { children: React.ReactNode }) {

  return (
    <ConnectKitProvider>
      {children}
    </ConnectKitProvider>
  )
}

export default ConnectProvider