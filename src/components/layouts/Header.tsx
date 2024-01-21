import NextImage from 'next/image'
import reLogo from '@/assets/logo/logo.png'
import dynamic from "next/dynamic";

const ConnectKitButton = dynamic(async () => (await import('connectkit')).ConnectKitButton, { ssr: false })

export const Header = async () => {

  return <header className={'py-4 flex flex-col gap-2 px-2 lg:px-4'}>
    <div className={'flex flex-row items-center justify-between w-full'}>
      <NextImage src={reLogo} alt={'re: logo'} width={48} height={48} />
      <ConnectKitButton />
    </div>
  </header>
}

export default Header