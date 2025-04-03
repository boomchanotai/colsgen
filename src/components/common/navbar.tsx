import Link from "next/link"

import { Button } from "@/components/ui/button"

export const Navbar = () => {
  return (
    <div className="flex items-center justify-between gap-4 px-8 py-4">
      <h2 className="text-primary text-lg font-bold">
        <Link href="/">Generative Columns</Link>
      </h2>
      <div>
        <Button>Login</Button>
      </div>
    </div>
  )
}
