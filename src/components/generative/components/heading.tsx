import { Button } from "@/components/ui/button";
import { EllipsisVertical, File, Pause, Share2 } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

interface HeadingProps {
  fileName: string;
  lastModified: number;
  handleExport: () => void;
  isGenerating: boolean;
  setCancelRequested: Dispatch<SetStateAction<boolean>>;
}

export const Heading = (props: HeadingProps) => {
  const {
    fileName,
    lastModified,
    handleExport,
    isGenerating,
    setCancelRequested,
  } = props;

  return (
    <div className="flex justify-between items-center gap-8">
      <div className="flex items-center gap-4">
        <div>
          <File className="size-6" />
        </div>
        <div>
          <h1 className="font-bold text-lg">{fileName}</h1>
          <div className="text-xs text-gray-500">
            <p>
              Last Modified at{" "}
              {new Date(lastModified).toLocaleTimeString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </p>
          </div>
        </div>
      </div>

      <div className="flex gap-2 items-center">
        {isGenerating ? (
          <Button
            onClick={() => setCancelRequested(true)}
            variant="destructive"
          >
            <Pause className="size-4" />
          </Button>
        ) : null}
        <Button onClick={handleExport}>Export as CSV</Button>
        <Button size="icon" variant="secondary">
          <EllipsisVertical className="size-4" />
        </Button>
      </div>
    </div>
  );
};
