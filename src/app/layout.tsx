import { Viewport } from "next";
import "./globals.css";
import { Roboto } from "next/font/google";
import React from 'react'

const roboto = Roboto({ subsets: ["latin"], weight: ['100', '300', '400', '500', '700', '900'] });

export const metadata = {
  metadataBase: new URL('https://re.cyl.im'),
  title: "Resolution",
  description: "self challenging and make a different!",
  other: {
    'msapplication-TileColor': '#000',
  },
  openGraph: {
    type: "website",
    url: "https://re.cyl.im",
    title: 'Resolution',
    description: 'self challenging and make a different!',
    siteName: `Re:`,
    images: [{
      url: "/icon.png",
      type: "website",
      width: 512,
      height: 512,
    }],
  },
  twitter: {
    card: "summary_large_image",
    site: `@cylim226`,
    creator: `@cylim226`,
    images: [{
      url: "/icon.png",
    }]
  }
};

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

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'black' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  colorScheme: 'dark',
}

