import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { PromptColumn } from "@/types";
import { useState } from "react";
import { Sparkles } from "lucide-react";

interface DataTableProps {
  data: any[];
  headers: string[];
  promptColumns: PromptColumn[];
}

export const DataTable = (props: DataTableProps) => {
  const { data, headers, promptColumns } = props;

  const [currentPage, setCurrentPage] = useState(1);

  const rowsPerPage = 20;
  const totalPages = Math.ceil(data.length / rowsPerPage);
  const currentData = data.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage,
  );

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div>
      <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-md">
        <Table className="min-w-full divide-y divide-gray-200">
          <TableHeader className="bg-gray-50">
            <TableRow>
              {headers.map((header) => (
                <TableHead
                  key={header}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {header}
                </TableHead>
              ))}
              {promptColumns.map((col) => (
                <TableHead
                  key={col.id}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  <div className="flex gap-2 items-center">
                    <span>{col.name}</span>
                    <Sparkles className="size-4 text-primary" />
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentData.map((row, rowIdx) => (
              <TableRow
                key={rowIdx}
                className={rowIdx % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                {headers.map((header) => (
                  <TableCell
                    key={header}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 max-w-96 truncate"
                  >
                    {row[header]}
                  </TableCell>
                ))}
                {promptColumns.map((col) => (
                  <TableCell
                    key={col.id}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                  >
                    {row[col.id] || "-"}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
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
            <PaginationNext onClick={handleNext} className="cursor-pointer" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};
