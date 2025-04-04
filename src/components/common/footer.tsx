import { Icon } from "@iconify/react"
import Link from "next/link"

import { Container } from "./container"

export const Footer = () => {
  return (
    <footer>
      <Container className="flex items-center justify-between gap-4 p-6 text-xs">
        <div>© 2025 Colsgen, Inc. All rights reserved.</div>
        <div className="flex items-center gap-2">
          <div>
            <Link href="/privacy-policy" className="underline">
              Privacy Policy
            </Link>
          </div>
          <div>
            <Link href="https://github.com/boomchanotai/colsgen">
              <Icon icon="mdi:github" className="size-6" />
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  )
}
