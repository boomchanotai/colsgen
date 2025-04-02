"use client";

import { Container } from "@/components/common/container";
import { useFileStore } from "@/stores/file";
import { File, LoaderCircle } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import Papa from "papaparse";
import { Column } from "./components/column";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";

const limit = 100;

const API_KEY = "AIzaSyAxRz8_cMyLzPvSkhH5v4RyhEd_cPWmhYo";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

export const Generative = () => {
  const { file } = useFileStore();

  const [colName, setColName] = useState("");
  const [totalRows, setTotalRows] = useState(0);
  const [data, setData] = useState<any[]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [progress, setProgress] = useState<number | null>(null);

  const [isGenerating, setGenerating] = useState(false);

  const [promptColumns, setPromptColumns] = useState<
    { id: string; name: string; prompt: string }[]
  >([]);

  const rowsPerPage = 20;
  const totalPages = Math.ceil(data.length / rowsPerPage);
  const currentData = data.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage,
  );

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
        setCurrentPage(1);
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

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handleAddColumn = useCallback(
    (e: React.SyntheticEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!colName) return;

      const newColumn = {
        id: `col_${Date.now()}`,
        name: colName,
        prompt: "",
      };
      setPromptColumns([...promptColumns, newColumn]);
      setColName("");
    },
    [colName],
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
    <Container className="py-4 space-y-6">
      <div className="flex gap-8 items-center">
        <div>
          <div className="rounded-lg border-primary border px-8 py-4 flex gap-8 items-center min-w-64 justify-between">
            <div>
              <h2 className="font-semibold text-lg max-w-48 line-clamp-1">
                {file.name}
              </h2>
              <div className="text-xs text-gray-600 flex gap-2 items-center">
                <p>
                  {data.length} / {totalRows} rows
                </p>
                <p>•</p>
                <p>CSV</p>
              </div>
            </div>
            <div className="text-primary">
              <File className="size-6" />
            </div>
          </div>
        </div>
        <div className="flex-1 space-y-2">
          <div className="flex flex-wrap gap-4">
            {headers.map((header) => (
              <Column
                key={header}
                name={header}
                onRemove={() => handleRemoveColumn(header)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-8 border border-primary rounded-md px-6 py-4">
          {progress !== null && (
            <div className="w-full max-w-xl mx-auto">
              <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="text-center mt-1 text-sm text-muted-foreground">
                {progress < 100 ? `Generating... ${progress}%` : "Done!"}
              </div>
            </div>
          )}
          <div className="flex justify-end">
            <Button size="sm" onClick={handleExport} className="cursor-pointer">
              Export as CSV
            </Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                {headers.map((header) => (
                  <TableHead key={header}>{header}</TableHead>
                ))}
                {promptColumns.map((col) => (
                  <TableHead key={col.id}>{col.name}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentData.map((row, rowIdx) => (
                <TableRow key={rowIdx}>
                  {headers.map((header) => (
                    <TableCell key={header}>{row[header]}</TableCell>
                  ))}
                  {promptColumns.map((col) => (
                    <TableCell key={col.id}>
                      <pre>{row[col.id] || "-"}</pre>
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Pagination className="mt-4 justify-center">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={handlePrevious}
                  className="cursor-pointer"
                />
              </PaginationItem>
              <PaginationItem className="px-4 py-2 text-xs">
                Page {currentPage} of {totalPages}
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  onClick={handleNext}
                  className="cursor-pointer"
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
        <div className="col-span-4 border border-primary rounded-md flex flex-col px-6 py-4 gap-4">
          <div className="flex-1 space-y-4">
            {promptColumns.map((col, idx) => (
              <div
                key={col.id}
                className="space-y-2 border p-2 rounded-md bg-white/50"
              >
                <Label>Prompt for {col.name}</Label>
                <Input
                  value={col.prompt}
                  onChange={(e) => {
                    const updated = [...promptColumns];
                    updated[idx].prompt = e.target.value;
                    setPromptColumns(updated);
                  }}
                  placeholder="prompt"
                />
                <Button
                  size="sm"
                  className="w-full gap-2"
                  disabled={isGenerating}
                  onClick={() => handleGenerateColumn(col)}
                >
                  {isGenerating && (
                    <LoaderCircle className="size-4 animate-spin" />
                  )}
                  Generate All for This Column
                </Button>
              </div>
            ))}
          </div>
          <form className="flex gap-2 items-center" onSubmit={handleAddColumn}>
            <Input
              value={colName}
              onChange={(e) => setColName(e.target.value)}
              placeholder="Generative Column Name"
              required
            />
            <Button type="submit" size="sm">
              Add
            </Button>
          </form>
        </div>
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
    </Container>
  );
};
