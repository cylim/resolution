"use client";

import Footer from "@/layouts/Footer";
import Header from "@/layouts/Header";
import { NextUIProvider } from "@nextui-org/react";
import { Toaster } from "react-hot-toast";
import redpandaImg from '@/assets/images/redpanda.jpg';

export default function Home() {

  return (
    <NextUIProvider>
      <div className="min-h-screen background overflow-y-auto bg-cover bg-center bg-[#00000090] bg-blend-hue overflow-x-hidden" style={{ backgroundImage: `url(${redpandaImg.src})` }}>
        <Header />
        <main>
          <div className="relative px-0 md:px-4 lg:px-8">
            <div className="mx-auto max-w-2xl pt-10">
              <div className="text-center">
                <p>Hello, World!</p>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
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
