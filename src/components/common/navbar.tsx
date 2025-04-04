import Link from "next/link"

import Logo from "./logo"

export const Navbar = () => {
  return (
    <div className="flex items-center justify-between gap-4 px-8 py-4">
      <h2 className="text-primary text-lg font-bold">
        <Link href="/">
          <div className="flex items-center gap-2">
            <div className="size-8">
              <Logo />
            </div>
            <p>Colsgen</p>
          </div>
        </Link>
      </h2>
      {/* <div>
        <Button>Login</Button>
      </div> */}
    </div>
  )
}
