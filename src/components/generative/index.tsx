"use client";

import { useFileStore } from "@/stores/file";
import {
  Container,
  KeyRound,
  LoaderCircle,
  Package,
  Rows3,
  Sparkles,
} from "lucide-react";
import { SetStateAction, useCallback, useEffect, useState } from "react";
import Papa from "papaparse";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { PromptColumn } from "@/types";
import { DataTable } from "./components/data-table";
import { ProgressBar } from "./components/progress-bar";
import { Heading } from "./components/heading";
import { InformationBox } from "./components/information-box";
import { formatBytes } from "@/lib/utils";
import { AddColumnDialog } from "./components/add-column-dialog";
import { PromptColumnCard } from "./components/prompt-column-card";
import LoadingDots from "./components/animate";

const limit = 5;

const API_KEY = "AIzaSyAxRz8_cMyLzPvSkhH5v4RyhEd_cPWmhYo";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

export const Generative = () => {
  const { file } = useFileStore();

  const [totalRows, setTotalRows] = useState(0);
  const [data, setData] = useState<any[]>([]);
  const [headers, setHeaders] = useState<string[]>([]);

  const [progress, setProgress] = useState<number | null>(null);

  const [isGenerating, setGenerating] = useState(false);

  const [promptColumns, setPromptColumns] = useState<PromptColumn[]>([]);

  useEffect(() => {
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true,
      complete: (results: Papa.ParseResult<unknown>) => {
        setTotalRows(results.data.length);
        setData(results.data.slice(0, limit));
        setHeaders(Object.keys(results.data[0] || {}));
      },
    });
  }, [file]);

  const handleRemoveColumn = useCallback(
    (colToRemove: string) => {
      // Remove column header
      const updatedHeaders = headers.filter((h) => h !== colToRemove);
      setHeaders(updatedHeaders);

      // Remove column data from each row
      const updatedData = data.map((row) => {
        const newRow = { ...row };
        delete newRow[colToRemove];
        return newRow;
      });
      setData(updatedData);
    },
    [data],
  );

  const handleGenerateColumn = async (column: {
    id: string;
    name: string;
    prompt: string;
  }) => {
    setGenerating(true);
    const updated = [...data];
    const newLoading: { [key: number]: boolean } = {};

    setProgress(0);

    for (let rowIndex = 0; rowIndex < data.length; rowIndex++) {
      newLoading[rowIndex] = true;

      const row = data[rowIndex];
      const filledPrompt = column.prompt.replace(
        /{{(.*?)}}/g,
        (_, key) => row[key.trim()] || "",
      );

      try {
        const response = await axios.post(API_URL, {
          contents: [{ parts: [{ text: filledPrompt }] }],
        });

        const result =
          response.data.candidates?.[0]?.content?.parts?.[0]?.text || "";
        updated[rowIndex] = {
          ...updated[rowIndex],
          [column.id]: result,
        };
      } catch (error) {
        console.error(`Error generating for ${column.name}:`, error);
        updated[rowIndex] = {
          ...updated[rowIndex],
          [column.id]: "[Error]",
        };
      }

      setData([...updated]);

      // ✅ update progress
      const percent = Math.round(((rowIndex + 1) / data.length) * 100);
      setProgress(percent);
    }

    setGenerating(false);
    setTimeout(() => setProgress(null), 2000); // hide bar after 2s
  };

  const handleExport = () => {
    // Map generated column ids to their friendly names
    const colIdToName: Record<string, string> = {};
    for (const col of promptColumns) {
      colIdToName[col.id] = col.name;
    }

    // Build export rows with renamed keys
    const exportData = data.map((row) => {
      const newRow: Record<string, unknown> = {};

      for (const key in row) {
        if (colIdToName[key]) {
          // It's a generated column → use friendly name
          newRow[colIdToName[key]] = row[key];
        } else {
          // Original column → keep as-is
          newRow[key] = row[key];
        }
      }

      return newRow;
    });

    const csv = Papa.unparse(exportData);
    const BOM = "\uFEFF"; // UTF-8 Byte Order Mark
    const blob = new Blob([BOM + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "output.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!file)
    return (
      <div className="min-h-96 flex justify-center items-center text-gray-700">
        No Selected File
      </div>
    );

  return (
    <div className="py-4 space-y-6 px-8">
      <Heading
        fileName={file.name}
        lastModified={file.lastModified}
        handleExport={handleExport}
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
      <div className="grid grid-cols-12 gap-8">
        <div className="relative col-span-8">
          <DataTable
            data={data}
            headers={headers}
            promptColumns={promptColumns}
          />
          {isGenerating && (
            <div className="absolute top-0 left-0 size-full bg-white/80 rounded-md flex justify-center items-center">
              <LoadingDots />
            </div>
          )}
        </div>

        <div className="col-span-4 flex flex-col gap-4">
          <div className="flex justify-end">
            <AddColumnDialog setPromptColumns={setPromptColumns} />
          </div>

          <div className="space-y-4">
            {promptColumns.map((col) => (
              <PromptColumnCard
                col={col}
                setPromptColumns={setPromptColumns}
                isGenerating={isGenerating}
                handleGenerateColumn={handleGenerateColumn}
              />
            ))}
          </div>
        </div>
      </div>

      {progress ? <ProgressBar progress={progress} /> : null}
    </div>
  );
};
