import { Container } from "@/components/common/container"

import { UploadCsv } from "./upload-csv"

export const Hero = () => {
  return (
    <div className="relative">
      <Container className="space-y-12 py-8">
        <div className="space-y-2 text-center">
          <p className="text-xl font-medium">Upload your CSV. Add prompts.</p>
          <h1 className="text-2xl font-semibold">
            <span className="bg-gradient-to-br from-[#4158D0] via-[#C850C0] to-[#FFCC70] bg-clip-text text-5xl font-extrabold text-transparent">
              Generate AI content
            </span>{" "}
          </h1>
          <p className="text-lg font-medium">instantly. Free forever.</p>
          <p className="mt-8 font-medium">
            Upload CSV. Add prompts. Generate with your API key.
          </p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <UploadCsv />
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-3 -z-10 transform-gpu overflow-hidden px-36 blur-3xl"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="mx-auto aspect-1155/678 w-[72.1875rem] bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
          />
        </div>
      </Container>
    </div>
  )
}
