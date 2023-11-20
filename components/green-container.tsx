function GreenContainer({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <section className={`mt-10 h-auto rounded-md bg-primary p-5 ${className}`}>
      {children}
    </section>
  )
}

export default GreenContainer
