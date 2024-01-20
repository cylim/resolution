import { useEffect, useState } from 'react'
import { publicClient, chain } from '@/config/viem'
import { formatEther } from 'viem'

export const StatCard = ({ item, color }: { item: any, color: string }) => {
  const [amount, setAmount] = useState(BigInt(0))

  useEffect(() => {
    window.addEventListener("reloadFund", update);

    return () => {
      window.removeEventListener("reloadFund", update);
    };
  }, []);

  const update = async () => {
    if (!publicClient) { return }
    (async () => {
      const amounts = await Promise.all(
        item.accounts.map((addr: `0x${string}`) => publicClient.getBalance({ address: addr }))
      )
      setAmount(amounts.reduce((prev, cur) => prev + cur, BigInt(0)))
    })();
  }

  useEffect(() => {
    update()
  }, [publicClient])

  return <div
    className={`card-${color} h-[180px] md:w-[320px] w-full rounded-[48px] px-8 py-10 shadow`}
  >
    <div className={'relative h-full w-full rounded-[48px]'}>
      <section className={`absolute transition-opacity duration-1000 overflow-hidden text w-full h-full`}>
        <div className={'flex flex-col justify-between w-full h-full'}>
          <div className={'flex flex-row justify-between items-center'}>
            <span className="text-base font-bold tracking-wide uppercase">{item.title}</span>
          </div>
          <span className={'font-medium text-5xl tracking-tight leading-normal text-center'}>{formatEther(amount)} <span className={'font-medium text-xl tracking-tight leading-normal text-center'}>{chain.nativeCurrency.symbol}</span></span>
        </div>
      </section>
    </div>
  </div>
}