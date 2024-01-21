export type StatusType = 'pending' | 'completed' | 'failed'

export interface ITask  {
  title: string
  status: StatusType
  proofUrl: string
  userAddress: string
  keyId: string
  donationAddress: string,
  amount:string,
  completionTimestamp: number
  deadlineTimestamp: number
  txHash?: string
} 

