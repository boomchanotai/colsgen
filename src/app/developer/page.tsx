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

export default function Developer() {
  return (
    <div className="flex">
      <form className="w-96 space-y-4 rounded-md border bg-white/50 p-4">
        <div className="flex items-center gap-2">
          <Label>Prompt for Description</Label>
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
          placeholder="generate {{column_name}} description for me"
          required
        />
        <p className="text-xs text-gray-500"></p>
        <div className="flex justify-end">
          <Button type="submit" className="gap-2">
            Generate Column
          </Button>
        </div>
      </form>
    </div>
  )
}
