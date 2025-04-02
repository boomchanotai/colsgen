import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

interface ColumnProps {
  className?: string;
  name: string;
  onRemove: () => void;
}

export const Column = (props: ColumnProps) => {
  const { name, className, onRemove } = props;

  return (
    <div
      className={cn(
        "border border-primary px-4 py-1 gap-2 flex items-center text-primary rounded-md",
        className,
      )}
    >
      <span>{name}</span>
      <Button onClick={onRemove} size="icon" variant="ghost" className="size-5">
        <X className="size-4" />
      </Button>
    </div>
  );
};
