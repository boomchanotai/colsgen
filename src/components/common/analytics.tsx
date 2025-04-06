"use client"

import { useEffect } from "react"

import { pageview } from "@/lib/gtagHelper"
import { useCookieStore } from "@/stores/cookie"
import { usePathname, useSearchParams } from "next/navigation"
import Script from "next/script"

export const Analytics = () => {
  const { isConsent } = useCookieStore()

  const GA_MEASUREMENT_ID = "G-ST19GWKM0V"

  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    const newValue = isConsent ? "granted" : "denied"

    window.gtag("consent", "update", {
      analytics_storage: newValue,
    })
  }, [isConsent])

  useEffect(() => {
    const url = pathname + searchParams.toString()

    pageview(GA_MEASUREMENT_ID, url)
  }, [pathname, searchParams, GA_MEASUREMENT_ID])

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
                 window.dataLayer = window.dataLayer || [];
                 function gtag(){dataLayer.push(arguments);}
                 gtag('js', new Date());

                 gtag('consent', 'default', {
                     'analytics_storage': 'denied'
                 });

                 gtag('config', '${GA_MEASUREMENT_ID}', {
                     page_path: window.location.pathname,
                 });
                 `,
        }}
      />
    </>
  )
}
