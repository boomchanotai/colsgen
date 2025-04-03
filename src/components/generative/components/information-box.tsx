import { ReactNode } from "react"

interface InformationBoxProps {
  title: string
  icon: ReactNode
  description: string
}
export const InformationBox = (props: InformationBoxProps) => {
  const { icon, title, description } = props
  return (
    <div className="flex max-h-16 min-w-40 items-center rounded-md border bg-white p-3">
      <div className="flex items-center gap-3">
        <div>
          <div className="rounded-md border bg-white p-1">{icon}</div>
        </div>
        <div className="space-y-1">
          <h2 className="text-sm font-medium">{title}</h2>
          <div className="text-xs text-gray-500">{description}</div>
        </div>
      </div>
    </div>
  )
}
