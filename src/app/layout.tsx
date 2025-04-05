import type { Metadata } from "next"

import { Analytics } from "@/components/common/analytics"
import { CookieConsent } from "@/components/common/cookie-consent"
import { Footer } from "@/components/common/footer"
import { Navbar } from "@/components/common/navbar"
import { Toaster } from "@/components/ui/sonner"

import "./globals.css"

export const metadata: Metadata = {
  title: "Colsgen - AI-enhanced rows",
  description:
    "Upload your CSV, write smart prompts, and generate 100s of AI-enhanced rows — in your browser, using your own API key.",
  keywords:
    "AI CSV generator, generative AI, CSV automation, AI content generation, CSV data automation, bulk data generation, AI for CSV, data processing AI, generative columns, AI data tool, no-code data generation, CSV data tool, AI-powered CSV generator, CSV content automation, prompt-based data generation, BYOK, Gemini 2.0, OpenAI CSV generator, automate data with AI, AI in browser, local AI processing, AI tool for developers",
  metadataBase: new URL("https://colsgen.com"),
  robots: {
    index: true,
    follow: true,
    nocache: false,
  },
  openGraph: {
    title: "Colsgen - AI-enhanced rows",
    description: "Instantly generate AI-powered content for your CSV data.",
    url: "https://colsgen.com",
    siteName: "Colsgen",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Colsgen - AI-enhanced rows",
    description:
      "Generate AI content for your CSV files instantly, using your own key.",
    creator: "@CentosZ3",
    site: "https://colsgen.com",
  },
  alternates: {
    canonical: "https://colsgen.com",
  },
  category: "AI Tool",
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
        <CookieConsent />
        <Analytics />
      </body>
    </html>
  )
}
