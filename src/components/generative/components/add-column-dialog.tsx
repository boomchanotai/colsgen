import { useCallback, useState } from "react"

import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

interface AddColumnDialogProps {
  handleAddColumn: (colName: string) => void
}

export const AddColumnDialog = (props: AddColumnDialogProps) => {
  const { handleAddColumn } = props

  const [open, setOpen] = useState(false)

  const [colName, setColName] = useState("")

  const addColumn = useCallback(
    (e: React.SyntheticEvent<HTMLFormElement>) => {
      e.preventDefault()

      if (!colName) return
      handleAddColumn(colName)
      setColName("")
      setOpen(false)
    },
    [colName, handleAddColumn]
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
        <form className="space-y-4" onSubmit={addColumn}>
          <DialogHeader>
            <DialogTitle>Add Column</DialogTitle>
          </DialogHeader>

          <div>
            <Input
              placeholder="Column name"
              className="col-span-3"
              onChange={(e) => setColName(e.target.value)}
              value={colName}
              required
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
