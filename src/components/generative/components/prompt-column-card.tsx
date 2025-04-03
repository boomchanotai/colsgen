import { Dispatch, SetStateAction } from "react"

import { PromptColumn } from "@/types"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

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
      <Label>Prompt for {col.name}</Label>
      <Input
        value={col.prompt}
        onChange={(e) => {
          const value = e.target.value
          handleSetColumnPrompt(col.id, value)
        }}
        placeholder="prompt"
        required
      />
      <div className="flex justify-end">
        <Button type="submit" className="gap-2" disabled={isGenerating}>
          Generate Column
        </Button>
      </div>
    </form>
  )
}
