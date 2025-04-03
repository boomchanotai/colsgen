import { useState } from "react"

import { useApiKeyStore } from "@/stores/api-key"
import { Info } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export const SetApiKeyDialog = () => {
  const { setApiKey, open, setOpen } = useApiKeyStore()

  const [key, setKey] = useState("")

  const handleAddApiKey = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()

    setApiKey(key)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <form className="space-y-4" onSubmit={handleAddApiKey}>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <span>Gemini API Key</span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="size-4" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-center">
                      We will not store your api key in our server!
                    </p>
                    <p className="text-center">just persist in your browser.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-1">
            <Input
              placeholder="Gemini API Key"
              className="col-span-3"
              onChange={(e) => setKey(e.target.value)}
              value={key}
              required
              autoFocus
            />
            <p className="text-xs text-gray-500">
              Get your api key at{" "}
              <Link
                href="https://aistudio.google.com/apikey"
                className="underline"
                target="_blank"
              >
                Google AI Studio
              </Link>
            </p>
          </div>

          <DialogFooter>
            <Button type="submit">save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
