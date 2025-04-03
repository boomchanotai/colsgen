import { PromptColumn } from "@/types"
import { Info } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface PromptColumnCardProps {
  col: PromptColumn
  handleSetColumnPrompt: (id: string, value: string) => void
  isGenerating: boolean
  handleGenerateColumn: (col: PromptColumn) => void
}

export const PromptColumnCard = (props: PromptColumnCardProps) => {
  const { col, handleSetColumnPrompt, isGenerating, handleGenerateColumn } =
    props

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isGenerating) return

    handleGenerateColumn(col)
  }

  return (
    <form
      className="space-y-4 rounded-md border bg-white/50 p-4"
      onSubmit={handleSubmit}
    >
      <div className="flex items-center gap-2">
        <Label>Prompt for {col.name}</Label>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Info className="size-4" />
            </TooltipTrigger>
            <TooltipContent>
              <p>{"Use {{column_name}} to refer text from your column"}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <Input
        value={col.prompt}
        onChange={(e) => {
          const value = e.target.value
          handleSetColumnPrompt(col.id, value)
        }}
        placeholder="generate {{column_name}} description for me"
        required
      />
      <p className="text-xs text-gray-500"></p>
      <div className="flex justify-end">
        <Button type="submit" className="gap-2" disabled={isGenerating}>
          Generate Column
        </Button>
      </div>
    </form>
  )
}
