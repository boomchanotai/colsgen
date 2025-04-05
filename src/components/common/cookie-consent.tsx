"use client"

import { useCookieStore } from "@/stores/cookie"
import { Icon } from "@iconify/react/dist/iconify.js"
import { AnimatePresence, motion } from "motion/react"
import Link from "next/link"

import { Button } from "../ui/button"

export const CookieConsent = () => {
  const { isConsent, setConsent } = useCookieStore()

  const handleConsent = () => {
    setConsent(true)
    window.location.reload()
  }

  const handleDecline = () => {
    setConsent(false)
  }

  return (
    <AnimatePresence>
      {isConsent === null && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed bottom-0 left-1/2 w-full max-w-md -translate-x-1/2 transform p-4"
        >
          <div className="bg-background flex w-full items-center justify-between gap-4 rounded-lg p-4 shadow-2xl shadow-gray-700">
            <div className="text-xs">
              This website uses cookies to enhance user experience in accordance
              with the{" "}
              <Link href="/privacy-policy" className="font-semibold underline">
                Privacy Policy
              </Link>
              .
            </div>
            <div className="flex gap-2">
              <Button
                onClick={handleConsent}
                className="size-10 cursor-pointer rounded-full p-0"
              >
                <Icon icon="lucide:check" className="size-4" />
              </Button>
              <Button
                onClick={handleDecline}
                variant="secondary"
                className="bg-background-secondary size-10 cursor-pointer rounded-full p-0"
              >
                <Icon icon="lucide:x" className="size-4" />
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
