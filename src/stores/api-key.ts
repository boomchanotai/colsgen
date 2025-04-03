import { persist } from "zustand/middleware"
import { create } from "zustand/react"

interface ApiKeyStore {
  apiKey: string
  setApiKey: (state: string) => void

  open: boolean
  setOpen: (state: boolean) => void
}

export const useApiKeyStore = create<ApiKeyStore>()(
  persist(
    (set) => ({
      apiKey: "",
      setApiKey: (apiKey: string) => set({ apiKey }),

      open: false,
      setOpen: (open: boolean) => set({ open }),
    }),
    {
      name: "api-key",
    }
  )
)
