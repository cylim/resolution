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
      address: '0x7e3c1F73F267Ec0789df187915f5E473ECc4aB80',
      abi: fulgensABI,
      chainId: scrollSepolia.id,
    },
    challenge: {
      address: '0x1E0436DDe892910827a5491e2691656Bc3D4E011',
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
