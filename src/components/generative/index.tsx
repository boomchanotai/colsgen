"use client";

import { Container } from "@/components/common/container";
import { useFileStore } from "@/stores/file";
import { File, Plus } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import Papa from "papaparse";
import { Column } from "./components/column";
import { Button } from "../ui/button";

const limit = 100;

export const Generative = () => {
  const { file } = useFileStore();

  const [totalRows, setTotalRows] = useState(0);
  const [data, setData] = useState<any[]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 20;

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
          s
        </div>
        <div className="col-span-4 border border-primary rounded-md px-6 py-4">
          s
        </div>
      </div>
    </Container>
  );
};
