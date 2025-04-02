import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const Container = (props: ContainerProps) => {
  const { children, className } = props;
  return (
    <section className={cn("max-w-7xl mx-auto px-6", className)}>
      {children}
    </section>
  );
};
