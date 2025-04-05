"use client"

import { useCookieStore } from "@/stores/cookie"
import { GoogleAnalytics } from "@next/third-parties/google"

export const Analytics = () => {
  const { isConsent } = useCookieStore()

  if (!isConsent) return null

  return <GoogleAnalytics gaId="G-ST19GWKM0V" />
}
