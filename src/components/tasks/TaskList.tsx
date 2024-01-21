"use client";

import { useEffect, useState } from "react";
import { Doc, listDocs } from "@junobuild/core-peer";
import { ITask } from "@/config/scheme";
import Box from "@/components/layouts/Box";
import { TaskItem } from "./TaskItem";
import { useAccount } from "wagmi";
import { ConnectKitButton } from "connectkit";
import dynamic from "next/dynamic";

const ChallengeCreateModal = dynamic(async () => (await import('@/components/modals/ChallengeCreateModal')).MemoizedChallengeCreateModal, { ssr: false })

export const TaskList = () => {
  const { address, isConnected } = useAccount()
  const [items, setItems] = useState<Doc<ITask>[]>([]);

  useEffect(() => {
    window.addEventListener("reload", list);

    return () => {
      window.removeEventListener("reload", list);
    };
  }, []);

  const list = async () => {
    if (!address) return

    const { items } = await listDocs<ITask>({
      collection: "tasks",
      filter: {
        order: {
          desc: true,
          field: 'created_at'
        },
      },
    });

    setItems(items.filter(v => v.data.userAddress === address));
  };

  useEffect(() => {
    if (!address) {
      setItems([]);
      return;
    }

    (async () => await list())();
  }, [address]);

  const renderTaskItem = ({ key, data, created_at, updated_at }: Doc<ITask>) => {
    return <TaskItem key={key} item={data} createdAt={created_at} updatedAt={updated_at} />
  }

  return (
    <Box className="w-full max-w-2xl mx-auto shadow-lg mt-8">
      <header className="px-5 py-4 border-b border-gray-100">
        <h2 className="font-semibold text-gray-800 text-4xl">Resolution</h2>
      </header>
      <div className="py-3">
        <div className="overflow-x-auto">
          {!items.length ? <div className="py-8">
            <h1 className="text-9xl py-4">🧗‍♂️</h1>
            <span className="text-xl text-stone-900">Create a challenge, step out of comfort zone!</span>
          </div> : null}
          <div className="max-h-[320px] overflow-y-auto">
            {items.map(renderTaskItem)}
          </div>
        </div>
      </div>
      {!isConnected ? <div className="flex flex-col items-center"><ConnectKitButton /></div> : <ChallengeCreateModal/>}

    </Box>
  );
};
