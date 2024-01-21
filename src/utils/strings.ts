export const truncate = (addr: string, count = 4): string => `${addr.substring(0, count + 2)}...${addr.substring(addr.length - count)}`

export const formatAddress = (addr: string, count = 4): string =>
  addr?.length >= 42 && addr?.startsWith('0x')
    ? truncate(addr, count)
    : addr

export const addHexPrefix = (value: string): `0x${string}` => {
  return (value?.slice(0, 2) === '0x' ? value : `0x${value}`) as `0x${string}`
}

export const isValidAddr = (address: string | undefined | null, addPrefix: boolean = false) => {
  if (!address) {
    return false
  }
  let addr = address
  if (addPrefix) {
    addr = addHexPrefix(address)
  }
  const re = /^0x[a-fA-F0-9]{40}$/
  return addr?.match(re) || false
}