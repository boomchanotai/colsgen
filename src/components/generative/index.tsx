"use client"

import { ChangeEvent, useRef } from "react"

import { cn, formatBytes } from "@/lib/utils"
import { useApiKeyStore } from "@/stores/api-key"
import { useFileStore } from "@/stores/file"
import {
  Container as ContainerIcon,
  File,
  KeyRound,
  Package,
  Rows3,
  Sparkles,
} from "lucide-react"
import { useDropzone } from "react-dropzone"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"

import { Container } from "../common/container"
import { UploadCsv } from "../home/components/upload-csv"
import { AddColumnDialog } from "./components/add-column-dialog"
import LoadingDots from "./components/animate"
import { DataTable } from "./components/data-table"
import { Heading } from "./components/heading"
import { InformationBox } from "./components/information-box"
import { ProgressBar } from "./components/progress-bar"
import { PromptColumnCard } from "./components/prompt-column-card"
import { SetApiKeyDialog } from "./components/set-api-key-dialog"
import { useData } from "./hooks/useData"

export const Generative = () => {
  const { apiKey, setOpen: setOpenApiKeyDialog } = useApiKeyStore()
  const {
    file,
    data,
    totalRows,
    headers,
    promptColumns,
    isGenerating,
    progress,
    handleAddColumn,
    handleRemoveColumn,
    handleSetColumnPrompt,
    handleGenerateColumn,
    handleCancelGenerateColumn,
    handleExport,
  } = useData()

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

  if (!file)
    return (
      <>
        <Container>
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

  return (
    <div className="space-y-6 px-8 py-4">
      <Heading
        fileName={file.name}
        lastModified={file.lastModified}
        handleExport={handleExport}
        isGenerating={isGenerating}
        handleCancel={handleCancelGenerateColumn}
      />

      <div className="grid grid-cols-5 gap-4">
        <InformationBox
          icon={<ContainerIcon className="size-4" />}
          title="File Size"
          description={formatBytes(file.size)}
        />
        <InformationBox
          icon={<Rows3 className="size-4" />}
          title="Data"
          description={`${totalRows} rows, ${headers.length} columns`}
        />
        <InformationBox
          icon={<Sparkles className="size-4" />}
          title="Generative Columns"
          description={`${promptColumns.length} columns`}
        />
        <InformationBox
          icon={<Package className="size-4" />}
          title="Model"
          description="Gemini 2.0 Flash"
        />
        <InformationBox
          icon={<KeyRound className="size-4" />}
          title="API Key"
          description={apiKey ? "Activated" : "No API Key"}
        />
      </div>

      {/* Body */}
      <div className="flex gap-8">
        <div className="relative flex-1 overflow-hidden">
          <DataTable
            data={data}
            headers={headers}
            promptColumns={promptColumns}
            handleRemoveColumn={handleRemoveColumn}
          />
          {isGenerating && (
            <div className="absolute top-0 left-0 flex size-full items-center justify-center rounded-md bg-white/80">
              <LoadingDots />
            </div>
          )}
        </div>

        <div className="flex min-w-96 flex-initial flex-col gap-4">
          {apiKey !== "" ? (
            <>
              <div className="flex justify-end">
                <AddColumnDialog handleAddColumn={handleAddColumn} />
              </div>
              <div className="space-y-4">
                {promptColumns.map((col) => (
                  <PromptColumnCard
                    key={col.id}
                    col={col}
                    handleSetColumnPrompt={handleSetColumnPrompt}
                    isGenerating={isGenerating}
                    handleGenerateColumn={handleGenerateColumn}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="flex min-h-64 flex-1 flex-col items-center justify-center gap-2 rounded-md border bg-white p-2">
              <div className="flex flex-col items-center justify-center gap-1">
                <KeyRound className="size-6" />
                <p className="font-medium">Set your Gemini API Key</p>
              </div>
              <Button
                onClick={() => setOpenApiKeyDialog(true)}
                size="sm"
                className="gap-2"
              >
                <span>Set your API Key</span>
              </Button>
            </div>
          )}
        </div>
      </div>

      {progress ? <ProgressBar progress={progress} /> : null}

      <SetApiKeyDialog />
    </div>
  )
}
