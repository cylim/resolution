'use client'
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem } from "@nextui-org/react"
import React, { useEffect, useState } from "react"
import { setDoc } from "@junobuild/core-peer";
import { ITask } from "@/config/scheme";
import { Input } from "@nextui-org/react";
import { charities } from "@/config/charities";
import { parseEther } from 'viem';
import Contracts from "@/contracts";
import toast from "react-hot-toast";
import { useAccount } from "wagmi";
import { prepareWriteContract, writeContract } from "wagmi/actions";
import { chain } from "@/config/viem";

export const ChallengeCreateModal = () => {
  const [opened, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [valid, setValid] = useState(false)
  const [title, setTitle] = useState("")
  const [donationAddress, setDonationAddress] = useState<any>(new Set([]))
  const [amount, setAmount] = useState("")
  const [deadline, setDeadline] = useState<any>(new Date(+new Date() + 24 * 60 * 60 * 1000))
  const { address } = useAccount();
  useEffect(() => {
    console.log(opened, 'opened')
  }, [opened])

  useEffect(() => {
    const [dAddr] = donationAddress
    setValid(
      !!title
      && +new Date(deadline) > +new Date()
      && !!address
      && +amount >= 0.001
      && !!dAddr
    );
  }, [title, address, donationAddress, deadline, amount]);

  const reload = () => {
    let event = new Event("reload");
    window.dispatchEvent(event);
  };

  const add = async () => {
    setLoading(true);

    try {
      if (!address) {
        throw new Error('No user or provider')
      }

      const key = `${address}-${+new Date()}`;
      const [dAddr] = donationAddress

      toast('Creating challenge task...')
      await setDoc<ITask>({
        collection: "tasks",
        doc: {
          key,
          data: {
            keyId: key,
            userAddress: address || '',
            title: title,
            status: 'pending',
            amount: amount || '0',
            donationAddress: dAddr,
            deadlineTimestamp: +new Date(deadline),
            completionTimestamp: 0,
            proofUrl: '',
          },
        },
      });

      toast('pledging token for completion...', { duration: 10000 })
      const contract = Contracts[chain.name].challenge;
      const { request } = await prepareWriteContract({
        abi: contract.abi,
        functionName: "create",
        args: [key, dAddr, BigInt(+new Date(deadline) / 1000)],
        address: contract.address,
        value: parseEther(amount)
      })

      const { hash } = await writeContract(request)
      toast(`Created: ${hash}`)

      setOpen(false);
      reload();
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  if (!address) {
    return null
  }
  const currentDate = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate() + 1}`

  return <>
    <div className="mt-10 flex items-center justify-center gap-x-6">
      <Button
        onClick={() => setOpen(true)}
        className="primary-button"
      >
        Add Challenge
      </Button>
    </div>
    <Modal isOpen={opened} onOpenChange={setOpen} scrollBehavior={'outside'} backdrop={'blur'} onClose={() => setOpen(false)} hideCloseButton classNames={{
      backdrop: "bg-gradient-to-t from-zinc-950 to-zinc-950/10 backdrop-opacity-100 brightness-50 backdrop-blur-md",
      base: "bg-transparent max-w-lg shadow-none",
    }}>
      <ModalContent className="border-0 border-transparent ">
        <ModalHeader className="flex flex-col" >
          <h3 className="text-center text-xl text-white/50 font-bold">New Challenge!</h3>
        </ModalHeader>
        <ModalBody>
          <div className="py-16 flex flex-col gap-4">
            <Input variant={'faded'} label="Title" placeholder="What is your challenge about?" isRequired value={title} onValueChange={setTitle} />
            <Input variant={'faded'} label="Deadline" placeholder="When you should finish it?" type="date" isRequired min={currentDate} value={deadline} onValueChange={setDeadline} />
            <Input variant={'faded'} label="Staked Amount" placeholder="If not finished on time, how much will you donate?" type="number" min={0.001} step={0.001} isRequired value={amount} onValueChange={setAmount} endContent={
              <span>{chain.nativeCurrency.symbol}</span>
            } />
            <Select
              variant={'faded'}
              label="Staked to"
              placeholder="select an organization to donate if failed"
              isRequired selectedKeys={donationAddress} onSelectionChange={setDonationAddress}
            >
              {charities.map((c) => (
                <SelectItem key={c.walletAddress} value={c.walletAddress} textValue={c.title}>
                  <p>{c.title}</p>
                  <p>{c.walletAddress}</p>
                </SelectItem>
              ))}
            </Select>
          </div>
          <div className="modal-terms">
            <Button radius="full" onClick={add} isLoading={loading} isDisabled={!valid} color="primary" className="primary-button">
              Create
            </Button>
            <Button radius="full" onClick={() => setOpen(false)} className="primary-button bg-none !animate-none !transition-none !bg-[#272727] !mt-4">Cancel</Button>
          </div>
        </ModalBody>
        <ModalFooter className="flex flex-col text-center w-full">
          <h2>What Happens?</h2>
          <p className="terms-conditions">Donation to charity if failed to complete on time.</p>
          <p className="terms-conditions">Complete the challenge within deadline to earn some points!</p>
        </ModalFooter>
      </ModalContent>
    </Modal>
  </>
}

export default ChallengeCreateModal

export const MemoizedChallengeCreateModal = React.memo(ChallengeCreateModal);
