"use client";

import { useEffect, useState } from "react";
import Box from "@/components/layouts/Box"
import { formatAddress } from "@/utils/strings";
import CopyIcon from '@/assets/icons/copy.svg'
import { chain, publicClient } from "@/config/viem";
import { formatEther } from 'viem'
import Contracts from "@/contracts";
import { Link } from "@nextui-org/react";
import { useAccount } from "wagmi";
import numeral from 'numeral'

const BalanceCard = ({ token, contract }: { token: string, address: `0x${string}`, contract?: typeof Contracts.typeDef.fulToken }) => {
  const { address } = useAccount();
  const [amount, setAmount] = useState(BigInt(0))

  useEffect(() => {
    window.addEventListener("reloadUser", update);

    return () => {
      window.removeEventListener("reloadUser", update);
    };
  }, []);

  const update = async () => {
    if (!publicClient || !address) { return }

    let bal = BigInt(0)
    if (!!contract) {
      const data = await publicClient.readContract({
        ...contract,
        functionName: 'balanceOf',
        args: [address]
      })
      bal = data
    } else {
      bal = await publicClient.getBalance({ address })
    }
    setAmount(bal)
  }

  useEffect(() => {
    update()
  }, [publicClient, address, contract])

  return <div
    className={`md:w-[200px] w-full`}
  >
    <section className={`transition-opacity duration-1000 overflow-hidden text w-full h-full`}>
      <span className={'font-medium text-4xl tracking-tight leading-normal text-center'}>{numeral(formatEther(amount)).format('0[.]0[00000]a')} <span className={'font-medium text-lg tracking-tight leading-normal text-center'}>{token}</span></span>
    </section>
  </div>
}

export const UserDetail = () => {
  const { address } = useAccount();
  const [copied, setCopied] = useState(false);

  if (!address) { return null }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  }

  return <Box className="w-full max-w-2xl mx-auto shadow-lg mt-8 card-black">
    <header className="px-5 py-2 border-b border-gray-100 cursor-pointer" onClick={handleCopy}>
      <h2 className="font-semibold text-4xl">{formatAddress(address || '')}
        <span className={'text-xs font-normal pl-2'}>{copied ? '(copied)' : <CopyIcon className={'inline-block'} />}</span>
      </h2>
    </header>
    <div className="flex flex-row flex-wrap items-center justify-center w-full gap-5 pt-8 pb-2">
      <BalanceCard token={chain.nativeCurrency.symbol} address={address} />
      <BalanceCard token={'FUL'} address={address} contract={Contracts[chain.name].fulToken} />
    </div>
    <div className={'pt-4'}>
      <p>Sepolia testnet <Link href={'https://www.infura.io/faucet/sepolia'} target="_blank" rel="noopener" isExternal>(faucet)</Link></p>
    </div>
  </Box>
}