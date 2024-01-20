"use client";

import { NextUIProvider } from "@nextui-org/react";
import { Toaster } from "react-hot-toast";


export default function Home() {

  return (
    <NextUIProvider>
      <main>
        <p>Hello, World!</p>
      </main>
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
