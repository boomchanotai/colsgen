import { Button } from "@/components/ui/button";

export const Navbar = () => {
  return (
    <div className="px-8 py-4 flex justify-between items-center gap-4">
      <h2 className="text-primary font-bold text-lg">Generative Columns</h2>
      <div>
        <Button>Login</Button>
      </div>
    </div>
  );
};
