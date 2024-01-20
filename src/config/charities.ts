export type CharityType = {
  title: string,
  walletAddress: string
}

export const charities = [
  {
    title: 'Plant a Red Panda Home',
    walletAddress: '0xF847EB8ffFa5cADf96d59e206C8F2925a1FF6006'
  },
  {
    title: 'No Panda Poaching',
    walletAddress: '0xAbB840EF2f94925e957B6680541793565d63f228'
  },
  {
    title: 'Fulgens DAO',
    walletAddress: '0x9EfF95aE55bd46b86EE43f79780D5C73A95Fd3f0'
  },
] as const satisfies CharityType[]
