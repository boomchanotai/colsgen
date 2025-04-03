import { Dispatch, SetStateAction, useState } from "react"

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

interface AddApiKeyDialog {
  setApiKey: Dispatch<SetStateAction<string>>
}
export const AddApiKeyDialog = (props: AddApiKeyDialog) => {
  const { setApiKey } = props

  const [open, setOpen] = useState(false)

  const [key, setKey] = useState("")

  const handleAddApiKey = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()

    setApiKey(key)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="gap-2">
          <span>Add your API Key</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form className="space-y-4" onSubmit={handleAddApiKey}>
          <DialogHeader>
            <DialogTitle>Gemini API Key</DialogTitle>
          </DialogHeader>

          <div>
            <Input
              placeholder="Gemini API Key"
              className="col-span-3"
              onChange={(e) => setKey(e.target.value)}
              value={key}
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
