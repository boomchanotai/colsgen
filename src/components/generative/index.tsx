"use client"

import { useCallback, useEffect, useRef, useState } from "react"

import { formatBytes } from "@/lib/utils"
import { useFileStore } from "@/stores/file"
import { PromptColumn } from "@/types"
import axios from "axios"
import { Container, KeyRound, Package, Rows3, Sparkles } from "lucide-react"
import Papa from "papaparse"
import { toast } from "sonner"

import { UploadCsv } from "../home/components/upload-csv"
import { AddApiKeyDialog } from "./components/add-api-key-dialog"
import { AddColumnDialog } from "./components/add-column-dialog"
import LoadingDots from "./components/animate"
import { DataTable } from "./components/data-table"
import { Heading } from "./components/heading"
import { InformationBox } from "./components/information-box"
import { ProgressBar } from "./components/progress-bar"
import { PromptColumnCard } from "./components/prompt-column-card"

const limit = 5

const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent`

export const Generative = () => {
  const { file } = useFileStore()

  const [totalRows, setTotalRows] = useState(0)
  const [data, setData] = useState<any[]>([])
  const [headers, setHeaders] = useState<string[]>([])
  const [progress, setProgress] = useState<number | null>(null)
  const [isGenerating, setGenerating] = useState(false)
  const [promptColumns, setPromptColumns] = useState<PromptColumn[]>([])

  const [apiKey, setApiKey] = useState("")

  const cancelRequestedRef = useRef(false)

  useEffect(() => {
    if (!file) return

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true,
      complete: (results: Papa.ParseResult<unknown>) => {
        setTotalRows(results.data.length)
        setData(results.data.slice(0, limit))
        setHeaders(Object.keys(results.data[0] || {}))
      },
    })
  }, [file])

  const handleRemoveColumn = useCallback(
    (colToRemove: string) => {
      // Remove column header
      const updatedHeaders = headers.filter((h) => h !== colToRemove)
      setHeaders(updatedHeaders)

      // Remove column data from each row
      const updatedData = data.map((row) => {
        const newRow = { ...row }
        delete newRow[colToRemove]
        return newRow
      })
      setData(updatedData)
    },
    [data]
  )

  const handleCancel = () => {
    cancelRequestedRef.current = true
  }

  const handleGenerateColumn = async (column: {
    id: string
    name: string
    prompt: string
  }) => {
    setGenerating(true)
    const updated = [...data]
    const newLoading: { [key: number]: boolean } = {}

    setProgress(0)

    for (let rowIndex = 0; rowIndex < data.length; rowIndex++) {
      if (cancelRequestedRef.current) {
        break
      }

      const row = data[rowIndex]

      // ✅ Skip if result already exists
      if (row[column.id]) {
        continue
      }

      newLoading[rowIndex] = true

      const filledPrompt = column.prompt.replace(
        /{{(.*?)}}/g,
        (_, key) => row[key.trim()] || ""
      )

      try {
        const response = await axios.post(`${API_URL}?key=${apiKey}`, {
          contents: [{ parts: [{ text: filledPrompt }] }],
        })

        const result =
          response.data.candidates?.[0]?.content?.parts?.[0]?.text || ""
        updated[rowIndex] = {
          ...updated[rowIndex],
          [column.id]: result,
        }
      } catch (error) {
        console.error(`Error generating for ${column.name}:`, error)
        updated[rowIndex] = {
          ...updated[rowIndex],
          [column.id]: "[Error]",
        }
      }

      setData([...updated])

      const percent = Math.round(((rowIndex + 1) / data.length) * 100)
      setProgress(percent)
    }

    setGenerating(false)
    cancelRequestedRef.current = false
    setTimeout(() => setProgress(null), 2000) // hide bar after 2s

    toast.success("Successfully generated!")
  }

  const handleExport = () => {
    // Map generated column ids to their friendly names
    const colIdToName: Record<string, string> = {}
    for (const col of promptColumns) {
      colIdToName[col.id] = col.name
    }

    // Build export rows with renamed keys
    const exportData = data.map((row) => {
      const newRow: Record<string, unknown> = {}

      for (const key in row) {
        if (colIdToName[key]) {
          // It's a generated column → use friendly name
          newRow[colIdToName[key]] = row[key]
        } else {
          // Original column → keep as-is
          newRow[key] = row[key]
        }
      }

      return newRow
    })

    const csv = Papa.unparse(exportData)
    const BOM = "\uFEFF" // UTF-8 Byte Order Mark
    const blob = new Blob([BOM + csv], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", "output.csv")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

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
        handleCancel={handleCancel}
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
          description="Activated"
        />
      </div>

      {/* Body */}
      <div className="flex gap-8">
        <div className="relative flex-1 overflow-hidden">
          <DataTable
            data={data}
            headers={headers}
            promptColumns={promptColumns}
          />
          {isGenerating && (
            <div className="absolute top-0 left-0 flex size-full items-center justify-center rounded-md bg-white/80">
              <LoadingDots />
            </div>
          )}
        </div>

        <div className="flex min-w-80 flex-initial flex-col gap-4">
          {apiKey !== "" ? (
            <>
              <div className="flex justify-end">
                <AddColumnDialog
                  setPromptColumns={setPromptColumns}
                  disabled={apiKey === ""}
                />
              </div>
              <div className="space-y-4">
                {promptColumns.map((col) => (
                  <PromptColumnCard
                    key={col.id}
                    col={col}
                    setPromptColumns={setPromptColumns}
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
                <p className="font-medium">Add your Gemini API Key</p>
              </div>
              <AddApiKeyDialog setApiKey={setApiKey} />
            </div>
          )}
        </div>
      </div>

      {progress ? <ProgressBar progress={progress} /> : null}
    </div>
  )
}
