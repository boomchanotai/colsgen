import { Dispatch, SetStateAction } from "react"

import { PromptColumn } from "@/types"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface PromptColumnCardProps {
  col: PromptColumn
  setPromptColumns: Dispatch<SetStateAction<PromptColumn[]>>
  isGenerating: boolean
  handleGenerateColumn: (col: PromptColumn) => void
}

export const PromptColumnCard = (props: PromptColumnCardProps) => {
  const { col, setPromptColumns, isGenerating, handleGenerateColumn } = props

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
          setPromptColumns((prev) =>
            prev.map((column) =>
              column.id === col.id ? { ...column, prompt: value } : column
            )
          )
        }}
        placeholder="prompt"
        required
      />
      <div className="flex justify-end">
        <Button
          type="submit"
          className="gap-2"
          disabled={isGenerating}
          onClick={() => handleGenerateColumn(col)}
        >
          Generate Column
        </Button>
      </div>
    </form>
  )
}
