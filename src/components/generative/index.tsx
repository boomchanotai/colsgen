"use client"

import { formatBytes } from "@/lib/utils"
import { useApiKeyStore } from "@/stores/api-key"
import { Container, KeyRound, Package, Rows3, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"

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

  if (!file)
    return (
      <div className="flex min-h-96 items-center justify-center text-gray-700">
        <UploadCsv />
      </div>
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
          icon={<Container className="size-4" />}
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
