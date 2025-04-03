import { Dispatch, SetStateAction, useState } from "react"

import { PromptColumn } from "@/types"
import { LoaderCircle } from "lucide-react"

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

  return (
    <div className="space-y-4 rounded-md border bg-white/50 p-4">
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
      />
      <Button
        size="sm"
        className="w-full gap-2"
        disabled={isGenerating}
        onClick={() => handleGenerateColumn(col)}
      >
        Generate All for This Column
      </Button>
    </div>
  )
}
