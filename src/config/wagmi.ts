import { getDefaultConfig } from 'connectkit'
import { configureChains, createConfig } from 'wagmi'
import { sepolia as sep } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'
import { chain } from './viem'

const walletConnectProjectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || 'ad88a7fba1ca3be8bd78d6c719fc304a'

const chains = process.env.NEXT_PUBLIC_NODE_ENV === 'production' ? [sep] : [sep]

const { publicClient } = configureChains(chains, [publicProvider()])

export const config = createConfig({
  ...getDefaultConfig({
    publicClient,
    chains: [chain],
    autoConnect: true,
    appName: `${process.env.NEXT_PUBLIC_APP_NAME || 'Re:'}`,
    appUrl: `${process.env.NEXT_PUBLIC_APP_URL || 'https://re.cyl.im'}`,
    walletConnectProjectId,
  }),
  logger: {
    warn: null,
  },
}
)

