import { ReactNode } from "react"

import { ArrowRight } from "lucide-react"
import Link from "next/link"

interface FeatureCardProps {
  title: string
  icon: ReactNode
  description: string
  link: string
}

export const FeatureCard = (props: FeatureCardProps) => {
  const { title, icon, description, link } = props
  return (
    <div className="flex flex-col gap-4">
      <div className="bg-primary flex size-10 items-center justify-center rounded-md text-white">
        {icon}
      </div>
      <div className="space-y-2">
        <h2 className="font-semibold">{title}</h2>
        <p className="text-sm">{description}</p>
      </div>
      <div>
        <Link
          href={link}
          className="text-primary flex items-center gap-2 text-sm font-medium"
        >
          <span>Start now</span> <ArrowRight className="size-4" />
        </Link>
      </div>
    </div>
  )
}
