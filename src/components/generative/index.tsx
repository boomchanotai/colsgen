"use client"

import { formatBytes } from "@/lib/utils"
import { useApiKeyStore } from "@/stores/api-key"
import {
  Container as ContainerIcon,
  KeyRound,
  Package,
  Rows3,
  Sparkles,
} from "lucide-react"

import { Button } from "@/components/ui/button"

import { AddColumnDialog } from "./components/add-column-dialog"
import LoadingDots from "./components/animate"
import { DataTable } from "./components/data-table"
import { EmptyState } from "./components/empty-state"
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
    handleChangeNormalColumnToPromptColumn,
    handleSetColumnPrompt,
    handleGenerateColumn,
    handleCancelGenerateColumn,
    handleExport,
    validatePrompt,
    handleRemoveDataInRowColumn,
  } = useData()

  if (!file) {
    return <EmptyState />
  }

  return (
    <div className="space-y-6 px-8 py-4">
      <Heading
        fileName={file.name}
        lastModified={file.lastModified}
        handleExport={handleExport}
        isGenerating={isGenerating}
        handleCancel={handleCancelGenerateColumn}
      />

      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-5">
        <InformationBox
          icon={<ContainerIcon className="size-4" />}
          title="File Size"
          description={formatBytes(file.size)}
        />
        <InformationBox
          icon={<Rows3 className="size-4" />}
          title="Data"
          description={`${totalRows} rows (limit 100), ${headers.length} cols`}
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
      <div className="flex flex-col-reverse gap-4 lg:flex-row lg:gap-8">
        <div className="relative flex-1 space-y-2 overflow-hidden">
          <p className="text-right text-xs text-gray-500">
            **Please note: You can process up to 100 rows per batch.
          </p>
          <DataTable
            data={data}
            headers={headers}
            promptColumns={promptColumns}
            handleRemoveColumn={handleRemoveColumn}
            handleChangeNormalColumnToPromptColumn={
              handleChangeNormalColumnToPromptColumn
            }
            handleRemoveDataInRowColumn={handleRemoveDataInRowColumn}
          />
          {isGenerating && (
            <div className="absolute top-0 left-0 flex size-full items-center justify-center rounded-md bg-white/80">
              <LoadingDots />
            </div>
          )}
        </div>

        <div className="flex w-full flex-initial flex-col gap-4 md:w-96">
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
                    validatePrompt={validatePrompt}
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
