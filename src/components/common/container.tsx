import { cn } from "@/lib/utils"

interface ContainerProps {
  children: React.ReactNode
  className?: string
}

export const Container = (props: ContainerProps) => {
  const { children, className } = props
  return (
    <section className={cn("mx-auto max-w-7xl px-8", className)}>
      {children}
    </section>
  )
}
