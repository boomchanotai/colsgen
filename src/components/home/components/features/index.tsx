import { MessageCircle, Sparkles, Upload } from "lucide-react"

import { Container } from "@/components/common/container"

import { FeatureCard } from "./feature-card"

export const Features = () => {
  return (
    <Container className="space-y-8">
      <div className="space-y-4 text-center">
        <h2 className="text-primary font-semibold">Just 3 Steps</h2>
        <p className="text-3xl font-semibold tracking-tight text-balance">
          Generate AI content from your CSV — effortlessly
        </p>
        <p>
          Upload your file, write your prompts, and watch your data come alive.{" "}
          <br />
          All in your browser. No setup. No limits.
        </p>
      </div>
      <div className="grid gap-8 md:grid-cols-3">
        <FeatureCard
          title="Upload Your CSV"
          icon={<Upload className="size-4" />}
          description="Import your spreadsheet — we’ll auto-detect columns for you."
          link="#"
        />
        <FeatureCard
          title="Add Prompts"
          icon={<MessageCircle className="size-4" />}
          description="Write custom prompts using {{column}} to reference data in each row."
          link="#"
        />
        <FeatureCard
          title="Generate Results"
          icon={<Sparkles className="size-4" />}
          description="Run everything in your browser using your own API key. Then export as CSV."
          link="#"
        />
      </div>
    </Container>
  )
}
