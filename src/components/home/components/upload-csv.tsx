"use client";

import { Button } from "@/components/ui/button";
import { useFileStore } from "@/stores/file";
import { redirect } from "next/navigation";
import { ChangeEvent, useRef } from "react";
import { toast } from "sonner";

export const UploadCsv = () => {
  const { setFile } = useFileStore();

  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const file = e.target.files?.[0];

    if (!file) return;

    if (file.type !== "text/csv") {
      toast.error("Invalid file type. Please upload a CSV file.");
      return;
    }

    setFile(file);
    redirect("/generative");
  };

  return (
    <>
      <Button
        onClick={() => inputRef.current?.click()}
        size={"lg"}
        className="text-2xl h-auto py-3 px-12"
      >
        Upload CSV
      </Button>
      <input
        ref={inputRef}
        type="file"
        accept=".csv"
        className="hidden"
        onChange={handleUpload}
      />
    </>
  );
};
