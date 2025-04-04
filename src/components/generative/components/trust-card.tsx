import { ReactNode } from "react"

interface TrustCardProps {
  icon: ReactNode
  title: string
  description: string
}

export const TrustCard = (props: TrustCardProps) => {
  const { icon, title, description } = props

  return (
    <div className="flex items-center gap-4">
      <div className="text-primary">{icon}</div>
      <div className="space-y-2">
        <h2 className="text-primary text-lg font-semibold">{title}</h2>
        <p>{description}</p>
      </div>
    </div>
  )
}
