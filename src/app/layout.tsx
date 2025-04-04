import type { Metadata } from "next"

import { Footer } from "@/components/common/footer"
import { Navbar } from "@/components/common/navbar"
import { Toaster } from "@/components/ui/sonner"

import "./globals.css"

export const metadata: Metadata = {
  title: "Generative Column",
  description:
    "Upload your CSV, write smart prompts, and generate 100s of AI-enhanced rows — in your browser, using your own API key.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <div className="flex min-h-dvh flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
        </div>
        <Footer />
        <Toaster />
      </body>
    </html>
  )
}
