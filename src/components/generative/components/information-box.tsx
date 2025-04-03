import { ReactNode } from "react";

interface InformationBoxProps {
  title: string;
  icon: ReactNode;
  description: string;
}
export const InformationBox = (props: InformationBoxProps) => {
  const { icon, title, description } = props;
  return (
    <div className="border rounded-md p-3 bg-white min-w-40 max-h-16 flex items-center">
      <div className="flex gap-3 items-center">
        <div>
          <div className="rounded-md border p-1 bg-white">{icon}</div>
        </div>
        <div className="space-y-1">
          <h2 className="font-medium text-sm">{title}</h2>
          <div className="text-xs text-gray-500">{description}</div>
        </div>
      </div>
    </div>
  );
};
