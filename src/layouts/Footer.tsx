import NextImage from 'next/image'
import { Link } from '@nextui-org/react'
import reLogo from '@/assets/logo/logo.png'

type ISocial = {
  name: string,
  url: string,
}

const social = [
  {
    name: 'Github',
    url: `https://github.com/cylim/resolution`,
  },
  {
    name: 'About me',
    url: `https://cyl.im/me`,
  },
] as const satisfies readonly ISocial[]

export const Footer = async () => {

  return <footer className={'pb-6 relative flex flex-col items-center overflow-hidden px-2 lg:px-4'}>
    <div className={'flex flex-col items-center justify-center w-full relative z-10 gap-12 xl:max-w-7xl '}>
      <div className='flex flex-col justify-between items-center flex-wrap w-full gap-4'>
        <NextImage src={reLogo} alt={'re: logo'} width={64} height={64} />
        <div className={'flex flex-row gap-4'}>
          {social.map(s => <Link key={s.name} href={s.url} target='_blank' rel="noopener" isExternal>{s.name}</Link>)}
        </div>
      </div>
    </div>

  </footer>
}

export default Footer