import { Dispatch, SetStateAction, useCallback, useState } from "react"

import { PromptColumn } from "@/types"
import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

interface AddColumnDialogProps {
  setPromptColumns: Dispatch<SetStateAction<PromptColumn[]>>
}

export const AddColumnDialog = (props: AddColumnDialogProps) => {
  const { setPromptColumns } = props

  const [open, setOpen] = useState(false)

  const [colName, setColName] = useState("")

  const handleAddColumn = useCallback(
    (e: React.SyntheticEvent<HTMLFormElement>) => {
      e.preventDefault()

      if (!colName) return

      const newColumn: PromptColumn = {
        id: `col_${Date.now()}`,
        name: colName,
        prompt: "",
      }
      setPromptColumns((prev: PromptColumn[]) => [...prev, newColumn])
      setColName("")
      setOpen(false)
    },
    [colName]
  )

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="size-4" />
          <span>Add Column</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form className="space-y-4" onSubmit={handleAddColumn}>
          <DialogHeader>
            <DialogTitle>Add Column</DialogTitle>
          </DialogHeader>

          <div>
            <Input
              placeholder="Column name"
              className="col-span-3"
              onChange={(e) => setColName(e.target.value)}
              value={colName}
            />
          </div>

          <DialogFooter>
            <Button type="submit">Add</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
