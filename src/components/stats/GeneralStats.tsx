import { charities } from "@/config/charities"
import { StatCard } from "./StatCard"

const colors = ['red', 'blue']

const items = [
  { title: 'Donated', accounts: charities.filter(c => !!c.isCharity).map(c => c.walletAddress) },
  { title: 'DAO Funded', accounts: charities.filter(c => !!c.isDAO).map(c => c.walletAddress) },
]

export const GeneralStats = () => {

  const renderCard = (item: typeof items[0], index: number) => {
    return <StatCard key={item.title} item={item} color={colors[index % colors.length]} />
  }

  return <section className="flex flex-col items-center w-full pt-16">
    <a id="networks" />
    <div className="flex flex-row flex-wrap items-center justify-center w-full gap-5 py-8">
      {items.map(renderCard)}
    </div>
  </section>
}