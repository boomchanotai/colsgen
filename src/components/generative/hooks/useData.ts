import { useEffect, useRef, useState } from "react"

import { sleep } from "@/lib/utils"
import { useApiKeyStore } from "@/stores/api-key"
import { useFileStore } from "@/stores/file"
import { PromptColumn } from "@/types"
import axios from "axios"
import Papa from "papaparse"
import { toast } from "sonner"

const LIMIT = 10000
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent`

export const useData = () => {
  const { file } = useFileStore()
  const { apiKey } = useApiKeyStore()

  // Data State
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<any[]>([])
  const [headers, setHeaders] = useState<string[]>([])
  const [promptColumns, setPromptColumns] = useState<PromptColumn[]>([])
  const [totalRows, setTotalRows] = useState(0)

  // Action State
  const [progress, setProgress] = useState<number | null>(null)
  const [isGenerating, setGenerating] = useState(false)
  const cancelRequestedRef = useRef(false)

  useEffect(() => {
    if (!file) return

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true,
      complete: (results: Papa.ParseResult<unknown>) => {
        setTotalRows(results.data.length)
        setData(results.data.slice(0, LIMIT))
        setHeaders(Object.keys(results.data[0] || {}))
      },
    })
  }, [file])

  const handleAddColumn = (colName: string) => {
    const newColumn: PromptColumn = {
      id: `col_${Date.now()}`,
      name: colName,
      prompt: "",
    }

    setPromptColumns((prev: PromptColumn[]) => [...prev, newColumn])
  }

  const handleRemoveColumn = (colToRemove: string) => {
    // Remove from headers
    setHeaders((prev) => prev.filter((h) => h !== colToRemove))

    // Remove from promptColumns (if exists)
    setPromptColumns((prev) => prev.filter((col) => col.id !== colToRemove))

    // Remove from data rows
    setData((prev) =>
      prev.map((row) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { [colToRemove]: _, ...rest } = row
        return rest
      })
    )
  }

  const handleSetColumnPrompt = (id: string, value: string) => {
    setPromptColumns((prev) =>
      prev.map((column) =>
        column.id === id ? { ...column, prompt: value } : column
      )
    )
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
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 429) {
            toast.info("Hit rate limit... wait a minutes!")
            await sleep(30000) // longer delay on 429, delay 30s
            rowIndex-- // retry this row
            continue
          } else {
            toast.error(
              "Can't request to Gemini. Please re-check your api key."
            )

            setGenerating(false)
            cancelRequestedRef.current = false
            setTimeout(() => setProgress(null), 2000) // hide bar after 2s
            return
          }
        } else {
          console.error(error)
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

  const handleCancelGenerateColumn = () => {
    cancelRequestedRef.current = true
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

  const validatePrompt = (prompt: string): boolean => {
    const placeholders = [...prompt.matchAll(/{{(.*?)}}/g)].map((m) =>
      m[1].trim()
    )
    return placeholders.every((key) => headers.includes(key))
  }

  return {
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
    validatePrompt,
  }
}
