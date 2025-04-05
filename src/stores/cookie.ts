import { create } from "zustand"
import { persist } from "zustand/middleware"

export type CookieStore = {
  isConsent: boolean | null
  setConsent: (state: boolean) => void
}

export const useCookieStore = create<CookieStore>()(
  persist(
    (set) => ({
      isConsent: null,
      setConsent: (state: boolean) =>
        set({
          isConsent: state,
        }),
    }),
    {
      name: "cookieConsent",
    }
  )
)
