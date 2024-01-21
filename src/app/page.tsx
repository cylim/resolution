"use client";

import Footer from "@/components/layouts/Footer";
import Header from "@/components/layouts/Header";
import { NextUIProvider } from "@nextui-org/react";
import { Toaster } from "react-hot-toast";
import redpandaImg from '@/assets/images/redpanda.jpg';
import dynamic from "next/dynamic";

const AuthProvider = dynamic(async () => (await import('@/components/auth/AuthProvider')).AuthProvider, { ssr: false })
const TaskList = dynamic(async () => (await import('@/components/tasks/TaskList')).TaskList, { ssr: false })
const UserDetail = dynamic(async () => (await import('@/components/auth/UserDetail')).UserDetail, { ssr: false })
const GeneralStats = dynamic(async () => (await import('@/components/stats/GeneralStats')).GeneralStats, { ssr: false })

export default function Home() {
  return (
    <NextUIProvider>
        <AuthProvider>  
          <div className="min-h-screen background overflow-y-auto bg-cover bg-center bg-[#00000090] bg-blend-hue overflow-x-hidden" style={{ backgroundImage: `url(${redpandaImg.src})` }}>
            <Header />
            <main>
              <div className="relative px-0 md:px-4 lg:px-8">
                <div className="mx-auto max-w-2xl pt-10">
                  <div className="text-center">
                    <TaskList />
                    <UserDetail />
                    <GeneralStats />
                  </div>
                </div>
              </div>
            </main>
            <Footer />
          </div>
        </AuthProvider>
      <Toaster
        toastOptions={{
          className: 'w-full',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
            padding: '8px',
          },
        }}
        position="bottom-center"
      />
    </NextUIProvider>
  );
}
