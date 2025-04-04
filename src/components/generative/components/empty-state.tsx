import { ChangeEvent, useRef } from "react"

import { cn } from "@/lib/utils"
import { useFileStore } from "@/stores/file"
import {
  Download,
  File,
  Handshake,
  KeyRound,
  Pause,
  ShieldCheck,
} from "lucide-react"
import { useDropzone } from "react-dropzone"
import { toast } from "sonner"

import { Container } from "@/components/common/container"

import { TrustCard } from "./trust-card"

export const EmptyState = () => {
  const { setFile } = useFileStore()

  const inputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (newFiles: File[]) => {
    if (newFiles.length === 0) {
      return
    }

    const file = newFiles[0]
    if (!file) return

    if (!file.name.endsWith(".csv")) {
      toast.error("Invalid file format. Please upload an CSV file.")
      return
    }

    setFile(file)
  }

  const { getRootProps, isDragActive } = useDropzone({
    multiple: false,
    noClick: true,
    onDrop: handleFileChange,
    onDropRejected: (error) => {
      console.log(error)
    },
  })

  return (
    <>
      <Container className="space-y-8">
        <h2 className="text-primary text-lg font-bold">
          Generative Data in your CSVs
        </h2>
        <div
          {...getRootProps()}
          className={cn(
            "border-primary flex min-h-72 cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed p-4 py-8",
            {
              "bg-primary/10": isDragActive,
            }
          )}
          onClick={() => inputRef.current?.click()}
        >
          <div>
            <File className="size-8" />
          </div>
          <div className="space-y-1 text-center">
            <p className="text-lg font-medium">Drag & drop your CSV here</p>
            <p className="text-sm text-gray-400">or click to browse files</p>
          </div>

          <div
            aria-hidden="true"
            className="absolute inset-x-0 -top-3 -z-10 transform-gpu overflow-hidden px-36 blur-3xl"
          >
            <div
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
              className="mx-auto aspect-1155/678 w-[72.1875rem] bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <TrustCard
            icon={<ShieldCheck className="size-12" />}
            title="Runs in your browser"
            description="No backend. Private by design. All processing happens locally in your browser."
          />
          <TrustCard
            icon={<KeyRound className="size-12" />}
            title="BYOK (Bring Your Own Key)"
            description="Gemini — you stay in control of your API key and costs. (Your key only in your browser)"
          />
          <TrustCard
            icon={<Pause className="size-12" />}
            title="Pause & Cancel"
            description="Full control while generating. Pause or cancel at any time."
          />
          <TrustCard
            icon={<Download className="size-12" />}
            title="Export Instantly"
            description="One-click CSV download to keep your results."
          />
          <TrustCard
            icon={<Handshake className="size-12" />}
            title="Data Privacy"
            description="We never store your data. Everything is processed locally in your browser — no data sent to our servers."
          />
        </div>
      </Container>
      <input
        ref={inputRef}
        type="file"
        accept=".csv"
        className="hidden"
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          e.preventDefault()
          const file = e.target.files?.[0]
          if (!file) return

          handleFileChange([file])
        }}
      />
    </>
  )
}
