
export const Box = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return <div className={`box-wrapper w-96 min-w-min max-w-2xl ${className}`}>
    {children}
  </div>
}

export default Box