import { scrollSepolia } from 'viem/chains'
import { createPublicClient, http } from 'viem'

export const chain = scrollSepolia
export const publicClient = createPublicClient({
  chain: scrollSepolia,
  transport: http()
})