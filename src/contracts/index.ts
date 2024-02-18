import { scrollSepolia } from 'viem/chains'

import fulgensABI from './abis/fulgens'
import challengeABI from './abis/challenge'

export type SupportedNetworks = 'typeDef' | 'Scroll Sepolia'
type SupportedContracts = 'fulToken' | 'challenge'

interface IContract {
  address: string
  abi: any
  chainId: number
}

export const Contracts = {
  [scrollSepolia.name]: {
    fulToken: {
      address: '0x765D0C57b993D3eD180001b817a6bCc13Ce7044e',
      abi: fulgensABI,
      chainId: scrollSepolia.id,
    },
    challenge: {
      address: '0x0d36FfaA0711B805498675CDbF40607b48c85653',
      abi: challengeABI,
      chainId: scrollSepolia.id,
    },
  },
  'typeDef': {
    fulToken: {
      address: '0xAbc' as `0x${string}`,
      abi: fulgensABI,
      chainId: 0 as number,
    },
    challenge: {
      address: '0xAbc' as `0x${string}`,
      abi: challengeABI,
      chainId: 0 as number,
    },
  },
} as const satisfies {[key in SupportedNetworks]: {[key in SupportedContracts]: IContract}}

export default Contracts


// "a","0xAbB840EF2f94925e957B6680541793565d63f228",1704379627
