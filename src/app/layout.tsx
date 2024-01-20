import "./globals.css";
import { Roboto } from "next/font/google";
import React from 'react'

const roboto = Roboto({ subsets: ["latin"], weight: ['100', '300', '400', '500', '700', '900'] });

export default async function Root({
  children,
}: {
  children: React.ReactElement
}) {

  return (
    <html lang="en" className='dark'>
      <body className={roboto.className}>
          {children}
      </body>
    </html>
  )
}
