import { Button } from "@/components/ui/button";
import Link from "next/link";

export const Navbar = () => {
  return (
    <div className="px-8 py-4 flex justify-between items-center gap-4">
      <h2 className="text-primary font-bold text-lg">
        <Link href="/">Generative Columns</Link>
      </h2>
      <div>
        <Button>Login</Button>
      </div>
    </div>
  );
};
