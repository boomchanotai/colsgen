import { useApiKeyStore } from "@/stores/api-key"
import { useFileStore } from "@/stores/file"
import { EllipsisVertical, File, Pause } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface HeadingProps {
  fileName: string
  lastModified: number
  handleExport: () => void
  isGenerating: boolean
  handleCancel: () => void
}

export const Heading = (props: HeadingProps) => {
  const { fileName, lastModified, handleExport, isGenerating, handleCancel } =
    props

  const { setOpen: setOpenApiKeyDialog } = useApiKeyStore()
  const { clearFile } = useFileStore()

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
          <Button onClick={handleCancel} variant="destructive">
            <Pause className="size-4" />
          </Button>
        ) : null}
        <Button onClick={handleExport}>Export as CSV</Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="secondary">
              <EllipsisVertical className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Gemini</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => setOpenApiKeyDialog(true)}
              className="cursor-pointer"
            >
              Set API Key
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => clearFile()}
              className="cursor-pointer"
            >
              Clear File
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
