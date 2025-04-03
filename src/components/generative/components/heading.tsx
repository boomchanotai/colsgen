import { Dispatch, SetStateAction } from "react"

import { EllipsisVertical, File, Pause, Share2 } from "lucide-react"

import { Button } from "@/components/ui/button"

interface HeadingProps {
  fileName: string
  lastModified: number
  handleExport: () => void
  isGenerating: boolean
  setCancelRequested: Dispatch<SetStateAction<boolean>>
}

export const Heading = (props: HeadingProps) => {
  const {
    fileName,
    lastModified,
    handleExport,
    isGenerating,
    setCancelRequested,
  } = props

  return (
    <div className="flex items-center justify-between gap-8">
      <div className="flex items-center gap-4">
        <div>
          <File className="size-6" />
        </div>
        <div>
          <h1 className="text-lg font-bold">{fileName}</h1>
          <div className="text-xs text-gray-500">
            <p>
              Last Modified at{" "}
              {new Date(lastModified).toLocaleTimeString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {isGenerating ? (
          <Button
            onClick={() => setCancelRequested(true)}
            variant="destructive"
          >
            <Pause className="size-4" />
          </Button>
        ) : null}
        <Button onClick={handleExport}>Export as CSV</Button>
        <Button size="icon" variant="secondary">
          <EllipsisVertical className="size-4" />
        </Button>
      </div>
    </div>
  )
}
